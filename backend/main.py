#!/usr/bin/python3

import uvicorn
from core.api import app


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, log_level='info')

