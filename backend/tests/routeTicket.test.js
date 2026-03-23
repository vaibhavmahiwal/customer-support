jest.mock("../src/services/zendesk.service", () => ({ sendReply: jest.fn() }));
jest.mock("../src/services/slack.service", () => ({ sendEscalationAlert: jest.fn() }));
const routeTicket = require("../src/router/routeTicket");
const ticket = { id: "t1", subject: "Test", customerEmail: "a@b.com" };
describe("routeTicket()", () => {
  it("escalates critical", async () => { const r = await routeTicket(ticket, { urgency: "critical", confidence: 0.9, draft_reply: "Hi" }); expect(r.action).toBe("escalated"); });
  it("auto-resolves high confidence", async () => { const r = await routeTicket(ticket, { urgency: "low", confidence: 0.95, draft_reply: "Hi" }); expect(r.action).toBe("auto_resolved"); });
  it("human review on low confidence", async () => { const r = await routeTicket(ticket, { urgency: "medium", confidence: 0.5, draft_reply: "Hi" }); expect(r.action).toBe("human_review"); });
});
