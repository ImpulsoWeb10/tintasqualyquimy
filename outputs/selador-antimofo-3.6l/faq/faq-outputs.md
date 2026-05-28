# FAQ - Perguntas Frequentes

**Data:** 15 de maio de 2026  
**Agente:** FAQ Agent  
**Formato:** Schema.org FAQPage + HTML

---

## 1. FAQ ESTRUTURADO (Schema.org)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto rende o Selador Acrílico Antimofo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rende 25m² por litro. Um frasco de 3,6L rende 90m² com 1 demão ou 45m² com 2 demãos (recomendado para melhor cobertura). Quanto mais espesso você aplicar, menos área cobre."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo seca o selador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seca em 4 horas entre demãos. Você pode aplicar a segunda demão após 4 horas. A cura completa (totalmente resistente à água) leva 7 dias."
      }
    },
    {
      "@type": "Question",
      "name": "Posso aplicar em parede muito molhada/encharcada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Se a parede estiver muito encharcada (pingando água), deixe secar por 24 horas com ventilação. Se for apenas umidade normal (banheiro), é seguro aplicar direto. O importante é remover o mofo antes."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto dura o selador? Garante 10 anos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dura até 10 anos em condições normais de uso. Oferecemos garantia de 12 meses contra defeito de fabricação. A durabilidade pode variar dependendo da ventilação e umidade relativa do local."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a diferença entre este selador e selador comum?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seladores comuns usam PVA (vinílica fraca) que descasca em 6 meses. Nosso Selador Acrílico usa resina acrílica de alta performance que resiste a umidade relativa até 80%. Resultado: dura 10 anos vs 6 meses."
      }
    },
    {
      "@type": "Question",
      "name": "Como aplicar o selador?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1. Limpe a parede: remova pó, mofo e sujeira com escova. 2. Prepare: deixe secar 24h se muito molhado. 3. Aplique: passe 1-2 demãos com rolo 10mm. 4. Seque: 4 horas entre demãos + ventilação."
      }
    },
    {
      "@type": "Question",
      "name": "Preciso de 2 demãos ou 1 é suficiente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recomendamos 2 demãos para melhor cobertura e durabilidade. 1 demão pode funcionar em paredes em bom estado, mas 2 demãos garantem melhor proteção contra umidade."
      }
    },
    {
      "@type": "Question",
      "name": "Vale a pena o preço?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Um selador comum custa R$ 30 e dura 6 meses. Nosso custa R$ 89,90 e dura 10 anos. Calculo: 20 aplicações de selador comum = R$ 600 em 10 anos. Nosso = R$ 89,90. Economiza 6x mais no longo prazo."
      }
    },
    {
      "@type": "Question",
      "name": "Qual cor? Posso pintar por cima depois?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vem em branco premium. Sim, você pode pintar tinta colorida por cima após 7 dias de cura completa. Certifique-se que a tinta é compatível com acrílico."
      }
    },
    {
      "@type": "Question",
      "name": "Tem garantia? Como funciona?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tem garantia de 12 meses contra defeito de fabricação. Se o produto tiver problema (separação, descoloração, etc), você pode solicitar reembolso ou troca. Além disso, oferecemos 30 dias de satisfação garantida."
      }
    },
    {
      "@type": "Question",
      "name": "Quanto custa o frete?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O frete varia por região. Consulte no checkout. Promoção: Compre 2 frascos e ganhe frete grátis + 10% de desconto!"
      }
    },
    {
      "@type": "Question",
      "name": "Tem nota fiscal? É produto original?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, 100% original com nota fiscal. Nossos produtos vêm diretamente da Qualy Quimy com certificado de qualidade e embalagem protegida."
      }
    },
    {
      "@type": "Question",
      "name": "Tenho dúvida técnica. Posso falar com um especialista?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Claro! Temos suporte técnico por WhatsApp disponível. Resposta em até 5 minutos. Nosso técnico pode ajudar com dúvidas sobre aplicação, quantidade, etc."
      }
    },
    {
      "@type": "Question",
      "name": "O selador é tóxico? Posso usar em cozinha/perto de comida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não é tóxico após a cura completa (7 dias). Não recomendamos aplicar em superfícies de contato direto com alimentos. Para cozinhas, aplique em paredes longe da bancada. O cheiro some em 24 horas."
      }
    }
  ]
}
```

---

## 2. FAQ EM HTML (Para Landing Page)

```html
<section class="faq-section">
  <h2>Perguntas Frequentes</h2>
  
  <div class="faq-item">
    <button class="faq-question">
      Quanto rende o Selador Acrílico Antimofo?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Rende 25m² por litro. Um frasco de 3,6L rende 90m² com 1 demão ou 45m² com 2 demãos (recomendado para melhor cobertura).</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Quanto tempo seca o selador?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Seca em 4 horas entre demãos. Cura completa em 7 dias.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Posso aplicar em parede muito molhada?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Se estiver muito encharcada (pingando), deixe secar 24h. Se for umidade normal, é seguro aplicar. Remova o mofo antes.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Qual a diferença com selador comum?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Seladores comuns (PVA) descascam em 6 meses. Nosso Selador Acrílico dura 10 anos porque usa resina de alta performance.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Vale a pena o preço?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Sim! Selador comum: R$ 30 × 20 vezes em 10 anos = R$ 600. Nosso: R$ 89,90 × 1 vez = R$ 89,90. Economiza 6x.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Tem garantia?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Sim, garantia de 12 meses contra defeito de fabricação. Além disso, 30 dias de satisfação garantida ou seu dinheiro de volta.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Como aplicar?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>1. Limpe a parede (remova mofo) 2. Deixe secar 24h se molhado 3. Aplique 1-2 demãos com rolo 10mm 4. Seque 4h entre demãos.</p>
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question">
      Tenho dúvida técnica. Posso falar com especialista?
      <span class="faq-toggle">▼</span>
    </button>
    <div class="faq-answer" style="display: none;">
      <p>Claro! Suporte técnico por WhatsApp. Resposta em até 5 minutos. Nosso técnico ajuda com aplicação, quantidade, etc.</p>
    </div>
  </div>
</section>

<style>
  .faq-item {
    border: 1px solid #eee;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .faq-question {
    width: 100%;
    padding: 1rem;
    text-align: left;
    background: #f8f9fa;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.3s;
  }
  
  .faq-question:hover {
    background: #e8e9ea;
  }
  
  .faq-answer {
    padding: 1rem;
    background: white;
    border-top: 1px solid #eee;
  }
  
  .faq-toggle {
    transition: transform 0.3s;
  }
</style>

<script>
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const toggle = btn.querySelector('.faq-toggle');
      answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
      toggle.style.transform = answer.style.display === 'none' ? 'rotate(0)' : 'rotate(180deg)';
    });
  });
</script>
```

---

## 3. COPY FAQ (Para Email/WhatsApp)

Clique nas perguntas abaixo:

**❓ Quanto rende?**  
Rende 25m² por litro.

**❓ Seca rápido?**  
4 horas entre demãos.

**❓ Dura quanto tempo?**  
Até 10 anos.

**❓ Quanto custa?**  
R$ 89,90 (promoção hoje: 10% OFF).

**❓ Posso aplicar em parede molhada?**  
Se umidade normal, sim. Se encharcada, deixe 24h secar.

**❓ Tenho dúvida técnica?**  
Chama no WhatsApp! Resposta em 5 minutos.

---

## 4. PRÓXIMOS PASSOS

- [ ] Implementar FAQ Schema no site
- [ ] Ativar FAQ modal na landing page
- [ ] Monitorar perguntas novas de clientes
- [ ] Atualizar FAQ mensal com questões reais
- [ ] Treinar atendimento com FAQ

