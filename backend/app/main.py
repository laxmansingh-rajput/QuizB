from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils.basicUtils import get_frontend_url
from .routes.quizCreation import creationRouter
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_frontend_url(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test Route
@app.get('/test')
def testRoute():
    return {"success":True, "message": "Server Running Fine"}

app.include_router(creationRouter)