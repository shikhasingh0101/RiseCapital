import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I’m your financial advisor AI. Ask me anything about finance, investing, or budgeting.' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: input
            });

            const botMessage = {
                sender: 'bot',
                text: response.data.response
            };
            setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const fallbackMessage = {
                sender: 'bot',
                text: 'An error occurred while communicating with the server. Please try again.'
            };
            setMessages((prevMessages) => [...prevMessages, userMessage, fallbackMessage]);
        } finally {
            setInput('');
        }
    };

    const handleNewChat = () => {
        setMessages([{ sender: 'bot', text: 'Hello! I’m your financial advisor AI. Ask me anything about finance, investing, or budgeting.' }]);
        setInput('');
    };

    const handleDeleteChat = () => {
        setMessages([]); // Clear all messages
        setInput(''); // Reset input field
    };

    return (
        <div className="chatbot-container">
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
                <button onClick={handleNewChat}>New Chat</button>
                <button onClick={handleDeleteChat}>Delete Chat</button>
            </div>
        </div>
    );
}

export default ChatBot;
