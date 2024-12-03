"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
const Dashboard = () => {
  const [videoList, setVideoList] = useState([]);
  
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetVideoList();
    }
  }, [user]);

  // used to get user videos
  const GetVideoList = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setVideoList(result);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-sky-600">Dashboard</h2>

        <Link href={"/dashboard/create-new"}>
          <Button>+ Create New</Button>
        </Link>
      </div>

      {videoList?.length == 0 && (
        <div>
          <EmptyState />
        </div>
      )}
      {/* List of Videos */}
      <VideoList  videoList={videoList}/>
    </div>
  );
};

export default Dashboard;
