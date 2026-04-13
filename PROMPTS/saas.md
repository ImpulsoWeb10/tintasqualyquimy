# Blueprint: SaaS Escalável & Monetizável
Atue como Lead Software Architect. O objetivo é criar a fundação de um Software as a Service.

## 🛠 Stack Recomendada
- Framework: Next.js (App Router) + TypeScript
- Auth: NextAuth.js ou Clerk (Multi-tenant ready)
- DB: PostgreSQL (Prisma/Drizzle)
- Pagamentos: Stripe API (Subscriptions/Webhooks)
- UI: Shadcn/UI + Tailwind CSS

## 📋 Requisitos de Entrega
1. **Estrutura de Pastas:** `/src/(auth)`, `/src/(dashboard)`, `/src/api/stripe`.
2. **Database Schema:** Definir modelos de User, Organization, Subscription e Logs.
3. **Multi-tenancy:** Isolamento de dados por ID de organização/usuário.
4. **Admin Panel:** Visualização de métricas (Churn, MRR) e gestão de usuários.