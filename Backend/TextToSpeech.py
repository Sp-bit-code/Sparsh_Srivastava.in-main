import asyncio
import edge_tts
import os
import sys
from dotenv import dotenv_values

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "Data")
SPEECH_PATH = os.path.join(DATA_DIR, "speech.mp3")

os.makedirs(DATA_DIR, exist_ok=True)

# Read local .env only for local development
env_vars = dotenv_values(os.path.join(BASE_DIR, ".env"))

# Render environment variable first, local .env second, default voice last
AssistantVoice = (
    os.getenv("AssistantVoice")
    or env_vars.get("AssistantVoice")
    or "en-IN-NeerjaNeural"
)


def clean_text(text):
    return (
        str(text or "")
        .replace("*", "")
        .replace("#", "")
        .replace("`", "")
        .replace("_", "")
        .replace("~", "")
        .strip()
    )


async def generate_speech(text):
    text = clean_text(text)

    if not text:
        text = "Sorry, I do not have anything to speak."

    if os.path.exists(SPEECH_PATH):
        os.remove(SPEECH_PATH)

    print(f"Using voice: {AssistantVoice}", flush=True)
    print(f"Saving speech to: {SPEECH_PATH}", flush=True)

    communicate = edge_tts.Communicate(
        text=text,
        voice=AssistantVoice,
        rate="+8%",
        pitch="+3Hz",
        volume="+0%",
    )

    await communicate.save(SPEECH_PATH)

    if not os.path.exists(SPEECH_PATH):
        raise FileNotFoundError("speech.mp3 was not created.")

    print("Speech generated successfully.", flush=True)


if __name__ == "__main__":
    text = " ".join(sys.argv[1:]).strip()

    try:
        asyncio.run(generate_speech(text))
    except Exception as error:
        print(f"TTS Python Error: {error}", file=sys.stderr, flush=True)
        sys.exit(1)
