from google.cloud import speech_v1
# from google.cloud.speech_v1 import enums

def transcribe_long_running_audio():
    client = speech_v1.SpeechClient()
    audio_uri = 'gs://test-yhacks/recordings/recording1.wav'

    # "gu" or "it" or "en-US"
    config = {
        "language_code": "en-US",
        "audio_channel_count": 2,
        "enable_separate_recognition_per_channel": True
    }
    audio = {"uri": audio_uri}

    # analyze the audio
    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = operation.result()

    # there are multiple alternatives
    transcript = response.results[0].alternatives[0].transcript
    print(transcript)

    # print the response alternatives
    # for result in response.results:
    #     # print(result)
    #     alternative = result.alternatives[0]
    #     print("Transcript: {}".format(alternative.transcript))

        

if __name__ == '__main__':
    transcribe_long_running_audio()
