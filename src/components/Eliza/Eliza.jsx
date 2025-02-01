import React, { useState, useEffect } from 'react';

const Eliza = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      { 
        text: "Hello! I'm Eliza, your virtual assistant. How can I help you today?", 
        sender: 'eliza' 
      }
    ]);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    
    // Simulate Eliza response
    const elizaResponse = getElizaResponse(inputMessage);
    newMessages.push({ text: elizaResponse, sender: 'eliza' });
    
    setMessages(newMessages);
    setInputMessage('');
  };

  const getElizaResponse = (input) => {
    // Simple response patterns - you can expand these
    const responses = [
      { pattern: /how are you/i, response: "I'm doing well, how are you feeling?" },
      { pattern: /hello|hi|hey/i, response: "Hello! How can I help you today?" },
      { pattern: /bye|goodbye/i, response: "Goodbye! Take care!" },
      { pattern: /help/i, response: "I'm here to help. What's on your mind?" },
      // Add more patterns here
    ];

    for (const { pattern, response } of responses) {
      if (pattern.test(input)) {
        return response;
      }
    }

    return "Can you tell me more about that?";
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100 p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col 
                    border border-gray-700 rounded-xl overflow-hidden
                    bg-gray-900/50 backdrop-blur-sm shadow-xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-xl font-semibold text-gray-100">Chat with Eliza</h2>
        </div>

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
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20'
                      : 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/30'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
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
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 
                       focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white 
                       rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg 
                       shadow-violet-500/20 hover:shadow-violet-500/40 font-medium"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eliza;