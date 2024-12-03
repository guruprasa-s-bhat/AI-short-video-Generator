// app/api/render-video/route.js (or .ts if you're using TypeScript)

import { NextResponse } from 'next/server';
import { render } from '@remotion/renderer';
import { join } from 'path';
import fs from 'fs';
import { tmpdir } from 'os';
import { promises as fsPromises } from 'fs';
import { getVideoComposition } from './getVideoComposition'; // Custom function to fetch composition

export async function POST(req) {
  try {
    // Get the video data from the request body (e.g., video ID, settings)
    const { videoId, videoSettings } = await req.json();

    // Check for valid video ID and settings
    if (!videoId || !videoSettings) {
      return NextResponse.json({ message: 'Invalid input data' }, { status: 400 });
    }

    // Specify the path for the output video file
    const outputFilePath = join(tmpdir(), `video-output-${Date.now()}.mp4`);

    // Get the composition from the Remotion video component
    const composition = await getVideoComposition(videoId, videoSettings); // Fetch the composition

    // Render the video
    const result = await render({
      composition,
      output: outputFilePath,
      inputProps: videoSettings, // Pass the input data for the video
      codec: 'h264',  // You can adjust the codec if needed
    });

    console.log('Render result:', result);

    // After rendering is complete, read the file and send it back to the user
    const videoBuffer = await fsPromises.readFile(outputFilePath);

    // Remove the temporary video file after sending it to the user
    await fsPromises.unlink(outputFilePath);

    // Send the video file as a response to the user
    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="video.mp4"',
      },
    });
  } catch (error) {
    console.error('Error during video rendering:', error);
    return NextResponse.json({ message: 'Failed to render video', error: error.message }, { status: 500 });
  }
}
