"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users, VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/router";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { eq } from "drizzle-orm";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    topic: "",
    imageStyle: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [imageList, setImageList] = useState([]);
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits <= 0)
      toast("You don't have enough credits to create a video");
    else {
      GetVideoScript();
      setLoading(true);
    }
  };

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields, No Plain text`;

    try {
      const resp = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      if (resp.data && resp.data.result && resp.data.result.length > 0) {
        setVideoData((prev) => ({
          ...prev,
          videoScript: resp.data.result,
        }));
        setVideoScript(resp.data.result);

        await GenerateAudioFile(resp.data.result);
      } else {
        console.error("Error: Received empty or invalid video script data.");
        alert("Failed to generate video script. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching video script:", error);
      alert(
        "An error occurred while generating the video script. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    console.log(videoScriptData);
    let script = "";
    const id = uuidv4();

    if (!videoScriptData || videoScriptData.length === 0) {
      console.error("Error: videoScriptData is undefined or empty.");
      alert("No valid video script available.");
      return;
    }

    videoScriptData.forEach((element, index) => {
      if (element.contentText) {
        script += element.contentText + " ";
      } else {
        console.warn(
          `Warning: Missing contentText in element at index ${index}`
        );
      }
    });

    if (script.trim() === "") {
      console.error("Error: Script is empty, cannot generate audio.");
      alert("Script is empty, cannot generate audio.");
      return;
    }

    try {
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });

      // Check if the audio URL is returned
      if (resp.data && resp.data.Result) {
        const audioUrl = resp.data.Result;
        console.log("Generated Audio URL:", audioUrl); // Debugging the URL
        setAudioFileUrl(audioUrl);
        setVideoData((prev) => ({
          ...prev,
          audioFileUrl: audioUrl,
        }));

        // Proceed with generating captions
        await GenerateAudioCaption(audioUrl, videoScriptData);
      } else {
        console.error("Error: No valid audio URL returned from API.");
        alert("Failed to generate audio file. Please try again.");
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      alert("An error occurred while generating the audio. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log("Audio File URL: ", fileUrl);

    try {
      // Make the API call to generate captions
      const resp = await axios.post("/api/generate-captions", {
        audioFileUrl: fileUrl,
      });

      // Check if the API response contains transcriptText
      if (resp.data && resp.data.transcriptText) {
        // Update the state with the transcriptText as captions
        const transcript = resp.data.transcriptText;
        setCaptions(transcript);
        setVideoData((prev) => ({
          ...prev,
          captions: transcript, // Save transcriptText as captions
        }));

        console.log("Generated Captions: ", transcript);

        // Proceed with other tasks (e.g., generate images)
        await GenerateImage(videoScriptData); // Continue to the next step
      } else {
        // Handle the case when no captions are returned
        console.error("Error: No captions returned from the API.");
        alert("Failed to generate captions. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error generating captions:", error);
      alert("An error occurred while generating captions. Please try again.");
    } finally {
      // Ensure loading state is cleared after the process
      setLoading(false);
    }
  };

  const GenerateImage = async (videoScriptData) => {
    setLoading(true);
    const images = [];

    for (const [index, element] of videoScriptData.entries()) {
      try {
        if (!element.imagePrompt || element.imagePrompt.trim() === "") {
          console.error(`Missing or invalid imagePrompt at index ${index}`);
          images.push("defaultImageUrl"); // Fallback image
          continue;
        }

        console.log(`Generating image for prompt: "${element.imagePrompt}"`);
        const response = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });

        if (response.data && response.data.result) {
          images.push(response.data.result);
        } else {
          console.error(
            `Failed to generate image for prompt: "${element.imagePrompt}"`
          );
          images.push("defaultImageUrl"); // Fallback image
        }
      } catch (error) {
        console.error("Error generating image:", error);
        images.push("defaultImageUrl"); // Fallback image
      }
    }

    setImageList(images);
    setVideoData((prev) => ({ ...prev, imageList: images }));
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(videoData).length == 4) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
  };

  const buttonVariant = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, yoyo: Infinity },
    },
  };

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    try {
      const result = await db
        .insert(VideoData)
        .values({
          script: videoData?.videoScript,
          audioFileUrl: videoData?.audioFileUrl,
          captions: videoData?.captions,
          imageList: videoData?.imageList,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({
          id: VideoData.id,
        });

      await updateUserCredits();

      setVideoId(result[0].id);

      setPlayVideo(true);

      console.log(result);
    } catch (error) {
      console.error("Error saving video data:", error);
      alert("An error occurred while saving video data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * used to update the user's credits
   */
  const updateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({ credits: user?.credits - 10 })
      .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail((prev) => ({ ...prev, credits: userDetail?.credits - 10 }));
    setVideoData(null);
  };

  return (
    <motion.div
      className="md:px-20"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <motion.div
        className="mt-10 shadow-md p-10 rounded-lg bg-gray-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <motion.div variants={buttonVariant} whileHover="hover">
          <Button
            onClick={onCreateClickHandler}
            className="mt-10 w-full py-3 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl transform transition-transform duration-300 hover:from-green-500 hover:to-blue-500"
          >
            Create Short Video
          </Button>
        </motion.div>
      </motion.div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
    </motion.div>
  );
};

export default CreateNew;
