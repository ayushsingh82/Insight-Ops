import React, { useState, useEffect } from 'react';

const Eliza = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedBox, setSelectedBox] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rateLimitTimer, setRateLimitTimer] = useState(0);

  // Initialize with welcome message based on selected box
  useEffect(() => {
    if (selectedBox === 'eigen') {
      setMessages([
        { 
          text: "Hello! I'm Eliza, your EigenLayer assistant. I can help you understand EigenLayer's architecture, staking mechanisms, AVS integration, and more. What would you like to know?", 
          sender: 'eliza' 
        }
      ]);
    } else if (selectedBox === 'movement') {
      setMessages([
        { 
          text: "Hello! I'm Eliza, your Movement Labs assistant. I can help you understand Movement's blockchain solutions, scalability features, and ecosystem development. How can I assist you today?", 
          sender: 'eliza' 
        }
      ]);
    }
  }, [selectedBox]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || rateLimitTimer > 0) return;

    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);

    const API_KEY = 'AIzaSyD5Rwsl5X6nBz2MtY14ME0Q-cFWyMdt6hA';

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${selectedBox === 'eigen' 
                ? "You are Eliza, an AI assistant specialized in EigenLayer. Provide helpful, accurate information about EigenLayer's technology, features, and ecosystem. Focus on restaking, AVS, and the overall architecture. " 
                : "You are Eliza, an AI assistant specialized in Movement Labs. Provide helpful, accurate information about Movement Labs' technology, features, and ecosystem. "}
                User question: ${inputMessage}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        })
      });

      if (response.status === 429) {
        // Rate limit hit - implement cooldown
        setRateLimitTimer(15);
        const countdown = setInterval(() => {
          setRateLimitTimer(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        throw new Error('Rate limit reached. Please wait a moment before trying again.');
      }

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const elizaResponse = data.candidates[0].content.parts[0].text;

      setMessages([...newMessages, { text: elizaResponse, sender: 'eliza' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { 
          text: error.message === 'Rate limit reached. Please wait a moment before trying again.'
            ? `Please wait ${rateLimitTimer} seconds before sending another message.`
            : "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'eliza' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 p-4 md:p-8">
      {/* Info Boxes */}
      <div className="w-full max-w-4xl mx-auto mb-6 flex gap-4">
        <div 
          onClick={() => setSelectedBox('movement')}
          className={`flex-1 p-4 border border-gray-700 rounded-xl backdrop-blur-sm shadow-xl 
                     cursor-pointer transition-all duration-300 hover:scale-[1.02]
                     ${selectedBox === 'movement' 
                       ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                       : 'bg-gray-900/50'}`}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Movement Labs</h3>
          <div className={`p-3 rounded-lg ${
            selectedBox === 'movement'
              ? 'bg-white/10'
              : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20'
          }`}>
            <p className="text-sm text-gray-300">
              Chat about Movement Labs ecosystem
            </p>
          </div>
        </div>
        
        <div 
          onClick={() => setSelectedBox('eigen')}
          className={`flex-1 p-4 border border-gray-700 rounded-xl backdrop-blur-sm shadow-xl 
                     cursor-pointer transition-all duration-300 hover:scale-[1.02]
                     ${selectedBox === 'eigen' 
                       ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                       : 'bg-gray-900/50'}`}
        >
          <h3 className="text-lg font-semibold text-gray-100 mb-2">Eigen Layer</h3>
          <div className={`p-3 rounded-lg ${
            selectedBox === 'eigen'
              ? 'bg-white/10'
              : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20'
          }`}>
            <p className="text-sm text-gray-300">
              Chat about EigenLayer technology
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="w-full max-w-4xl mx-auto h-[70vh] flex flex-col 
                    border border-gray-700 rounded-xl overflow-hidden
                    bg-gray-900/50 backdrop-blur-sm shadow-xl">
        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-sm p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/30'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 p-4 rounded-lg shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-800/50 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || !selectedBox || rateLimitTimer > 0}
              className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white 
                       rounded-lg font-medium transition-all duration-200
                       ${(loading || !selectedBox || rateLimitTimer > 0) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {rateLimitTimer > 0 ? `Wait ${rateLimitTimer}s` : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eliza;