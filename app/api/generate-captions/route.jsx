import { NextResponse } from "next/server";
import { ref, uploadString, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { storage } from "@/configs/FirebaseConfig";

// Function to check the status of the transcription
async function checkTranscriptionStatus(apiKey, transcriptionId) {
  try {
    const response = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptionId}`, {
      method: "GET",
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();

    if (data.status === "completed") {
      return data;
    }

    if (data.status === "failed") {
      throw new Error(`Transcription failed: ${data.error}`);
    }

    // If the transcription is still being processed
    return null;
  } catch (error) {
    console.error("Error checking transcription status:", error);
    throw new Error("Failed to check transcription status.");
  }
}

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    // Validate input
    if (!audioFileUrl) {
      return NextResponse.json({ error: "Audio file URL is required" }, { status: 400 });
    }

    const apiKey = process.env.CAPTION_API;
    if (!apiKey) {
      return NextResponse.json(
        { error: "CAPTION_API environment variable is not set" },
        { status: 500 }
      );
    }

    // Step 1: Initiate transcription
    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio_url: audioFileUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AssemblyAI API Error:", errorData);
      return NextResponse.json({ error: "Failed to generate captions", details: errorData }, { status: response.status });
    }

    // Step 2: Get the transcription ID from the response
    const transcriptData = await response.json();
    const transcriptionId = transcriptData.id;

    console.log("Transcription initiated with ID:", transcriptionId);

    // Step 3: Poll the transcription status
    let transcript = null;
    let attempts = 0;

    while (!transcript && attempts < 10) {
      attempts++;
      transcript = await checkTranscriptionStatus(apiKey, transcriptionId);

      if (transcript) {
        console.log("Transcript completed:", transcript.text);

        // Step 4: Process the transcript to generate the desired format
        const formattedTranscript = transcript.words.map(wordData => ({
          text: wordData.text,
          start: wordData.start / 1000,  // Convert to seconds
          end: wordData.end / 1000,      // Convert to seconds
          confidence: wordData.confidence,
          speaker: wordData.speaker || "Narrator", // Assuming 'speaker' is part of the wordData, else default to "Narrator"
        }));

        // Step 5: Save transcription text to Firebase Storage in the specified folder
        const fileRef = ref(storage, `ai-short-video-files/${transcriptionId}.txt`); // Save in the 'ai-short-video-files' folder
        await uploadString(fileRef, JSON.stringify(formattedTranscript), "raw"); // Upload the transcription text

        // Get the file's download URL
        const downloadURL = await getDownloadURL(fileRef);

        // Return the formatted transcript and download URL
        return NextResponse.json({
          message: "Transcription completed and stored successfully.",
          transcriptText: formattedTranscript,
          downloadUrl: downloadURL, // Return the file's download URL
        });
      }

      // Wait for a while before trying again
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Poll every 5 seconds
    }

    // If we reach this point, it means the transcription is taking too long
    return NextResponse.json({ error: "Transcription is taking too long" }, { status: 408 });

  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "An error occurred while processing the request", details: error.message }, { status: 500 });
  }
}
