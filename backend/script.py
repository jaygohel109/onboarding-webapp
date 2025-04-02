import pymongo
from bson.objectid import ObjectId
from urllib.parse import quote_plus

# URL-encode username and password
username = "jaygohel109"
password = "Jayg@mdb109"
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

# MongoDB connection URI with encoded username and password
client = pymongo.MongoClient(f"mongodb+srv://{encoded_username}:{encoded_password}@jaygohelcluster.m2sjsph.mongodb.net/")
db = client["onboarding_db"]  # Replace with your database name
fields_collection = db["fields"]  # Collection to store fields

# Function to add field to the database
def add_field(name, is_required, page):
    field = {
        "name": name,
        "is_required": is_required,
        "page": page
    }

    # Insert the new field into the MongoDB collection
    result = fields_collection.insert_one(field)
    return result.inserted_id

# Function to check and add default fields if none selected
def add_default_fields():
    # Default fields
    default_fields = [
        {"name": "aboutMe", "is_required": False, "page": 2},
        {"name": "birthdate", "is_required": False, "page": 2},
        {"name": "street", "is_required": False, "page": 3},
        {"name": "city", "is_required": False, "page": 3},
        {"name": "state", "is_required": False, "page": 3},
        {"name": "zip", "is_required": False, "page": 3}
    ]

    # Check if fields already exist in the database
    existing_fields_count = fields_collection.count_documents({})

    if existing_fields_count == 0:
        # Insert default fields if none exist
        for field in default_fields:
            add_field(field["name"], field["is_required"], field["page"])
        print("Default fields added.")
    else:
        print("Fields already exist.")

# Example Usage
if __name__ == "__main__":
    # # Add a new field to step 2
    # add_field("phone", True, 2)

    # Add default fields if no fields exist in the collection
    add_default_fields()

