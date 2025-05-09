import React, { useState } from "react";
import axios from "axios";
import './App.css';
.....
function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };

        // Add the user message to the state first
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/chat", {
                message: input,
            });

            const botMessage = { sender: "bot", text: response.data.reply };

            // Add the bot message after getting the response
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            const errorMessage = { sender: "bot", text: "Something went wrong. Try again." };

            // Add the error message if something goes wrong
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setInput(""); // Reset the input field
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if it's wrapped in a form
            handleSend(); // Trigger the send action
        }
    };

    return (
        <div className="app">
            <div className="chat-container">
                <div className="line-animation"></div>
                <div className="chat-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress} // Add event listener for "Enter" key
                        className="input-field"
                    />
                    <button className="send-button" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
