import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="p-6 py-24 flex items-center flex-col mt-10 border-2 border-dashed border-gray-300 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">You haven't created any short videos.</h2>
      <Link href={"/dashboard/create-new"}>
        <Button className="px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-in-out text-white rounded-lg">
          Create New Short Video
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
