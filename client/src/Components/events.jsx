import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../all-css/events.css";
const Events = () => {
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios
            .get('http://localhost:3000/auth/events')
            .then((response) => {
                setEvents(response.data.Result);
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    };

    const addEvent = () => {
        axios
            .post('http://localhost:3000/auth/add_event', {
                name: eventName,
                date: eventDate,
                description: eventDescription,
            })
            .then((response) => {
                if (response.data.Status) {
                    // If successful, fetch the updated list of events
                    fetchEvents();
                    // Reset form fields
                    setEventName('');
                    setEventDate('');
                    setEventDescription('');
                } else {
                    alert('Failed to add event');
                }
            })
            .catch((error) => {
                console.error('Error adding event:', error);
                alert('Failed to add event');
            });
    };

    const deleteEvent = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            axios
                .delete(`http://localhost:3000/auth/delete_event/${eventId}`)
                .then((response) => {
                    if (response.data.Status) {
                        // If successful, fetch the updated list of events
                        fetchEvents();
                    } else {
                        alert('Failed to delete event');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting event:', error);
                    alert('Failed to delete event');
                });
        };
    }
    function getShortDescription(description) {
        const words = description.split(' ');
        if (words.length > 2) {
            return `${words[0]} ${words[1]}...`;
        } else {
            return description;
        }
    }
    return (
        <div >


            {showModal && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: '1000', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3 className='font-bold flex justify-center mb-2'>Add Event</h3>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <textarea
                        placeholder="Event Description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    ></textarea>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={addEvent} className="btn">Add Event</button>
                        <button onClick={() => setShowModal(false)} className="btn">Close</button>
                    </div>
                </div>
            )}

            {showModal && (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: '999' }} onClick={() => setShowModal(false)}></div>
            )}
            <h3 className='text-2xl font-semibold flex justify-center mt-6'>Events List</h3>
            <button onClick={() => setShowModal(true)} className="btn ml-80 ">
                Add New Event
            </button>
            <table className="styled-table ml-80">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Admin ID</th>
                        <th>Admin </th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{new Date(event.date).toLocaleDateString('en-GB')}</td>
                            <td>{getShortDescription(event.description)}</td>
                            <td>{event.admin_id}</td>
                            <td>{event.admin_name}</td>
                            <td>
                                <button onClick={() => deleteEvent(event.id)} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Events;
