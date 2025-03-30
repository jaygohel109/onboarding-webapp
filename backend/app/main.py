# app/main.py
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import FastAPI, HTTPException, Body, Depends, status
from .database import get_user_by_username, create_user, get_field_requirements, update_user_onboarding_step2
from .models import User, FieldRequirement,UserCreateRequest
from typing import List
from .utils import create_access_token, verify_password
import jwt

app = FastAPI()

# OAuth2PasswordBearer is used to get the token from the "Authorization" header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Dependency to verify JWT token
def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    return username  # You can return the user or other necessary info

@app.post("/login/")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_username(form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate JWT token if credentials are correct
    access_token = create_access_token(data={"sub": form_data.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/")
async def register_user(user_data: UserCreateRequest):
    response = await create_user(user_data.username, user_data.password)
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response

@app.get("/field-requirements/", response_model=List[FieldRequirement])
async def get_field_requirements_list():
    return await get_field_requirements()

@app.put("/users/{user_id}/onboarding-step2")
async def update_onboarding_step2(user_id: str, step2_data: dict = Body(...)):
    user = await get_user_by_username(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await update_user_onboarding_step2(user_id, step2_data)
    return {"msg": "Onboarding step 2 data updated successfully"}

@app.get("/protected/")
async def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Hello {current_user}, you are authorized!"}