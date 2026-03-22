# SupportAI — AI-Powered Customer Support Automation

> A full-stack agentic AI system that automatically classifies, drafts, and routes customer support tickets using a three-agent CrewAI crew, with a real-time React dashboard for human review.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Alpine-DC382D?style=flat&logo=redis&logoColor=white)

---

## What is this?

SupportAI is a production-ready customer support automation system. When a customer submits a ticket, a crew of three AI agents automatically classifies it, drafts a personalised reply, and quality-checks it — all in under 2 minutes. High-confidence replies are sent automatically. Low-confidence ones go to a human agent for review. Critical tickets fire instant Slack alerts.

---

## How it works

```
Customer submits ticket
        ↓
Node.js receives it → pushes to Redis queue (BullMQ)
        ↓
Worker picks up job → calls Python AI service
        ↓
CrewAI runs 3 agents in sequence:
  1. Classifier agent  → category, urgency, sentiment, confidence
  2. Reply drafter     → searches KB, writes personalised reply
  3. QA reviewer       → checks tone, accuracy, completeness
        ↓
Result saved to MongoDB
        ↓
confidence >= 0.85  →  auto-resolved (reply sent)
confidence < 0.85   →  human review queue
urgency = critical  →  Slack alert fired
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Backend API | Node.js + Express |
| Job queue | BullMQ + Redis |
| Database | MongoDB + Mongoose |
| AI service | Python + FastAPI |
| AI agents | CrewAI |
| LLM | Groq (llama-3.3-70b-versatile) — free tier |
| Frontend | React + Vite + Tailwind CSS |
| Charts | Recharts |
| Alerts | Slack webhooks |
| Auth | JWT + bcryptjs |

---

## Project structure

```
customer/
├── node-api/              # Node.js backend
│   ├── src/
│   │   ├── routes/        # Express routes
│   │   ├── controllers/   # Business logic
│   │   ├── queue/         # BullMQ queue + worker
│   │   ├── services/      # Zendesk, Slack, AI service
│   │   ├── models/        # Mongoose models
│   │   ├── middleware/     # Auth, error handling
│   │   ├── router/        # Ticket routing logic
│   │   ├── config/        # DB, Redis, env
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── ai-service/            # Python AI service
│   ├── app/
│   │   ├── agents/        # CrewAI agent definitions
│   │   ├── crew/          # Crew assembly + tasks
│   │   ├── tools/         # KB search tool
│   │   ├── schemas/       # Pydantic input/output
│   │   ├── api/           # FastAPI routes
│   │   └── main.py
│   ├── .env.example
│   └── requirements.txt
│
└── dashboard/             # React frontend
    ├── src/
    │   ├── pages/         # Overview, ReviewQueue, History, Portal
    │   ├── components/    # ProtectedRoute, shared UI
    │   ├── api/           # Axios API clients
    │   ├── store/         # Zustand state
    │   └── App.jsx
    └── package.json
```

---

## Features

### For customers
- Submit support tickets via a clean portal page
- Get AI-generated replies in under 2 minutes
- Track ticket status in real time — no account needed

### For agents
- Review queue with AI draft pre-filled — approve, edit, or reject
- Live badge showing pending ticket count
- Full ticket history with status, category, confidence score

### For managers
- Overview dashboard with KPI cards and charts
- Ticket volume by day, breakdown by category
- Average AI confidence score tracking

### AI capabilities
- Classifies tickets into billing, technical, shipping, general
- Detects urgency — low, medium, high, critical
- Detects customer sentiment — frustrated, neutral, happy
- Drafts empathetic, personalised replies
- QA reviews every draft before sending
- Confidence scoring — routes to human if not confident enough

---

## API endpoints

### Auth
```
POST   /api/auth/register     Register a new agent
POST   /api/auth/login        Login and get JWT token
GET    /api/auth/me           Get current agent info
```

### Tickets
```
POST   /api/tickets           Submit a ticket (API key)
GET    /api/tickets           List all tickets
```

### Portal (public — no auth)
```
POST   /api/portal/submit     Customer submits ticket
GET    /api/portal/ticket/:id Customer checks ticket status
```

### Agent review
```
GET    /api/agents/tickets/all         All tickets
GET    /api/agents/tickets/review      Review queue
GET    /api/agents/tickets/:id         Single ticket
POST   /api/agents/tickets/:id/approve Approve AI draft
POST   /api/agents/tickets/:id/edit    Edit and approve
POST   /api/agents/tickets/:id/reject  Reject draft
```

### Stats
```
GET    /api/stats/overview     KPI counts by status
GET    /api/stats/volume       Ticket volume by day
GET    /api/stats/categories   Breakdown by category
GET    /api/stats/confidence   Average AI confidence
```

### Python AI service
```
POST   /process-ticket         Runs CrewAI crew, returns result
GET    /health                 Health check
```

---

## Getting started

### Prerequisites

- Node.js v18+
- Python 3.10+
- Docker Desktop
- A free [Groq API key](https://console.groq.com)
- A free [Slack webhook URL](https://api.slack.com/apps) (optional)

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd customer
```

---

### 2. Start Redis and MongoDB

```bash
docker run -d --name support-redis -p 6379:6379 redis:alpine
docker run -d --name support-mongo -p 27017:27017 mongo:7
```

---

### 3. Set up Node.js backend

```bash
cd node-api
cp .env.example .env
# Fill in your values in .env
npm install
node server.js
```

Node.js runs on `http://localhost:3000`

---

### 4. Set up Python AI service

```bash
cd ai-service
python -m venv venv

# Mac/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env
python -m uvicorn app.main:app --reload --port 8000
```

Python runs on `http://localhost:8000`

---

### 5. Set up React dashboard

```bash
cd dashboard
npm install
npm run dev
```

Dashboard runs on `http://localhost:5173`

---

### 6. Create your first agent

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@example.com","password":"yourpassword","role":"admin"}'
```

---

### 7. Open the app

| URL | What it is |
|---|---|
| `http://localhost:5173` | Landing page |
| `http://localhost:5173/portal` | Customer ticket portal |
| `http://localhost:5173/dashboard` | Agent dashboard (login required) |
| `http://localhost:5173/login` | Agent login |

---

## Environment variables

### `node-api/.env`

```env
# Server
PORT=3000
NODE_ENV=development
API_SECRET_KEY=dev-secret
JWT_SECRET=your-jwt-secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# MongoDB
MONGO_URI=mongodb://localhost:27017/support_automation

# Python AI service
AI_SERVICE_URL=http://localhost:8000
AI_CONFIDENCE_THRESHOLD=0.85

# Slack (optional)
SLACK_WEBHOOK_URL=

# Zendesk (optional)
ZENDESK_SUBDOMAIN=
ZENDESK_EMAIL=
ZENDESK_API_TOKEN=
```

### `ai-service/.env`

```env
PORT=8000
ENV=development
GROQ_API_KEY=your-groq-key-here
CONFIDENCE_THRESHOLD=0.85
```

---

## How the AI routing works

```
Ticket arrives
      │
      ▼
AI confidence >= 0.85  ──►  Auto-resolved  ──►  Reply sent to customer
      │
      ▼
AI confidence < 0.85   ──►  Human review   ──►  Agent approves/edits/rejects
      │
      ▼
Urgency = critical     ──►  Escalated      ──►  Slack alert fires instantly
```

The confidence threshold is configurable in `.env` — start conservative at `0.85` and lower it as you trust the AI more.

---

## Running with Docker (coming soon)

A `docker-compose.yml` is planned that will start all four services with one command:

```bash
docker-compose up
```

---

## Roadmap

- [x] Node.js backend with BullMQ queue
- [x] Python FastAPI + CrewAI 3-agent crew
- [x] MongoDB ticket storage
- [x] React dashboard — overview, review queue, history
- [x] Customer portal with real-time ticket tracking
- [x] Slack escalation alerts
- [x] JWT agent authentication
- [ ] Docker + docker-compose
- [ ] Zendesk integration — auto-send replies
- [ ] Knowledge base with vector search (RAG)
- [ ] Deploy to Railway
- [ ] Email notifications via SendGrid

---

## License

MIT
