from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'portfolio')

if not mongo_url:
    import json
    class MockCollection:
        def __init__(self, filename):
            self.filename = Path(filename)
            if not self.filename.parent.exists():
                self.filename.parent.mkdir(parents=True, exist_ok=True)
            if not self.filename.exists():
                with open(self.filename, 'w') as f:
                    f.write('[]')

        def _read(self):
            try:
                with open(self.filename, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                return []

        def _write(self, data):
            try:
                with open(self.filename, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
            except Exception:
                logging.exception("Failed to write mock db file")

        async def insert_one(self, document):
            data = self._read()
            data.append(document)
            self._write(data)
            return True

        def find(self, filter=None, projection=None):
            data = self._read()
            results = []
            for doc in data:
                doc_copy = dict(doc)
                if projection:
                    for k, v in projection.items():
                        if v == 0 and k in doc_copy:
                            del doc_copy[k]
                results.append(doc_copy)
            
            class FindResult:
                def __init__(self, items):
                    self.items = items

                def sort(self, key, direction=-1):
                    # Sort logic
                    self.items.sort(key=lambda x: x.get(key, ''), reverse=(direction == -1))
                    return self

                async def to_list(self, length):
                    return self.items[:length]

            return FindResult(results)

    class MockDB:
        def __init__(self):
            self.contact_messages = MockCollection(ROOT_DIR / 'contact_messages.json')

    db = MockDB()
    client = None
else:
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(default="", max_length=200)
    message: str = Field(min_length=1, max_length=4000)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Aravind Reddy Portfolio API"}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_messages.insert_one(doc)
    except Exception:
        logging.exception("Failed to store contact message")
        raise HTTPException(status_code=500, detail="Failed to save message")
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
