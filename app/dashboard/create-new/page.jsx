"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const scriptData =
  "Did you know? The Great Wall of China, built over centuries, spans more than 13,000 miles! It’s one of the longest structures ever created by humans, showcasing the incredible engineering skills of ancient civilizations.In ancient Egypt, pharaohs were considered gods on earth. The Great Pyramid of Giza, built around 2560 BC, is one of the Seven Wonders of the Ancient World and was constructed as a tomb for the Pharaoh Khufu.In 1776, the Declaration of Independence was signed, marking the birth of the United States of America. This historic document proclaimed the thirteen American colonies freedom from British rule and laid the foundation for democracy.";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    topic: "",
    imageStyle: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    GenerateAudioFile(scriptData);
  };

  //Get Video Scripts
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields, No Plain text`;
    console.log(prompt);

    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        setVideoScript(resp.data.result);
        console.log(resp.data.result);
        GenerateAudioFile(resp.data.result);
      });
    setLoading(false);
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    // videoScriptData.forEach((item) => {
    //   script += item.contentText + " ";
    // });

    await axios
      .post("/api/generate-audio", {
        text: videoScriptData,
        id: id,
      })
      .then((resp) => {
        console.log(resp.data);
      });
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button onClick={onCreateClickHandler} className="mt-10 w-full">
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
};

export default CreateNew;
