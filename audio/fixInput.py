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
#     return env

def fix_input(text):
    env_vars = load_env()
    open_ai_key = env_vars.get("QUENTINS_OPEN_AI_KEY")
    client = OpenAI()

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a text cleaner for a bedside translator."},
            {"role": "user", "content": "Clean up this text to make it suitable for a doctor or a nurse to read: " + text}
        ]
    )

    print(completion.choices[0].message)


if __name__ == "__main__":
    text = input("Give an example prompt to clean up:\n")
    
    # fix_input(text)