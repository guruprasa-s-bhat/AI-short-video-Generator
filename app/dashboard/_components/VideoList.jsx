import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState(null);
  return (
    <div className="mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4 gap-">
      {videoList.map((video, index) => (
        <div
          className="flex justify-between items-center bg-white p-5 rounded-lg shadow-md"
          key={index}
        >
          <div
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setOpenPlayerDialog(Date.now());
              setVideoId(video.id);
            }}
          >
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={250}
              compositionHeight={350}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              style={{
                borderRadius: 15,
              }}
              inputProps={{
                ...video,
                setDurationInFrames: (v) => console.log(v),
              }}
            />
          </div>
        </div>
      ))}
      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;
