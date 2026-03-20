from fastapi import APIRouter, HTTPException
from app.schemas.ticket import TicketInput
from app.schemas.result import TicketResult
from app.crew.support_crew import run_support_crew

router = APIRouter()

@router.post("/process-ticket", response_model=TicketResult)
async def process_ticket(ticket: TicketInput):
    try:
        print(f"[API] Processing ticket {ticket.id} — {ticket.subject}")
        result = run_support_crew(ticket)
        print(f"[API] Done — category:{result.category} urgency:{result.urgency} confidence:{result.confidence}")
        return result
    except Exception as e:
        print(f"[API] Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health():
    return {"status": "ok", "service": "ai-service"}
