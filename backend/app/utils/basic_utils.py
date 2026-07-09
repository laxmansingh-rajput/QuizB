import os
import string,secrets
from dotenv import load_dotenv
load_dotenv()

table_creation_on_server_start = False

def get_frontend_url():
    return ( os.getenv('LOCAL_FRONTEND_URL')
            if os.getenv('ENVIORNMENT')=='development'
            else os.getenv('FRONTEND_URL')
            )

def get_secret_sting(length: int )-> string:
    DataString = string.ascii_uppercase + string.digits
    return ('').join(
        [secrets.choice(DataString) for i in range(length)]
    )