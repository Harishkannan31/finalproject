import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './coursePage.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CourseListEnroll() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [wishlistClickedMap, setWishlistClickedMap] = useState({});
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setError('Please log in to view courses.');
          return;
        }

        const coursesResponse = await axios.get('http://localhost:8000/api/v1/get-all-courses', {
          headers: {
            'access_token': accessToken
          }
        });
        console.log("response from course page", coursesResponse.data.courses)
        setCourses(coursesResponse.data.courses);
        // Extract and set the wishlist count from the response
       setWishlistCount(coursesResponse.data.wishlistCount);
      } catch (error) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setError('Please log in to enroll.');
        return;
      }
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'access_token': accessToken
        }
      };
  
      const data = { courseId };
      await axios.post('http://localhost:8000/api/v1/create-order', data, config);
  
      // Update the capacity in the UI by decrementing it by 1
      const updatedCourses = courses.map(course => {
        if (course._id === courseId && course.Capacity > 0) {
          return {
            ...course,
            Capacity: course.Capacity - 1
          };
        }
        return course;
      });
      setCourses(updatedCourses);


  
      console.log('Enrolled successfully');
  
      // Handle success, e.g., show a success message
    } catch (error) {
      setError('Failed to enroll. Please try again later.');
      console.error('Error enrolling:', error.message);
    }
  };
  
  const handleWishlistClick = async (courseId) => {
    try {
      // Call the API to add to wishlist only if the button hasn't been clicked before for this course
      if (!wishlistClickedMap[courseId]) {
        // Update the state to indicate that the button has been clicked for this course
        setWishlistClickedMap(prevState => ({
          ...prevState,
          [courseId]: true,
        }));
        setWishlistCount(prevCount => prevCount + 1);
        
        // Call the API to add to wishlist
        // Example: await axios.post('http://localhost:8000/api/v1/add-to-wishlist', { courseId });
        console.log('Added to wishlist successfully');
      }
    } catch (error) {
      setError('Failed to add to wishlist. Please try again later.');
      console.error('Error adding to wishlist:', error.message);
    }
  };

  return (
    <div className='card-element'>
      <h1>Course Page</h1>
      <br></br>
      <div className='card-container'>
        {courses.map(course => (
          <div key={course._id} className='card-wrapper'>
            <Card className='card-body' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  <p>Description: {course.description}</p>
                  <p>Price: {course.price}</p>
                  <p>Level: {course.level}</p>
                  <p>Prerequisites: {course.prerequisites.join(', ')}</p>
                  <p>Demo URL: <a href={course.demoUrl} target="_blank" rel="noopener noreferrer">{course.demoUrl}</a></p>
                  <p>Capacity: {course.Capacity}</p>
                  <p>WishListed: {course.WishListed}</p>
                  <p>Event Date: {course.Event_Date}</p>
                  <p>Event Time: {course.Event_Time}</p>
                  <p>Event Location: {course.Event_Location}</p>
                </Card.Text>
                <Button className='coursebutton' variant="primary" onClick={() => handleEnroll(course._id)} disabled={course.Capacity === 0}>Enroll</Button>
                <Button variant="primary" onClick={() => handleWishlistClick(course._id)} disabled={wishlistClickedMap[course._id]}>Add to Wishlist</Button>

              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default CourseListEnroll;
