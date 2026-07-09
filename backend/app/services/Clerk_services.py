from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer
from dotenv import load_dotenv
import os
load_dotenv()

# Use your Clerk JWKS endpoint
clerk_config = ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL")) 

clerk_auth_guard = ClerkHTTPBearer(config=clerk_config)

# @app.get("/")
# async def read_root(credentials: HTTPAuthorizationCredentials = Depends(clerk_auth_guard)):
#     return JSONResponse(content=jsonable_encoder(credentials))
