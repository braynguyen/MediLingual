import os
import sounddevice as sd
# from scipy.io.wavfile import write
import wavio as wv
from google.cloud import storage
 

def create_audio():
    # Sampling frequency
    freq = 44100
    
    # Recording duration
    duration = 5
    
    # Start recorder with the given values 
    # of duration and sample frequency
    recording = sd.rec(int(duration * freq), samplerate=freq, channels=2)
    
    # Record audio for the given number of seconds
    sd.wait()

    # Specify the file path for saving the recording
    output_directory = "recordings"
    output_file_path = os.path.join(output_directory, "recording.wav")

    # Convert the NumPy array to audio file
    wv.write(output_file_path, recording, freq, sampwidth=2)

    # Initialize the client
    client = storage.Client()

    # Get the google cloud bucket
    bucket = client.bucket('test-yhacks')

    # the path to the local file and the destination object name
    source_file_name = output_file_path
    destination_blob_name = 'recordings/recording.wav'

    # Upload the file
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(source_file_name)

    print("Audio Uploaded.\n")


if __name__ == "__main__":
    create_audio()