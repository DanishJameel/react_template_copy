import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callStatus, setCallStatus] = useState('idle');

  useEffect(() => {
    // Define assistant configuration
    const assistant = {
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        systemPrompt: "You're a versatile AI assistant named Vapi who is fun to talk with.",
      },
      voice: {
        provider: "11labs",
        voiceId: "paula",
      },
      firstMessage: "Hi, I am Vapi how can I assist you today?",
    };

    // Button configuration
    const buttonConfig = {
      position: "bottom-right",
      offset: "40px",
      width: "50px",
      height: "50px",
      idle: {
        color: "rgb(93, 254, 202)",
        type: "pill",
        title: "Have a quick question?",
        subtitle: "Talk with our AI assistant",
        icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg",
      },
      loading: {
        color: "rgb(93, 124, 202)",
        type: "pill",
        title: "Connecting...",
        subtitle: "Please wait",
        icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg",
      },
      active: {
        color: "rgb(255, 0, 0)",
        type: "pill",
        title: "Call is in progress...",
        subtitle: "End the call.",
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
        setCallStatus('active');
        console.log('Call has started');
      });

      window.vapiInstance.on('call-end', () => {
        setCallStatus('idle');
        console.log('Call has stopped');
      });

      window.vapiInstance.on('volume-level', (volume) => {
        setVolumeLevel(volume);
        console.log(`Assistant volume level: ${volume}`);
      });

      window.vapiInstance.on('message', (message) => {
        setMessages(prev => [...prev, message]);
        console.log(message);
      });

      window.vapiInstance.on('error', (e) => {
        console.error(e);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Vapi AI Voice Assistant
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Status: <span className="text-green-500">{callStatus}</span>
            </h2>
            <p className="text-gray-600">
              Volume Level: {volumeLevel}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Conversation History</h3>
            <div className="border rounded-lg p-4 h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="mb-3 p-2 bg-gray-50 rounded">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {JSON.stringify(message, null, 2)}
                  </pre>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-gray-500 text-center">
                  No messages yet. Click the chat button to start a conversation!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;