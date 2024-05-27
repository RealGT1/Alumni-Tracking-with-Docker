import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events_Display = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/auth/events')
            .then(response => {
                if (response.data.Status) {
                    setEvents(response.data.Result);
                } else {
                    console.error('Error:', response.data.Error);
                }
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const isEventApproaching = (eventDate) => {
        const today = new Date();
        const event = new Date(eventDate);
        const diffInDays = Math.ceil((event - today) / (1000 * 60 * 60 * 24));
        return diffInDays <= 3 && diffInDays >= 0;
    };

    const sortedEvents = [...events].sort((a, b) => isEventApproaching(b.date) - isEventApproaching(a.date));

    return (
        <div className="bg-slate-200 min-h-screen">
            <p className='text-5xl flex justify-center p-4 font-semibold'>Events</p>
            <div className="grid grid-cols-3 gap-4 p-4 ">
                {sortedEvents.map((event, index) => (
                    <div key={index} className="border rounded-3xl p-4 shadow-lg bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-red-500 flex flex-col items-stretch">
                        {isEventApproaching(event.date) && <span className="text-red-500 font-bold text-xl">Featured</span>}
                        <h2 className="font-bold text-xl">{event.name}</h2>
                        <p>Date: {new Date(event.date).toLocaleDateString('en-GB')}</p>
                        <p className='text-green-600'>Created By: {event.admin_name}</p>
                        <p>Description: {event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events_Display;