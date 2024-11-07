"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen space-y-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Floating Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 70%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Main Title with Scale and Rotation */}
      <motion.h1
        initial={{ opacity: 0, y: -40, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl font-extrabold z-10 drop-shadow-lg"
      >
        Welcome to AI Video Generator
      </motion.h1>

      {/* Description with Fade and Slide-Up */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
        className="text-lg z-10 text-center max-w-lg opacity-90"
      >
        Create, edit, and generate videos using the power of artificial
        intelligence. Elevate your content with stunning 3D effects, smart
        transitions, and a sleek dark theme.
      </motion.p>

      {/* Button with Scale and Hover Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="z-10"
      >
        <Button
          onClick={handleGetStarted} // Attach click handler
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Get Started
        </Button>
      </motion.div>

      {/* User Button with Fade In */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <UserButton />
      </motion.div>

      {/* Rotating 3D Text Elements */}
      <motion.div
        className="absolute bottom-12 left-10 z-0 text-4xl font-bold opacity-20 text-purple-500"
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2, rotateY: [0, 360] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      >
        AI-Powered
      </motion.div>

      <motion.div
        className="absolute top-16 right-10 z-0 text-4xl font-bold opacity-20 text-blue-500"
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2, rotateY: [360, 0] }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2,
        }}
      >
        Seamless
      </motion.div>

      {/* 3D Floating Circles */}
      <motion.div
        className="absolute w-40 h-40 bg-purple-700 rounded-full opacity-10 blur-xl"
        style={{ top: "30%", left: "15%" }}
        animate={{ scale: [0.8, 1.2], rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-32 h-32 bg-blue-700 rounded-full opacity-10 blur-lg"
        style={{ bottom: "25%", right: "20%" }}
        animate={{ scale: [1, 1.4], rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
