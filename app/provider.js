"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);

  const isNewUser = async () => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      if (result.length === 0) {
        await db.insert(Users).values({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl || null, // Default to null if not available
          subscription: false, // Set subscription to false by default
        });
      }
    } catch (error) {
      console.error("Database operation failed:", error);
    }
  };

  return <div>{children}</div>;
};

export default Provider;
