import os
import sys
import azure.cognitiveservices.speech as speechsdk
from dotenv import dotenv_values

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "Data")
SPEECH_PATH = os.path.join(DATA_DIR, "speech.mp3")

os.makedirs(DATA_DIR, exist_ok=True)

# Read local .env only for local development
env_vars = dotenv_values(os.path.join(BASE_DIR, ".env"))

AZURE_SPEECH_KEY = (
    os.getenv("AZURE_SPEECH_KEY")
    or env_vars.get("AZURE_SPEECH_KEY")
)

AZURE_SPEECH_REGION = (
    os.getenv("AZURE_SPEECH_REGION")
    or env_vars.get("AZURE_SPEECH_REGION")
)

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
        .strip()
    )


def generate_speech(text):
    text = clean_text(text)

    if not text:
        text = "Sorry, I do not have anything to speak."

    if not AZURE_SPEECH_KEY:
        raise ValueError("AZURE_SPEECH_KEY is missing.")

    if not AZURE_SPEECH_REGION:
        raise ValueError("AZURE_SPEECH_REGION is missing.")

    if os.path.exists(SPEECH_PATH):
        os.remove(SPEECH_PATH)

    print(f"Using Azure voice: {ASSISTANT_VOICE}", flush=True)
    print(f"Saving speech to: {SPEECH_PATH}", flush=True)

    speech_config = speechsdk.SpeechConfig(
        subscription=AZURE_SPEECH_KEY,
        region=AZURE_SPEECH_REGION,
    )

    speech_config.speech_synthesis_voice_name = ASSISTANT_VOICE

    speech_config.set_speech_synthesis_output_format(
        speechsdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3
    )

    audio_config = speechsdk.audio.AudioOutputConfig(filename=SPEECH_PATH)

    synthesizer = speechsdk.SpeechSynthesizer(
        speech_config=speech_config,
        audio_config=audio_config,
    )

    result = synthesizer.speak_text_async(text).get()

    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        if not os.path.exists(SPEECH_PATH):
            raise FileNotFoundError("speech.mp3 was not created.")

        print("Speech generated successfully.", flush=True)
        return

    if result.reason == speechsdk.ResultReason.Canceled:
        cancellation = speechsdk.SpeechSynthesisCancellationDetails(result)

        raise RuntimeError(
            f"Speech synthesis canceled: {cancellation.reason}. "
            f"Error details: {cancellation.error_details}"
        )

    raise RuntimeError("Speech synthesis failed.")


if __name__ == "__main__":
    text = " ".join(sys.argv[1:]).strip()

    try:
        generate_speech(text)
    except Exception as error:
        print(f"TTS Python Error: {error}", file=sys.stderr, flush=True)
        sys.exit(1)
