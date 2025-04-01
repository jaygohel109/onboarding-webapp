# app/models.py

from pydantic import BaseModel, Field
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

class OnboardingStep(BaseModel):
    user_id: Optional[str] = None   # user_id will be assigned in the backend
    aboutMe: Optional[str] = Field(None, title="About Me", max_length=500)
    street: Optional[str] = Field(None, title="Street Address", max_length=100)
    city: Optional[str] = Field(None, title="City", max_length=50)
    state: Optional[str] = Field(None, title="State", max_length=50)
    zip: Optional[str] = Field(None, title="ZIP Code", max_length=20)
    birthdate: Optional[str] = Field(None, title="Birthdate (YYYY-MM-DD)", pattern=r"\d{4}-\d{2}-\d{2}")