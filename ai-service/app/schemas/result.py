from pydantic import BaseModel
from typing import Optional

class TicketResult(BaseModel):
    ticket_id: str
    category: str           # billing | technical | shipping | general
    urgency: str            # low | medium | high | critical
    sentiment: str          # frustrated | neutral | happy
    confidence: float       # 0.0 - 1.0
    draft_reply: str        # the actual reply to send to the customer
    kb_sources: Optional[list[str]] = []  # which KB docs were used
