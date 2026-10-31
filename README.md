<div align="center">

# api-new-portfolio — Backend do Portfólio

API REST em **Node.js + Express 5 + TypeScript** com **Prisma 7** e **PostgreSQL**, servindo dados (projetos, stack, estudos) para o portfólio estático [guilhermevieira](https://guilherme-v-rocha.github.io/guilhermevieira/). Arquitetura modular com auth JWT.

[🔗 Demo ao vivo](https://api-new-portfolio-woad.vercel.app/) · [📦 Repositório](https://github.com/Guilherme-V-Rocha/api-new-portfolio)

</div>

---

## 🎯 Sobre

Backend que alimenta o portfólio pessoal. Em vez de manter dados hardcoded em `Info.ts` / `Project.ts` no front, estes foram migrados para uma API REST com persistência real — permitindo atualizar projetos, stack e itens de estudo sem rebuild do front.

### Por que este projeto existe

Em 2026, como continuação natural do estudo de backend iniciado com Go (ver [learn_go_api](https://github.com/Guilherme-V-Rocha/learn_go_api)), este projeto exercita:

- **Node.js + Express 5 em produção** — versão major atual do Express, com breaking changes relevantes
- **Prisma 7 como ORM** — schema-first, migrations versionadas, type-safe queries
- **PostgreSQL via driver `pg` + adapter oficial do Prisma** — combinação canônica para serverless (Vercel)
- **Arquitetura modular por feature** — cada módulo (`login`, `projects`, `stack`, `study`) é autossuficiente
- **Auth JWT** — login com bcrypt + JWT, middleware de autenticação para rotas protegidas
- **Validação com Zod 4** — schemas de entrada type-safe nos controllers
- **Deploy serverless na Vercel** — `@vercel/node` com build de Prisma

### Relação com o portfólio

| Front (estático) | Back (este repo) |
| --- | --- |
| [guilhermevieira](https://github.com/Guilherme-V-Rocha/guilhermevieira) | api-new-portfolio |
| GitHub Pages | Vercel |
| Dados em `src/data/*.ts` (hardcoded) | Dados em Postgres via API REST |
| Next.js 16 + React 19 | Express 5 + Prisma 7 |

O CORS está travado para a origem do front: `https://guilherme-v-rocha.github.io/guilhermevieira/`.

---

## 🛠️ Stack

| Tecnologia        | Versão  | Uso                                                  |
| ----------------- | ------- | ---------------------------------------------------- |
| Node.js           | 20+     | Runtime                                              |
| Express           | ^5.2.1  | Framework HTTP (major atual)                         |
| TypeScript        | ^6.0.3  | Tipagem end-to-end                                   |
| Prisma            | ^7.9.1  | ORM, migrations, client gerado                       |
| @prisma/client    | ^7.9.1  | Client type-safe                                     |
| @prisma/adapter-pg| ^7.9.1  | Adapter para driver `pg` (serverless-friendly)       |
| pg                | ^8.22.0 | Driver PostgreSQL                                    |
| bcryptjs          | ^3.0.3  | Hash de senhas                                       |
| jsonwebtoken      | ^9.0.3  | Geração e verificação de JWT                         |
| zod               | ^4.4.3  | Validação de payloads nos controllers               |
| cors              | ^2.8.6  | CORS (origem travada no front do portfólio)          |
| dotenv            | ^17.4.2 | Variáveis de ambiente                                |
| tsx               | ^4.23.1 | Execução TS em dev (substitui ts-node)               |
| nodemon           | ^3.1.14 | Watch reload em dev                                  |
| @vercel/node      | ^5.9.7  | Adapter para deploy serverless na Vercel             |

> `type: "module"` no `package.json` — projeto usa ESM nativo, imports com extensão `.js` mesmo em arquivos `.ts` (convenção NodeNext).

---

## 📁 Estrutura

```
api-new-portfolio/
├── .agents/skills/                  # Skills para agentes de IA (Agent OS)
├── .claude/skills/                  # Skills para Claude Code
├── .windsurf/skills/                # Skills para Windsurf
├── prisma/
│   ├── schema.prisma                # Schema do banco (4 modelos)
│   └── migrations/                  # Migrations versionadas
├── src/
│   ├── app.ts                       # Instância Express + CORS + JSON parser
│   ├── routes.ts                    # Router principal (monta os 4 módulos)
│   ├── server.ts                    # Entry point (porta dinâmica p/ Vercel)
│   ├── lib/
│   │   └── prisma.ts                # Singleton do PrismaClient
│   ├── middlewares/                 # Middlewares Express
│   │   ├── auth.ts                  # Verifica JWT no header Authorization
│   │   └── validateRequest.ts       # Aplica schema Zod ao req.body/params
│   ├── modules/                     # Feature modules (cada um autossuficiente)
│   │   ├── login/
│   │   │   ├── controller.ts        # Handler HTTP (login + geração de JWT)
│   │   │   ├── service.ts           # Regra de negócio (bcrypt compare)
│   │   │   ├── routes.ts            # POST /login
│   │   │   └── validations.ts       # Schema Zod do payload
│   │   ├── projects/
│   │   │   ├── controller.ts        # CRUD de projetos
│   │   │   ├── service.ts
│   │   │   ├── routes.ts            # GET/POST/PUT/DELETE /projects
│   │   │   └── validations.ts
│   │   ├── stack/
│   │   │   ├── controller.ts        # CRUD de stacks
│   │   │   ├── service.ts
│   │   │   ├── routes.ts            # GET/POST/PUT/DELETE /stacks
│   │   │   └── validations.ts
│   │   └── study/
│   │       ├── controller.ts        # CRUD de itens em estudo
│   │       ├── service.ts
│   │       ├── routes.ts            # GET/POST/PUT/DELETE /study
│   │       └── validations.ts
│   ├── types/                       # Tipos TypeScript compartilhados
│   ├── utils/                       # Helpers utilitários
│   └── generated/                   # Output do `prisma generate` (gitignored)
├── .gitignore
├── package.json
├── package-lock.json
├── prisma.config.ts                 # Config do Prisma 7 (datasource via env)
├── skills-lock.json                 # Lock das skills de IA
├── tsconfig.json
└── vercel.json                      # Deploy config (@vercel/node)
```

### Padrão arquitetural: feature modules

Cada módulo em `src/modules/<feature>/` segue a mesma estrutura:

```
<feature>/
├── routes.ts         # Define as rotas Express do módulo
├── controller.ts     # Parseia request, chama service, monta response
├── service.ts        # Regra de negócio (orquestra Prisma)
└── validations.ts    # Schemas Zod para entrada
```

Vantagens:

- **Simetria** — qualquer dev que entra no projeto sabe onde está cada coisa
- **Isolamento** — mudar regras de `projects` não toca `stack`
- **Testabilidade** — service é testável isoladamente com mock de Prisma
- **Escalabilidade** — adicionar módulo novo é copiar a estrutura e adaptar

---

## 🗄️ Modelagem de dados

4 modelos no `prisma/schema.prisma`:

### `Project` (projeto do portfólio)
```prisma
model Project {
  id               Int      @id @default(autoincrement())
  title            String
  shortDescription String
  highlights       String[]   // array nativo Postgres
  type             String
  link             String
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  stacks           Stack[]     // N:N com Stack
}
```

### `Stack` (tecnologia da stack)
```prisma
model Stack {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  icon      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  projects  Project[]   // N:N com Project
}
```

### `Study` (item em estudo)
```prisma
model Study {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### `User` (admin autenticado)
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // hash bcrypt
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

> **Relacionamento N:N entre `Project` e `Stack`** — Prisma cria automaticamente a tabela de junção `_ProjectToStack` (ou similar). Um projeto pode ter várias stacks e uma stack pode pertencer a vários projetos.

---

## 📡 Endpoints

### Públicos

| Método | Rota             | Descrição                          |
| ------ | ---------------- | ---------------------------------- |
| `POST` | `/login`         | Autentica user, retorna JWT        |
| `GET`  | `/projects`      | Lista projetos (público)           |
| `GET`  | `/stacks`        | Lista stacks (público)             |
| `GET`  | `/study`         | Lista itens em estudo (público)    |

### Protegidos (requerem JWT no header `Authorization: Bearer <token>`)

| Método   | Rota                  | Descrição                       |
| -------- | --------------------- | ------------------------------- |
| `POST`   | `/projects`           | Cria projeto                    |
| `PUT`    | `/projects/:id`       | Atualiza projeto                |
| `DELETE` | `/projects/:id`       | Remove projeto                  |
| `POST`   | `/stacks`             | Cria stack                      |
| `PUT`    | `/stacks/:id`         | Atualiza stack                  |
| `DELETE` | `/stacks/:id`         | Remove stack                    |
| `POST`   | `/study`              | Cria item em estudo             |
| `PUT`    | `/study/:id`          | Atualiza item em estudo         |
| `DELETE` | `/study/:id`          | Remove item em estudo           |

> Rotas públicas são as que o front consome para renderizar o portfólio. Rotas protegidas são para o admin (você) gerenciar o conteúdo sem rebuild.

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 20+
- PostgreSQL 12+ (local ou em nuvem — Neon, Supabase, Vercel Postgres)

### Variáveis de ambiente

Crie um `.env` na raiz (já no `.gitignore`):

```env
DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
JWT_SECRET="sua-chave-secreta-super-forte"
PORT=3000   # opcional — Vercel injeta automaticamente
```

### Instalação

```bash
git clone https://github.com/Guilherme-V-Rocha/api-new-portfolio
cd api-new-portfolio
npm install
```

### Banco de dados

```bash
# Gerar o client do Prisma (cria src/generated/prisma/)
npx prisma generate

# Aplicar migrations (cria as tabelas no banco)
npx prisma migrate dev

# Popular o banco com dados iniciais (se houver seed)
# npx prisma db seed
```

### Desenvolvimento

```bash
npm run dev   # nodemon + tsx, watch mode
```

Acesse `http://localhost:3000`.

### Build e produção

```bash
npm run build         # tsc → JS
npm start             # tsx src/server.ts (serverless-ready)
```

> O script `vercel-build` (`prisma generate && npm run build`) é executado automaticamente pela Vercel no deploy.

---

## 🌐 Deploy

Deploy automático na **Vercel** via `vercel.json`:

```json
{
  "builds":   [{ "src": "src/server.ts", "use": "@vercel/node" }],
  "routes":   [{ "src": "/(.*)", "dest": "src/server.ts" }],
  "rewrites": [{ "source": "/(.*)", "destination": "/src/server.ts" }]
}
```

URL ao vivo: [api-new-portfolio-woad.vercel.app](https://api-new-portfolio-woad.vercel.app/)

### Configurar no painel da Vercel

1. **Variáveis de ambiente:** `DATABASE_URL` (string de conexão do Postgres) e `JWT_SECRET`
2. **Build Command:** automático (`npm run vercel-build`)
3. **Output:** serverless functions geradas pelo `@vercel/node`

> ⚠️ **Serverless + Prisma:** cada chamada é uma cold start potencial. O `@prisma/adapter-pg` + singleton em `src/lib/prisma.ts` mitigam o problema de conexões abertas, mas para alto tráfego vale considerar connection pooling (ex.: PgBouncer ou Neon's pooler).

---

## 🔐 Segurança

| Mecanismo              | Implementação                                   |
| ---------------------- | ----------------------------------------------- |
| Hash de senha          | `bcryptjs` (salt rounds padrão)                 |
| Autenticação           | JWT via header `Authorization: Bearer <token>`  |
| Middleware de auth     | `src/middlewares/auth.ts` — verifica e decodifica JWT |
| Validação de entrada   | `zod` em todos os controllers                   |
| CORS                   | Travado para `https://guilherme-v-rocha.github.io/guilhermevieira/` apenas |
| Secrets                | `dotenv` em dev, variáveis de ambiente na Vercel em prod |

---

## 🎨 Personalização

Para adaptar esta API para o seu próprio portfólio:

1. **Schema:** Edite `prisma/schema.prisma` para adicionar/remover campos ou modelos
2. **Migrations:** Rode `npx prisma migrate dev --name <descricao>` após mudar o schema
3. **CORS:** Em `src/app.ts`, troque a origem para o domínio do seu front
4. **Seed:** Crie `prisma/seed.ts` para popular dados iniciais (user admin, projetos, stacks)
5. **JWT_SECRET:** Gere uma chave forte (ex.: `openssl rand -base64 32`)

---

## 🤖 Skills de IA

O repo contém três pastas de skills para agentes de IA:

- `.agents/skills/` — Agent OS
- `.claude/skills/` — Claude Code
- `.windsurf/skills/` — Windsurf

Estas contêm instruções específicas de projeto (convenções, contexto, comandos preferidos) para acelerar o trabalho com cada ferramenta. O arquivo `skills-lock.json` na raiz é o lockfile dessas skills.

> Se você for forkar este repo, vale revisar o conteúdo dessas pastas — podem conter contexto específico do seu fluxo de trabalho que não faz sentido no fork.

---

## 🎯 Aprendizados pretendidos

Este projeto foi construído para exercitar:

- **Express 5** — breaking changes vs Express 4 (ex.: `path-to-regexp` 6+, async errors)
- **Prisma 7 com adapter `pg`** — adequado para serverless (Vercel)
- **Arquitetura modular por feature** — simetria entre módulos
- **Auth JWT completa** — login, hash, middleware, rotas protegidas
- **Zod 4 em controllers** — validação type-safe integrada com TypeScript
- **Deploy serverless Node na Vercel** — `vercel.json` + `@vercel/node` + `prisma generate` no build
- **ESM nativo em projeto Node** — `type: "module"` + imports com extensão `.js`

---

## 📄 Licença

Projeto open source para fins de estudo. Sinta-se livre para usar como base, mas personalize o conteúdo para refletir sua própria trajetória de aprendizado.
