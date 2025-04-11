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


class FieldData(BaseModel):
    id: str  # Ensure _id is part of the model
    name: str
    is_required: bool
    page: int

class FieldUpdate(BaseModel):
    id: str  # The unique identifier for the field, typically a MongoDB ObjectId in string format
    name: str  # The label/name of the field
    is_required: bool  # Boolean to indicate if the field is required
    page: int  # The page (step) the field belongs to (e.g., Step 2 or Step 3)

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

class OnboardingData(BaseModel):
    _id: Optional[str] = None
    username: Optional[str] = None
    aboutMe: Optional[str] = None
    street: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    birthdate: Optional[str] = None
