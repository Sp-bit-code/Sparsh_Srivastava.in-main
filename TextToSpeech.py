import asyncio
import edge_tts
import os
import sys
import re
from dotenv import dotenv_values

env_vars = dotenv_values(".env")

AssistantVoice = env_vars.get("AssistantVoice", "en-IN-NeerjaNeural")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "Data")
SPEECH_PATH = os.path.join(DATA_DIR, "speech.mp3")

os.makedirs(DATA_DIR, exist_ok=True)

def remove_links(text):
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"www\.\S+", "", text)
    return text.strip()

async def generate_speech(text):
    if os.path.exists(SPEECH_PATH):
        os.remove(SPEECH_PATH)

    communicate = edge_tts.Communicate(
        text=text,
        voice=AssistantVoice,
        rate="+8%",
        pitch="+3Hz",
        volume="+0%"
    )

    await communicate.save(SPEECH_PATH)

if __name__ == "__main__":
    text = " ".join(sys.argv[1:]).strip()

    if not text:
        text = "Sorry, I do not have anything to speak."

    text = remove_links(text)

    if not text:
        text = "    Here is the link."

    asyncio.run(generate_speech(text))