from google.cloud import speech_v1
# from google.cloud.speech_v1 import enums

def transcribe_long_running_audio(selected_lang):
    languages = {
        "Amharic": "am",
        "Arabic": "ar",
        "Basque": "eu",
        "Bengali": "bn",
        "English (UK)": "en-GB",
        "Portuguese (Brazil)": "pt-BR",
        "Bulgarian": "bg",
        "Catalan": "ca",
        "Cherokee": "chr",
        "Croatian": "hr",
        "Czech": "cs",
        "Danish": "da",
        "Dutch": "nl",
        "English-(US)": "en",
        "Estonian": "et",
        "Filipino": "fil",
        "Finnish": "fi",
        "French": "fr",
        "German": "de",
        "Greek": "el",
        "Gujarati": "gu",
        "Hebrew": "iw",
        "Hindi": "hi",
        "Hungarian": "hu",
        "Icelandic": "is",
        "Indonesian": "id",
        "Italian": "it",
        "Japanese": "ja",
        "Kannada": "kn",
        "Korean": "ko",
        "Latvian": "lv",
        "Lithuanian": "lt",
        "Malay": "ms",
        "Malayalam": "ml",
        "Marathi": "mr",
        "Norwegian": "no",
        "Polish": "pl",
        "Portuguese-(Portugal)": "pt-PT",
        "Romanian": "ro",
        "Russian": "ru",
        "Serbian": "sr",
        "Chinese-(PRC)": "zh-CN",
        "Slovak": "sk",
        "Slovenian": "sl",
        "Spanish": "es",
        "Swahili": "sw",
        "Swedish": "sv",
        "Tamil": "ta",
        "Telugu": "te",
        "Thai": "th",
        "Chinese-(Taiwan)": "zh-TW",
        "Turkish": "tr",
        "Urdu": "ur",
        "Ukrainian": "uk",
        "Vietnamese": "vi",
        "Welsh": "cy",
    }

    client = speech_v1.SpeechClient()
    audio_uri = 'gs://test-yhacks/recordings/recording.wav'

    lang_code = languages.get(selected_lang)

    # "gu" or "it" or "en-US"
    config = {
        "language_code": lang_code,
        "audio_channel_count": 2,
        "enable_separate_recognition_per_channel": True
    }
    audio = {"uri": audio_uri}

    # analyze the audio
    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for transcribing to complete...")
    response = operation.result()

    print(response)

    # there are multiple alternatives
    transcript = response.results[0].alternatives[0].transcript
    return transcript

    # print the response alternatives
    # for result in response.results:
    #     # print(result)
    #     alternative = result.alternatives[0]
    #     print("Transcript: {}".format(alternative.transcript))

if __name__ == '__main__':
    selected_lang = "English (US)"
    transcribe_long_running_audio(selected_lang)
