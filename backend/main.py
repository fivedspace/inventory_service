#!/usr/bin/python3
# This module is used to start the service
import uvicorn
from core.api import app


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8080, log_level='info')

