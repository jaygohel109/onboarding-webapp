# app/models.py

from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class User(BaseModel):
    id: Optional[str]  # For MongoDB, we'll use string as object ID
    username: str
    password: str
    # role: Optional[str] = None  # 1 = customer, 2 = salesman, 3 = manager
    # created_at: Optional[date] = None
    # onboarding_step2_data: Optional[dict] = None
    # onboarding_step3_data: Optional[dict] = None

class FieldRequirement(BaseModel):
    field_name: str
    required: bool

class UserCreateRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str