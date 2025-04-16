import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const assistant = {
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        systemPrompt: "You're a lead qualification assistant. Help qualify leads by asking relevant questions, gathering necessary information, and offering courteous responses. Be efficient, friendly, and goal-oriented.",
      },
      voice: {
        provider: "11labs",
        voiceId: "paula",
      },
      firstMessage: "Hi, I'm your assistant for lead qualification. May I know your name and what you're looking for today?",
    };

    const buttonConfig = {
      position: "custom",
      width: "80px",
      height: "80px",
      idle: {
        color: "rgb(93, 254, 202)",
        type: "round",
        icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg",
      },
      loading: {
        color: "rgb(93, 124, 202)",
        type: "round",
        icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg",
      },
      active: {
        color: "rgb(255, 0, 0)",
        type: "round",
        icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg",
      },
    };

    window.vapiInstance = null;
    if (typeof window.vapiSDK !== 'undefined') {
      initializeVapi();
    }

    function initializeVapi() {
      window.vapiInstance = window.vapiSDK.run({
        apiKey: "0e4f71ef-705b-4d27-aae9-89b0a032dede",
        assistant: "9810c21c-fe61-4ed2-9bbd-de1532f18d71",
        config: buttonConfig,
      });

      window.vapiInstance.on('speech-start', () => {
        console.log('Speech has started');
      });

      window.vapiInstance.on('speech-end', () => {
        console.log('Speech has ended');
      });

      window.vapiInstance.on('call-start', () => {
        console.log('Call has started');
      });

      window.vapiInstance.on('call-end', () => {
        console.log('Call has stopped');
      });

      window.vapiInstance.on('error', (e) => {
        console.error(e);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Lead Qualification Assistant
        </h1>
        <p className="text-gray-600 text-lg">
          Click the phone icon to start qualifying leads using voice assistance
        </p>
      </div>
    </div>
  );
}

export default App;
