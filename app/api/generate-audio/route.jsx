import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

// Initialize the Google Cloud Text-to-Speech client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_TEXT_TO_SPEECH_API_KEY,
});

export async function POST(req) {
  try {
    // Get the text and id from the request body
    const { text, id } = await req.json();

    // Validate input
    if (!text || !id) {
      console.error("Missing required fields: text or id");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Define the storage reference for the audio file
    const storageRef = ref(storage, `ai-short-video-files/${id}.mp3`);

    // Define the request to the Text-to-Speech API
    const request = {
      input: { text: text },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };

    // Call Google Cloud's Text-to-Speech API
    const [response] = await client.synthesizeSpeech(request);

    // Ensure audioContent exists in the response
    if (!response?.audioContent) {
      console.error("Error: No audio content returned from Text-to-Speech API");
      return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }

    // Create an audio buffer from the response
    const audioBuffer = Buffer.from(response.audioContent, "binary");

    // Upload the audio file to Firebase Storage
    const uploadResult = await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

    // Ensure upload was successful
    if (!uploadResult) {
      console.error("Error: Failed to upload audio file to Firebase");
      return NextResponse.json({ error: "Failed to upload audio" }, { status: 500 });
    }

    // Get the public download URL for the audio file
    const downloadUrl = await getDownloadURL(storageRef);

    // Ensure the download URL was successfully retrieved
    if (!downloadUrl) {
      console.error("Error: Failed to retrieve the download URL for the audio file");
      return NextResponse.json({ error: "Failed to retrieve download URL" }, { status: 500 });
    }

    console.log("Audio file uploaded successfully. Download URL:", downloadUrl);

    // Return the download URL as the response
    return NextResponse.json({ Result: downloadUrl });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
