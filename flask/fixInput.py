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

def fix_input(text):
    env_vars = load_env()
    client = OpenAI(
        api_key=env_vars.get("QUENTINS_OPEN_AI_KEY"),
    )

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a text cleaner for a bedside translator."},
            {"role": "user", "content": "The following text contains the output from a audio to text from a conversation between a doctor and a patient. Due to the limitations of the audio to text model it may contain sentences that do not make sense, or a grammatically incorrect. Your job is to be a professional transcriptionist. Output a logical and grammatically correct edited version of the text." + text}
        ]
    )

    # returns just the text
    return completion.choices[0].message.content.strip('"')


if __name__ == "__main__":
    text = input("Give an example prompt to clean up:\n")

    print(fix_input(text))