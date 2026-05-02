import asyncio
import os
import sys
import edge_tts
from dotenv import dotenv_values

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


async def generate_speech(text):
    text = clean_text(text)

    if not text:
        text = "Sorry, I do not have anything to speak."

    if os.path.exists(SPEECH_PATH):
        os.remove(SPEECH_PATH)

    print(f"Using edge-tts voice: {ASSISTANT_VOICE}", flush=True)
    print(f"Saving speech to: {SPEECH_PATH}", flush=True)

    last_error = None

    for attempt in range(1, 5):
        try:
            print(f"edge-tts attempt {attempt}/4", flush=True)

            communicate = edge_tts.Communicate(
                text=text,
                voice=ASSISTANT_VOICE,
                rate="+8%",
                pitch="+3Hz",
                volume="+0%",
                receive_timeout=30,
            )

            await communicate.save(SPEECH_PATH)

            if os.path.exists(SPEECH_PATH):
                print("Speech generated successfully.", flush=True)
                return

            raise FileNotFoundError("speech.mp3 was not created.")

        except Exception as error:
            last_error = error
            print(
                f"edge-tts attempt {attempt} failed: {error}",
                file=sys.stderr,
                flush=True,
            )

            if os.path.exists(SPEECH_PATH):
                os.remove(SPEECH_PATH)

            await asyncio.sleep(2 * attempt)

    raise RuntimeError(f"edge-tts failed after retries: {last_error}")


if __name__ == "__main__":
    text = " ".join(sys.argv[1:]).strip()

    try:
        asyncio.run(generate_speech(text))
    except Exception as error:
        print(f"TTS Python Error: {error}", file=sys.stderr, flush=True)
        sys.exit(1)
