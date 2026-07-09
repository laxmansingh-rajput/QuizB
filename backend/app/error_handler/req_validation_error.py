from fastapi import Request
from ..config.logger import logger
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

def req_validation_error(request: Request, exc: RequestValidationError):
    error = exc.errors()
    logger.error("%s: %s", error[0]["msg"], request.url)
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": error[0]['msg'],
        }
    )
