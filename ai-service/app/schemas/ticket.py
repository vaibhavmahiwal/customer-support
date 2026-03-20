from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TicketInput(BaseModel):
    id: str
    subject: str
    body: str
    customerEmail: str
    source: Optional[str] = "api"
    priority: Optional[str] = "medium"
    createdAt: Optional[str] = None
