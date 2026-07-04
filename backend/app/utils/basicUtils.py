import os
from dotenv import load_dotenv

load_dotenv()

def get_frontend_url():
    return ( os.getenv('LOCAL_FRONTEND_URL')
            if os.getenv('ENVIORNMENT')=='development'
            else os.getenv('FRONTEND_URL')
            )