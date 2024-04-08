import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, sendEmailToAllUsers } from './MailForEventCreation';


const EventForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    level: '',
    demoUrl: '',
    Capacity:'',
    WishListed:'',
    prerequisites: '',
    Event_Time: '',
    Event_Date: '',
    Event_Location: ''
  });

  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [events, setEvents] = useState([]); // State to store events
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('Please log in to create an event.');
          return;
        }

        const meResponse = await axios.get('http://localhost:8000/api/v1/me', {
          headers: {
            'access_token': accessToken
          }
        });
        
        if (meResponse.data.user) {
          const user = meResponse.data.user;
          setIsAdmin(user.role === 'admin');
        } else {
          setError('You are not authenticated. Please log in to create an event.');
        }
      } catch (error) {
        setError('Failed to fetch user data. Please try again later.');
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateEvent = () => {
    // Redirect to courses page
    navigate('/courses');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        setError('Access token not found. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          'access_token': accessToken
        }
      };
  
      await axios.post('http://localhost:8000/api/v1/create-course', formData, config);
  
      console.log('Event created successfully');
  
      // Add the created event to the list of events
      setEvents([...events, formData]);
  
      // Clear the form data
      setFormData({
        name: '',
        description: '',
        price: '',
        level: '',
        demoUrl: '',
        Capacity:'',
        WishListed:'',
        prerequisites: '',
        Event_Time: '',
        Event_Date: '',
        Event_Location: ''
      });
  
      // Call handleCreateEvent after successfully submitting the form
      handleCreateEvent();
      // Send email to all users about the new event
    await sendEmailToAllUsers(); // Assuming this function is accessible here
    } catch (error) {
      console.error('Error creating event:', error.message);
    }
  };
  

  // Render the EventForm only if the user is an admin
  if (!isAdmin) {
    return <p>You are not authorized to create an event.</p>;
  }

  return (
   <div>
    <h2>Create New Event</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Level:</label>
        <input type="text" name="level" value={formData.level} onChange={handleChange} required />
      </div>
      <div>
        <label>Demo URL:</label>
        <input type="url" name="demoUrl" value={formData.demoUrl} onChange={handleChange} required />
      </div>
      <div>
        <label>Capacity</label>
        <input type="number" name="Capacity" value={formData.Capacity} onChange={handleChange} required />
      </div>
      <div>
        <label>WishListed</label>
        <input type="number" name="WishListed" value={formData.WishListed} onChange={handleChange} required />
      </div>
      <div>
        <label>Prerequisites:</label>
        <textarea name="prerequisites" value={formData.prerequisites} onChange={handleChange} required />
      </div>
      <div>
        <label>Event Time:</label>
        <input type="text" name="Event_Time" value={formData.Event_Time} onChange={handleChange} required />
      </div>
      <div>
        <label>Event Date:</label>
        <input type="date" name="Event_Date" value={formData.Event_Date} onChange={handleChange} required />
      </div>
      <div>
        <label>Event Location:</label>
        <input type="text" name="Event_Location" value={formData.Event_Location} onChange={handleChange} required />
      </div>
      <button  type="submit">Create Event</button>
    </form>

    {/* Display the list of events */}
    <div>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.name} - {event.Event_Date}</li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default EventForm;
