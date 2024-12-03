import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  script,
  audioFileUrl,
  captions,
  imageList,
  setDurationInFrames,
}) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

 
  const safeCaptions = Array.isArray(captions) ? captions : [];

  useEffect(() => {
    if (safeCaptions.length > 0) {
      const duration = safeCaptions[safeCaptions.length - 1].end * fps;
      setDurationInFrames(duration); 
    }
  }, [safeCaptions, fps, setDurationInFrames]);

  const getCurrentCaptions = () => {
    const currentTime = frame / fps;
    const caption = safeCaptions.find(
      (c) => c.start <= currentTime && c.end >= currentTime
    );
    return caption ? caption.text : "";
  };

  // Check if audioFileUrl is valid, and if not, provide a fallback
  const audioSrc = audioFileUrl || "path/to/default-audio.mp3"; // Provide a fallback URL

  return (
    <AbsoluteFill className="bg-black">
      {imageList?.map((item, index) => {
        const duration =
          ((index + 1) * (safeCaptions[safeCaptions.length - 1]?.end || 1) * fps) /
          imageList.length;
        return (
          <Sequence
            key={index}
            from={
              (index * (safeCaptions[safeCaptions.length - 1]?.end || 1) * fps) /
              imageList.length
            }
            durationInFrames={duration}
          >
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                opacity: frame / 30, // Example fade-in effect for the images
                transform: `scale(${1 + frame / 5000})`, // Scale-up effect for images
                transition: "transform 1s ease-in-out, opacity 1s ease-in-out", // Smooth animations
              }}
            >
              <Img
                src={item}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scale(1.1)",
                }}
              />
              <AbsoluteFill
                style={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-mid", 
                  textAlign: "center",
                  width: "100%",
                  paddingTop:300,
                  position: "absolute", 
                }}
              >
                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
              </AbsoluteFill>
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Audio src={audioSrc} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
