# create an OpenAI API call that translates from a given langauge into a target language
#

# The high level goal of this function is to make the doctors response more understandable to the patient.
# This includes translating medical jargon into layman's terms.
# The function will take in a string of text and return a string of text.
# The function will use the OpenAI API to translate the text.
# It will utilize many-shot prompting techniques based off of a JSON file which includes the jargon and the layman's terms.
# This only will be called when the user is a doctor.

import openai
from openai import OpenAI
from fixInput import load_env

def translateForDoctor(str: targetLanguage, str: text) -> str:
    env_vars = load_env()
    client = OpenAI(
        api_key=env_vars.get("QUENTINS_OPEN_AI_KEY"),
    )

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a translator. Translate the following text into " + targetLanguage + ". Output the translated text as a JSON object with the key 'translation' which contains the translation."},
            {"role": "user", "content": text}
        ]
    )

    # returns just the text
    return completion.choices[0].message.content.strip('"')

    return text

def translateForPatient(str: targetLanguage, str: text) -> str:
    env_vars = load_env()
    client = OpenAI(
        api_key=env_vars.get("QUENTINS_OPEN_AI_KEY"),
    )

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a translator. Translate the following text into " + targetLanguage + ". Output the translated text as a JSON object with the key 'translation' which contains the translation and a key `symptoms` that contains a list of symptoms the patient is describing. If the patient does not describe any symptoms the value for the `symptoms` key should be an empty list."},
            {"role": "user", "content": text}
        ]
    )

    # returns just the text
    return completion.choices[0].message.content.strip('"')

    return text