/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Write a script to generate 30 seconds video on topic Interesting historical story along with Al image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and Content Text as field, No Plain text\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n[\n  {\n    "imagePrompt": "A bustling medieval marketplace, with people in colorful clothing, vendors selling their wares, and a lively atmosphere. Focus on the details of the stalls and the expressions on the faces of the people.",\n    "ContentText": "Imagine a bustling medieval marketplace, where the air buzzes with the sounds of haggling and laughter. Merchants hawk their wares, their voices blending with the clanging of blacksmiths and the creaking of wagons."\n  },\n  {\n    "imagePrompt": "A portrait of a young woman, dressed in fine silks, holding a book. She looks determined and curious. In the background, a grand library with towering shelves filled with books.",\n    "ContentText": "Among the crowds was a young woman named Eleanor, known for her insatiable thirst for knowledge. She spent her days in the grand library, her eyes scanning the pages of ancient texts."\n  },\n  {\n    "imagePrompt": "A shadowy, candlelit room with a map spread out on a table. Three figures huddle over it, their faces illuminated by the flickering candlelight. One figure points to a specific location on the map.",\n    "ContentText": "One day, a group of scholars approached Eleanor with a daring proposition. They sought to decipher a cryptic message hidden within an ancient manuscript, a message that promised to reveal the location of a long-lost treasure."\n  },\n  {\n    "imagePrompt": "A dramatic scene of a storm raging at sea. A ship struggles against the waves, with lightning flashing in the sky and rain pouring down.",\n    "ContentText": "Eleanor, captivated by the adventure, joined their quest. Their journey took them across treacherous seas, battling storms and dodging pirates."\n  },\n  {\n    "imagePrompt": "A lush jungle setting with ancient ruins overgrown with vines. The sun shines through the leaves, casting dappled shadows on the stone structures.",\n    "ContentText": "Finally, they reached a remote island, hidden deep within a jungle. There, amidst the ruins of an ancient civilization, they discovered the treasure - not gold or jewels, but a lost scroll containing a revolutionary scientific discovery."\n  }\n]\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
