import React, { useEffect, useState } from 'react';
import { MessageSquare, X, Send, Paperclip, Sparkles, ChevronRight, User, Bot } from 'lucide-react';

interface ChatbotAgentProps {
  title?: string;
}

const ChatbotAgent: React.FC<ChatbotAgentProps> = ({ 
  title = "College Assistant" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const [customOpen, setCustomOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    // Load Botpress scripts
    const injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    const botpressScript = document.createElement('script');
    botpressScript.src = "https://files.bpcontent.cloud/2025/02/26/07/20250226074806-U2W79DRY.js";
    botpressScript.async = true;
    botpressScript.onload = () => setIsLoaded(true);
    document.body.appendChild(botpressScript);

    // Add custom styles to hide the default Botpress UI when we're using our custom UI
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .bp-widget-widget {
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out !important;
      }
      .bp-widget-hidden {
        opacity: 0 !important;
        transform: scale(0.95) !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.body.removeChild(injectScript);
      document.body.removeChild(botpressScript);
      document.head.removeChild(styleElement);
    };
  }, []);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    
    // If Botpress is loaded, we can programmatically control it
    if (isLoaded && window.botpressWebChat) {
      if (!isOpen) {
        window.botpressWebChat.sendEvent({ type: 'show' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      }
    }

    setCustomOpen(!customOpen);
  };

  const handleSendMessage = () => {
    if (message.trim() && isLoaded && window.botpressWebChat) {
      // Send message to Botpress
      window.botpressWebChat.sendEvent({ 
        type: 'message',
        text: message 
      });
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick questions that users might want to ask
  const quickQuestions = [
    "What programs do you offer?",
    "How do I apply for admission?",
    "When are the application deadlines?",
    "What scholarships are available?",
    "How can I schedule a campus tour?"
  ];

  const sendQuickQuestion = (question: string) => {
    setMessage(question);
    setTimeout(() => {
      if (isLoaded && window.botpressWebChat) {
        window.botpressWebChat.sendEvent({ 
          type: 'message',
          text: question 
        });
        setMessage('');
        setShowSuggestions(false);
      }
    }, 100);
  };

  // Sample conversation for demonstration
  const sampleConversation = [
    { 
      type: 'bot', 
      message: "Hello! I'm your University College assistant. How can I help you today?",
      timestamp: '10:30 AM'
    }
  ];

  return (
    <>
      {/* Custom Chat Interface */}
      {customOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-100 transition-all duration-300 ease-in-out">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-3">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                  <p className="text-xs text-blue-100">Online now</p>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChatbot}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages Area */}
          <div className="flex-1 p-4 bg-gradient-to-b from-blue-50 to-white overflow-y-auto">
            <div className="text-center mb-6">
              <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-500 shadow-sm">
                Today, {new Date().toLocaleDateString()}
              </div>
            </div>
            
            {/* Welcome message */}
            {sampleConversation.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.type === 'bot' ? '' : 'justify-end'}`}>
                {msg.type === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div className={`rounded-2xl p-3 max-w-[75%] shadow-sm ${
                  msg.type === 'bot' 
                    ? 'bg-white text-gray-800 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  <p className={msg.type === 'bot' ? 'text-gray-800' : 'text-white'}>
                    {msg.message}
                  </p>
                  <div className={`text-xs mt-1 ${
                    msg.type === 'bot' ? 'text-gray-400' : 'text-blue-100'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>
                {msg.type !== 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                    <User size={16} className="text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick questions section */}
            {showSuggestions && (
              <div className="mt-6 mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">I can help you with:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button 
                      key={index}
                      onClick={() => sendQuickQuestion(question)}
                      className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-left text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors flex justify-between items-center group"
                    >
                      <span>{question}</span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-300 focus-within:bg-white transition-all duration-200">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
              />
              <button 
                className="text-gray-400 hover:text-gray-600 mx-1 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Attach file"
              >
                <Paperclip size={18} />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`rounded-full p-2 ml-1 transition-colors flex items-center justify-center ${
                  message.trim() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-gray-400">
                Powered by <span className="font-medium">University College AI</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
            isOpen 
              ? 'bg-gray-700 rotate-0' 
              : 'bg-gradient-to-r from-blue-500 to-blue-700 rotate-6 hover:rotate-0'
          }`}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <div className="relative">
              <MessageSquare size={24} className="text-white" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
            </div>
          )}
        </button>
        {!isOpen && (
          <div className="absolute bottom-20 right-0 bg-white px-4 py-2 rounded-xl shadow-md text-sm font-medium text-gray-700 whitespace-nowrap animate-bounce">
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45"></div>
            Need assistance? Chat with me!
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotAgent;

// Add this to window object for TypeScript
declare global {
  interface Window {
    botpressWebChat: {
      sendEvent: (event: { type: string; text?: string }) => void;
    };
  }
}