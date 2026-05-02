import asyncio
import os
import sys
from dotenv import dotenv_values

import edge_tts
from gtts import gTTS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "Data")
SPEECH_PATH = os.path.join(DATA_DIR, "speech.mp3")

os.makedirs(DATA_DIR, exist_ok=True)

env_vars = dotenv_values(os.path.join(BASE_DIR, ".env"))

ASSISTANT_VOICE = (
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
        .replace("\n", " ")
        .replace("\r", " ")
        .strip()
    )


async def generate_with_edge_tts(text):
    print(f"Trying edge-tts voice: {ASSISTANT_VOICE}", flush=True)

    communicate = edge_tts.Communicate(
        text=text,
        voice=ASSISTANT_VOICE,
        rate="+8%",
        pitch="+3Hz",
        volume="+0%",
    )

    await communicate.save(SPEECH_PATH)


def generate_with_gtts(text):
    print("edge-tts failed. Falling back to gTTS...", flush=True)

    tts = gTTS(
        text=text,
        lang="en",
        tld="co.in",
        slow=False,
    )

    tts.save(SPEECH_PATH)


def generate_speech(text):
    text = clean_text(text)

    if not text:
        text = "Sorry, I do not have anything to speak."

    if os.path.exists(SPEECH_PATH):
        os.remove(SPEECH_PATH)

    try:
        asyncio.run(generate_with_edge_tts(text))
    except Exception as edge_error:
        print(f"edge-tts error: {edge_error}", file=sys.stderr, flush=True)
        generate_with_gtts(text)

    if not os.path.exists(SPEECH_PATH):
        raise FileNotFoundError("speech.mp3 was not created.")

    print("Speech generated successfully.", flush=True)


if __name__ == "__main__":
    text = " ".join(sys.argv[1:]).strip()

    try:
        generate_speech(text)
    except Exception as error:
        print(f"TTS Python Error: {error}", file=sys.stderr, flush=True)
        sys.exit(1)
