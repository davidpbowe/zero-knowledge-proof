from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from utils import create_authentication_challenge, verify_authentication, save_user, get_user

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)                

@app.get("/")
def root():
    return { "message": "Server application is running." }

@app.post("/register")
async def register(request: Request):
    commit = await request.json()
    commit['c'] = create_authentication_challenge(commit)
    save_user(commit)
    return commit

@app.get("/auth/{username}")
def authenticate(username: str, s: int):
    user = get_user(username)
    if not user:
        return False
    return verify_authentication(user, s)

