import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForum = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employee/get_messages');
                if (response.data.Status) {
                    setMessages(response.data.Result);
                } else {
                    console.error('Error fetching messages');
                }
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        fetchMessages();
        const intervalId = setInterval(fetchMessages, 100); // Fetch messages every 0.1 seconds

        // Clean up function
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/employee/add_message', { content });
            if (response.data.Status) {
                setContent('');
            } else {
                console.error('Error sending message');
            }
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 text-gray-800 p-9 overflow-x-hidden">
            <div className="flex flex-col flex-grow bg-white shadow-xl rounded-lg ">
                <div className="flex flex-col flex-grow  p-4 overflow-auto mb-9">
                    {messages.map((message, index) => {
                        const date = new Date(message.timestamp);
                        const formattedDate = date.toLocaleTimeString() + ` -- ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().substr()} `;

                        return (
                            <div key={index} className="flex w-full mt-2 space-x-3">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-300 mt-4"></div>
                                <div className={index % 2 === 0 ? "" : "ml-auto justify-end"}>
                                    <div className={index % 2 === 0 ? "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg" : "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"}>
                                        <p className="text-base">{message.content}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 leading-none">{formattedDate}--<span className={message.userType === 'admin' ? 'text-red-500 font-semibold bg-yellow-100 rounded-lg p-1' : 'text-blue-700 font-semibold bg-blue-50 rounded-lg p-1'} >{message.name}</span></span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-gray-300 p-3 fixed bottom-0  w-[95%] ">
                    <form onSubmit={handleSubmit} className="flex">
                        <input
                            className="flex items-center h-11 w-full rounded px-3 text-base text-left"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type your message…"
                            required
                        />
                        <button type="submit" className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForum;
