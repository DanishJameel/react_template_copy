import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Define assistant configuration
    const assistant = {
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        systemPrompt: "You're a medical appointment booking assistant. Help patients schedule appointments, collect basic information, and answer questions about services and availability. Be professional, courteous and efficient.",
      },
      voice: {
        provider: "11labs",
        voiceId: "paula",
      },
      firstMessage: "Hi, I'm your medical appointment assistant. How may I help you schedule your appointment today?",
    };

    // Button configuration - showing only phone icon
    const buttonConfig = {
      position: "bottom-right",
      offset: "40px",
      width: "60px",
      height: "60px",
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

    // Initialize Vapi instance when script loads
    window.vapiInstance = null;
    if (typeof window.vapiSDK !== 'undefined') {
      initializeVapi();
    }

    function initializeVapi() {
      window.vapiInstance = window.vapiSDK.run({
        apiKey: "67574b3b-5a7a-427a-ad76-d221b27d79c2",
        assistant: "9f33adc7-01df-4f73-9390-6e3a327c04d9",
        config: buttonConfig,
      });

      // Set up event listeners
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Medical Appointment Booking
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          Click the phone icon to schedule your appointment using voice assistance
        </p>
      </div>
    </div>
  );
}

export default App;