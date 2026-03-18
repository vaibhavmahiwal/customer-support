const { normaliseTicket } = require("../src/controllers/ticket.controller");
describe("normaliseTicket()", () => {
  it("maps api payload", () => { const r = normaliseTicket({ subject: "Help", body: "Broken", customerEmail: "a@b.com" }, "api"); expect(r.subject).toBe("Help"); expect(r.source).toBe("api"); expect(r.id).toBeDefined(); });
  it("maps zendesk requester format", () => { const r = normaliseTicket({ title: "Issue", description: "Broken", requester: { email: "x@y.com" } }, "zendesk"); expect(r.customerEmail).toBe("x@y.com"); });
});
