import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

const SYSTEM_PROMPT = `Voce e o Atendente Rafa Jr, especialista em tintas, massas e texturas da Qualy Quimy.
Seu papel e atender clientes no WhatsApp com linguagem simples, objetiva e comercial.
Regras:
- Responder em portugues do Brasil.
- Nao inventar preco, estoque, prazo ou produto.
- Se faltar contexto, perguntar: area (interna/externa), superficie, umidade e metragem.
- Respostas curtas, no maximo 5 linhas.
- Sempre terminar com uma pergunta para avancar atendimento.
`;

function getIncomingText(body) {
  const value = body?.entry?.[0]?.changes?.[0]?.value;
  const message = value?.messages?.[0];

  if (!message) {
    return null;
  }

  if (message.type !== "text") {
    return {
      from: message.from,
      text: "",
      validText: false,
    };
  }

  return {
    from: message.from,
    text: message.text?.body || "",
    validText: true,
  };
}

async function askOpenRouter(userText) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: OPENROUTER_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userText },
      ],
      temperature: 0.5,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );

  return response.data?.choices?.[0]?.message?.content?.trim() || "Posso te ajudar melhor se voce me disser a metragem e se e area interna ou externa.";
}

async function sendWhatsAppText(to, text) {
  await axios.post(
    `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );
}

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    const incoming = getIncomingText(req.body);

    if (!incoming) {
      return res.sendStatus(200);
    }

    if (!incoming.validText) {
      await sendWhatsAppText(incoming.from, "Por enquanto eu respondo apenas texto. Me manda sua duvida por escrito?");
      return res.sendStatus(200);
    }

    const answer = await askOpenRouter(incoming.text);
    await sendWhatsAppText(incoming.from, answer);

    return res.sendStatus(200);
  } catch (error) {
    const status = error.response?.status;
    const data = error.response?.data;
    console.error("Erro no webhook:", status || "sem_status", data || error.message);
    return res.sendStatus(200);
  }
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Rafa Jr webhook rodando na porta ${PORT}`);
});
