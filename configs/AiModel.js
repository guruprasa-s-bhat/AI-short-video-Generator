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
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write  a script  to generate 30 second video on topic : intresting historical story along with AI Image prompt in Realistic format for each scene and give me result in JSON Format with imagePromt and ContentText as field\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling medieval marketplace, vibrant with colors and activity. People are haggling over goods, children are playing, and there is a general sense of excitement.",\n    "contentText": "In the heart of medieval Europe, a city hummed with life. The marketplace was a symphony of smells, sights, and sounds."\n  },\n  {\n    "imagePrompt": "A close-up of a young woman\'s face, her eyes wide with fear and determination. She is wearing a simple dress and has a small dagger hidden in her sleeve.",\n    "contentText": "Among the crowds, a young woman named Elara felt a shiver of fear. She was on a mission, a secret one that could change the course of history."\n  },\n  {\n    "imagePrompt": "A grand castle, towering over the city, bathed in the warm glow of the setting sun. The castle walls are fortified and guarded by armed soldiers.",\n    "contentText": "Her target was the castle, the seat of power, where a tyrannical king held sway."\n  },\n  {\n    "imagePrompt": "A shadowy figure, cloaked in darkness, moving stealthily through the castle corridors. The figure carries a lantern that casts flickering shadows on the walls.",\n    "contentText": "Under the cloak of darkness, Elara infiltrated the castle, her heart pounding with a mixture of fear and determination."\n  },\n  {\n    "imagePrompt": "Elara standing before the king\'s throne, her hand trembling as she pulls out the dagger. The king sits on his throne, a look of surprise and fear on his face.",\n    "contentText": "She found the king, his throne a symbol of his power and cruelty. This was her moment."\n  },\n  {\n    "imagePrompt": "The king\'s guards rushing into the throne room, their swords drawn. They are met by Elara, who stands defiantly with her dagger raised.",\n    "contentText": "But her moment was short-lived. The king\'s guards, alerted by the commotion, stormed into the room."\n  },\n  {\n    "imagePrompt": "A dramatic scene of a struggle, with Elara fighting bravely against the guards. She is outnumbered but fights with fierce determination.",\n    "contentText": "Elara, outnumbered and outmatched, fought with the desperation of a cornered animal."\n  },\n  {\n    "imagePrompt": "A close-up of the king\'s face, contorted in rage and fear. He watches as Elara escapes with the king\'s crown in her hand.",\n    "contentText": "In a daring move, she snatched the king\'s crown, a symbol of his tyranny, and slipped away into the night."\n  },\n  {\n    "imagePrompt": "The city streets, filled with people celebrating. The people rejoice as Elara, holding the crown aloft, rides into the city square.",\n    "contentText": "The people, weary of the king\'s rule, erupted in cheers when Elara emerged from the castle, the crown held high."\n  },\n  {\n    "imagePrompt": "Elara standing triumphantly on a balcony overlooking the city. She holds the king\'s crown in her hand, a symbol of her victory.",\n    "contentText": "The king\'s reign of terror had ended. Elara, the seemingly ordinary woman, had become a symbol of hope for her people."\n  }\n]\n```\n\n**Explanation of the JSON structure:**\n\n* **imagePrompt:** This field contains the AI image prompt that describes the scene you want the AI to generate. \n* **contentText:** This field contains the corresponding text that will be narrated over the visual scene.\n\n**How to Use this JSON:**\n\n1. **Choose an AI image generation tool:** There are many AI tools available, like Midjourney, DALL-E 2, Stable Diffusion, etc. Choose the one that best suits your needs.\n2. **Generate Images:** Use the provided image prompts in the JSON to generate images using your chosen tool.\n3. **Combine Images and Text:** Combine the generated images with the corresponding content text to create your 30-second video. You can use video editing software like Adobe Premiere Pro, Final Cut Pro, or even free online tools to create the video.\n\n**Tips for Video Creation:**\n\n* **Music:** Add appropriate music to enhance the story and create the right mood.\n* **Transitions:** Use transitions to smoothly move between scenes.\n* **Sound effects:** Add sound effects (like footsteps, sword clashing, etc.) for a more immersive experience.\n\nRemember, the final video will depend on the quality of the AI-generated images and your video editing skills. Good luck creating your historical video! \n',
        },
      ],
    },
  ],
});
``;
