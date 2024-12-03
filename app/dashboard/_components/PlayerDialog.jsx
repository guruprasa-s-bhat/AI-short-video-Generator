import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import { useEffect, useState } from "react";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(playVideo);
  const [videoData, setVideoData] = useState();
  const [durationInFrames, setDurationInFrames] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setOpenDialog(playVideo); // Updates the open dialog state
    videoId && GetVideoData();
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));
      setVideoData(result[0]);
      console.log(result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      // Show loading state or progress
      alert("Rendering video, this may take some time...");

      // Call the server API to render the video
      const response = await fetch("/api/render-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, videoData }), // Pass video data to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to render video. Please try again.");
      }

      const { downloadUrl } = await response.json(); // Extract the URL of the rendered video

      // Trigger download
      const link = document.createElement("a");
      link.href = downloadUrl; // URL of the rendered video
      link.download = `video-${videoId}.mp4`; // Filename for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Video exported successfully!");
    } catch (error) {
      console.error("Error during export:", error);
      alert("Failed to export the video. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog when the close button is clicked
  };

  if (isLoading) {
    return <p>Loading video...</p>;
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrames.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrames: (frameValue) => {
                  setDurationInFrames(frameValue);
                },
              }}
            />
            <div className="flex gap-10 mt-10">
              <Button
                variant="ghost"
                onClick={() => {
                  handleCloseDialog();
                  router.replace("/dashboard");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleExport}>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
