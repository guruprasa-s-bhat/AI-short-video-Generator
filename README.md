# AI Video Generator: Transform Text into Videos 🎥🤖

Welcome to the **AI Video Generator** project! This app uses cutting-edge AI technologies to generate high-quality videos from text. It leverages the **Gemini API** for video creation, **Cloud Text-to-Speech API** for adding natural voiceovers, and **Firebase Storage** for secure and scalable video storage. Built on the powerful **Next.js** framework, this app enables users to quickly and easily convert any text into visually compelling videos.

---

## 🚀 Features

- **Text-to-Video Conversion**: Convert plain text into engaging, AI-generated videos using the Gemini API.
- **Realistic Voiceovers**: Add human-like voiceovers with the Cloud Text-to-Speech API.
- **Firebase Storage Integration**: Seamlessly store and manage generated videos in the cloud with Firebase Storage.
- **Next.js Framework**: Build scalable, server-side-rendered web applications with Next.js.

---

## 📸 Preview

### Demo Video

Check out our demo video showcasing the AI-generated content:

[![AI Video Generator Demo](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](https://youtu.be/dQw4w9WgXcQ)

---

## 🛠️ Technologies Used

- **Next.js** - A React framework that allows us to build fast, scalable web apps.
- **Gemini API** - Powers the text-to-video generation, converting text into visual content.
- **Cloud Text-to-Speech API** - Converts the text into natural-sounding speech, adding voiceover to the videos.
- **Firebase Storage** - Provides secure and scalable storage for the videos.
- **Node.js** - The runtime environment for executing server-side JavaScript.

---

## 🔧 Installation

To get started with the AI Video Generator, clone the repository and follow these instructions:

### Prerequisites

- **Node.js** (v16 or later)
- **Google Cloud account** (for Cloud Text-to-Speech API)
- **Firebase account** (for Firebase Storage)

### Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/BhuvanShyam/ai-video-generator.git
    cd ai-video-generator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables for the APIs and Firebase:
    
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Run the Next.js development server:
    ```bash
    npm run dev
    ```

   
---

## 🧑‍💻 How It Works

1. **Input Text**: The user enters a script or text that they want to convert into a video.
2. **Video Generation**: The Gemini API generates the video based on the text input, creating visuals that match the content.
3. **Text-to-Speech**: The Cloud Text-to-Speech API converts the text into a voiceover to make the video more engaging.
4. **Storage**: The generated video is stored in Firebase Storage for easy access and sharing.
5. **Download or Share**: The user can download the generated video or share it directly through a link.

---

## ⚡️ Roadmap

- [x] **Basic Video Generation**: Transform text into video.
- [x] **Text-to-Speech Integration**: Add realistic voiceovers to the videos.
- [x] **Firebase Storage Setup**: Store and serve videos through Firebase.
- [ ] **User Authentication**: Allow users to create accounts and save their generated videos.
- [ ] **Advanced Video Customization**: Let users modify video styles and voiceovers.
- [ ] **AI-based Personalization**: Enable AI to personalize videos based on user preferences.

---

## 🧑‍🤝‍🧑 Contributing

We welcome contributions! Here’s how you can get started:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes and commit them
4. Push your changes and open a pull request

---

## ✨ Credits

- **Gemini API** for video generation
- **Cloud Text-to-Speech API** for creating voiceovers
- **Firebase** for cloud storage
- **Next.js** for building the app

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

For any questions, issues, or feedback, feel free to reach out to us at [support@aivideogenerator.com](mailto:support@aivideogenerator.com) or open an issue in the GitHub repository.

---

Happy video-making! 🎬✨
