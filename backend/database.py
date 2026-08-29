import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "portfolio_db")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

# Collections
feedback_collection = db["feedback"]