# create an OpenAI API call that removes medical jargon from a given text.
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

def removeJargon(text: str) -> str:
    env_vars = load_env()
    client = OpenAI(
        api_key=env_vars.get("QUENTINS_OPEN_AI_KEY"),
    )

    prompt = "Your job is to translate the medical jargon into layman's terms. Here are a few examples of medical jargon to layman term's mappings: "
    prompt += "1. 'Myocardial infarction' -> 'heart attack' "
    prompt += "2. 'Hypertension' -> 'high blood pressure' "
    prompt += "3. 'Hyperlipidemia' -> 'high cholesterol' "
    prompt += "4. 'Atherosclerosis' -> 'hardening of the arteries' "
    prompt += "5. 'Cerebrovascular accident' -> 'stroke' "
    prompt += "6. 'Gastrointestinal' -> 'digestive system' "
    prompt += "7. 'Gastroenteritis' -> 'stomach flu' "


    prompt1 = "The following text is a doctor's words to a patient that contains medical jargon. Please translate the medical jargon into layman's terms. Include nothing else in your response."

    prompt1 += text

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": prompt1}
        ]
    )

    # returns just the text
    return completion.choices[0].message.content.strip('"')
