#!/usr/bin/env python3
"""Inert local-practice example: emit fixed, nonblocking SessionStart context."""
import json

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "SessionStart",
        "additionalContext": (
            "Read the task's README and applicable instructions; "
            "confirm required outcomes before making changes. "
            "Report actual verification and distinguish unverified results."
        ),
    }
}, ensure_ascii=False))
