"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const router = useRouter();

  const floatingCircle1 = useRef(null);
  const floatingCircle2 = useRef(null);
  const rotatingText1 = useRef(null);
  const rotatingText2 = useRef(null);

  useEffect(() => {
    gsap.to(floatingCircle1.current, {
      y: "20%",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(floatingCircle2.current, {
      y: "-15%",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.fromTo(
      rotatingText1.current,
      { rotation: 0, opacity: 0.1 },
      {
        rotation: 360,
        opacity: 0.2,
        duration: 10,
        repeat: -1,
        ease: "linear",
      }
    );

    gsap.fromTo(
      rotatingText2.current,
      { rotation: 360, opacity: 0.1 },
      {
        rotation: 0,
        opacity: 0.2,
        duration: 10,
        repeat: -1,
        ease: "linear",
      }
    );
  }, []);

  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen space-y-10 bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden">
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

      <motion.h1
        initial={{ opacity: 0, y: -40, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-6xl font-extrabold z-10 drop-shadow-lg"
      >
        Welcome to AI Video Generator
      </motion.h1>

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

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="z-10"
      >
        <Button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform duration-300"
        >
          Get Started
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <UserButton />
      </motion.div>

      <motion.div
        ref={rotatingText1}
        className="absolute bottom-12 left-10 z-0 text-4xl font-bold opacity-20 text-purple-500"
      >
        AI-Powered
      </motion.div>

      <motion.div
        ref={rotatingText2}
        className="absolute top-16 right-10 z-0 text-4xl font-bold opacity-20 text-blue-500"
      >
        Seamless
      </motion.div>

      <div
        ref={floatingCircle1}
        className="absolute w-40 h-40 bg-purple-700 rounded-full opacity-10 blur-xl"
        style={{ top: "30%", left: "15%" }}
      ></div>

      <div
        ref={floatingCircle2}
        className="absolute w-32 h-32 bg-blue-700 rounded-full opacity-10 blur-lg"
        style={{ bottom: "25%", right: "20%" }}
      ></div>
    </div>
  );
}
