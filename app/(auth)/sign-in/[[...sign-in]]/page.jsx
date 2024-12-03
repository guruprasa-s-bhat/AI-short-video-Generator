"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-900 text-white">
      {/* Left Image Section */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Image
          src={"/ai.jpeg"}
          alt="login"
          width={500}
          height={500}
          className="w-full object-cover rounded-lg shadow-xl"
        />
      </motion.div>

      {/* Right Sign-In Section */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
      >
        <motion.div
          className="p-8 bg-gray-800 rounded-lg shadow-lg"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <SignIn />
        </motion.div>
      </motion.div>
    </div>
  );
}
