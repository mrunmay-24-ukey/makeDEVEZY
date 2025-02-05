import React, { useState, useEffect, useRef } from 'react';
import socket from '../../Context/SocketContext';

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.on('receive-message', (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add own message to messages immediately
      const ownMessage = {
        text: message,
        sender: 'You',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages((prev) => [...prev, ownMessage]);
      socket.emit('send-message', roomId, message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full border-l bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Live Chat</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[70%] p-3 rounded-lg ${
              msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              <p>{msg.text}</p>
              <div className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.sender} • {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;