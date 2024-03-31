# import openai
from openai import OpenAI

# dotenv pip file is not installing for some reason
def load_env(filename=".env"):
    env = {}
    with open(filename, "r") as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                env[key.strip()] = value.strip()
    return env

def speech_to_text():
    env_vars = load_env()
    client = OpenAI(
        api_key=env_vars.get("QUENTINS_OPEN_AI_KEY"),
    )

    audio_file= open("audio/recordings/Italian doctor.m4a", "rb")
    transcription = client.audio.translations.create(
        model="whisper-1", 
        file=audio_file
    )

    # returns just the text
    return transcription.text


if __name__ == "__main__":
    # text = input("Give an example prompt to clean up:\n")

    print(speech_to_text())