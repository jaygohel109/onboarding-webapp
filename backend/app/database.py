from motor.motor_asyncio import AsyncIOMotorClient
from .models import User, FieldRequirement
import os
from dotenv import load_dotenv
from typing import List
import urllib.parse
from bson import ObjectId
from passlib.context import CryptContext
from urllib.parse import quote_plus
from .utils import hash_password
# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load environment variables
load_dotenv()

# Retrieve the MongoDB connection string

# Retrieve environment variables
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
DATABASE_URL = os.getenv("DATABASE_URL")

# URL encode the username and password in case there are special characters
USERNAME = quote_plus(USERNAME)
PASSWORD = quote_plus(PASSWORD)

# Update the DATABASE_URL with the encoded username and password
DATABASE_URL = DATABASE_URL.format(username=USERNAME, password=PASSWORD)
print(f"Connecting to MongoDB at: {DATABASE_URL}")

# Initialize MongoDB client
client = AsyncIOMotorClient(DATABASE_URL)
db = client["onboarding_db"]

# Get user by username
async def get_user_by_username(username: str) -> User:
    user = await db["users"].find_one({"username": username})
    print(f"Retrieved user: {user}")  # Debug statement to check the retrieved user
    if user:
        # Convert ObjectId to string for id field
        user["id"] = str(user["_id"])  # Convert ObjectId to string
        del user["_id"]  # Remove _id as it's not needed in the User model
        
        # Set a default value for 'role' if it is missing
        if "role" not in user:
            user["role"] = 1  # Default to customer role (1)
        
        # Return the User instance with the data from MongoDB
        return User(**user)
    
    return None

# Create user
async def create_user(username: str, password: str) -> dict:
    """Create a new user in the database with a hashed password."""
    # Check if the username already exists
    existing_user = await db["users"].find_one({"username": username})
    if existing_user:
        return {"error": "User already exists"}

    hashed_password = hash_password(password)
    user_data = {"username": username, "password": hashed_password}
    user = await db["users"].insert_one(user_data)
    return {"id": str(user.inserted_id), "username": username}

# Get required fields
async def get_field_requirements() -> List[FieldRequirement]:
    fields = await db["field_requirements"].find().to_list(length=100)
    return [FieldRequirement(**field) for field in fields]

# Update user onboarding step 2
async def update_user_onboarding_step2(user_id: str, step2_data: dict):
    await db["users"].update_one(
        {"_id": ObjectId(user_id)},  # Convert string ID to ObjectId
        {"$set": {"onboarding_step2_data": step2_data}}
    )

