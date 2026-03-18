# Support Automation — Node.js API

## Quick start
cp .env.example .env
npm install
npm run dev

## Endpoints
POST  /api/tickets                      Submit a ticket
GET   /api/tickets                      List tickets
POST  /api/webhooks/zendesk             Zendesk webhook
POST  /api/webhooks/email               Email inbound
GET   /api/stats/overview               Dashboard metrics
POST  /api/agents/tickets/:id/approve   Approve AI draft
POST  /api/agents/tickets/:id/reject    Reject AI draft
GET   /health                           Health check

## Test
npm test
