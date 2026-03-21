from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TicketInput(BaseModel):
    id: str        #required
    subject: str   #required
    body: str      #required
    customerEmail: str   #required
    source: Optional[str] = "api"
    priority: Optional[str] = "medium"
    createdAt: Optional[str] = None
