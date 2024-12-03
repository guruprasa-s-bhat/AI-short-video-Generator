import { storage } from "@/configs/FirebaseConfig"; // Import Firebase Storage
import { getDownloadURL, ref, uploadString } from "firebase/storage"; // Firebase Storage functions
import axios from "axios";
import Replicate from "replicate";
import { NextResponse } from "next/server";

// Initialize Replicate with your API token
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN, // Your Replicate API token from env variables
});

export async function POST(req) {
  try {
    // Validate prompt input
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing prompt." },
        { status: 400 }
      );
    }

    // Input configuration for Replicate API
    const input = {
      prompt, // the prompt received from the request
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    // Run the Replicate model
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", // The model ID
      { input }
    );

    // Ensure the output is valid
    if (!output || !output[0]) {
      throw new Error("No valid image URL returned from Replicate.");
    }

    // Convert the image URL to base64 format
    const base64Image = await convertImage(output[0]);

    // Generate a unique file name and store the image in 'ai-short-video-files' folder
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const fileName = `ai-short-video-files/${timestamp}_${prompt.slice(0, 10).replace(/[^a-zA-Z0-9]/g, "")}.png`;

    // Firebase Storage reference
    const imageStorageRef = ref(storage, fileName);

    // Upload image to Firebase Storage as a base64 string
    await uploadString(imageStorageRef, base64Image, "data_url");

    // Get the download URL for the uploaded image
    const downloadUrl = await getDownloadURL(imageStorageRef);

    // Return the download URL as a response
    return NextResponse.json(
      {
        result: downloadUrl,
        fileName,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}

// Converts image URL to base64
const convertImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch image. Status code: ${response.status}`);
    }

    // Prepend the correct media type and encoding specifier
    return `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw new Error("Image conversion to base64 failed.");
  }
};
