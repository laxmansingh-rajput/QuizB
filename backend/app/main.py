from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from .utils.basic_utils import get_frontend_url
from .routes.quiz import creationRouter
from .error_handler.req_validation_error import req_validation_error
from .config import postgres
from .db.creation_queries import create_query_table
from .config.logger import logger
app = FastAPI()

@app.on_event("startup")
async def startup():
    try:
        await postgres.getConnectionPool()
        connection_pool= postgres.connection_pool
        async with connection_pool.acquire() as connection:
           await create_query_table(connection)
    except Exception as e:
        logger.error(f"unable to setup the connection and table due to {e}")



app.add_middleware(
    CORSMiddleware,
    allow_origins=get_frontend_url(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    RequestValidationError,
    req_validation_error
)

# Test Route
@app.get('/test')
def testRoute():
    return {"success":True, "message": "Server Running Fine"}

app.include_router(creationRouter)