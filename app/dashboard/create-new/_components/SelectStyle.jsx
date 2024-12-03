import Image from "next/image";
import React, { useState } from "react";

const SelectStyle = ({ onUserSelect }) => {
  const styleOptions = [
    { name: "Realistic", image: "/real.jpeg" },
    { name: "Cartoon", image: "/cartoon.jpeg" },
    { name: "Comic", image: "/comic.jpeg" },
    { name: "WaterColor", image: "/waterColor.jpeg" },
    { name: "GTA", image: "/gta.jpeg" },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7">
      <h2 className="font-bold text-2xl text-primary">Style</h2>
      <p className="text-gray-500">Select your video style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3">
        {styleOptions.map((item, i) => (
          <div
            key={i}
            className={`relative hover:scale-105 transition-all rounded-xl duration-5 cursor-pointer overflow-hidden aspect-square ${
              selectedOption === item.name && "border-4 border-primary"
            }`}
            onClick={() => {
              setSelectedOption(item.name);
              onUserSelect("imageStyle", item.name);
            }}
          >
            <Image
              src={item.image}
              alt={`${item.name} style`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectStyle;
