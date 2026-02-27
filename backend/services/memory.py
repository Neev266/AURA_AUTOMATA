# backend/memory.py

from collections import deque

# Store memory per session
conversation_store = {}

MAX_HISTORY = 8  # keeps last 8 exchanges


def get_memory(session_id: str):
    if session_id not in conversation_store:
        conversation_store[session_id] = deque(maxlen=MAX_HISTORY)
    return conversation_store[session_id]