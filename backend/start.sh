#!/usr/bin/env bash
# Start script for Render backend deployment

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn server:app --host 0.0.0.0 --port $PORT
