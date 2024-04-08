// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import NavScrollExample from './components/Navbar';
// import SignupForm from './components/Signup';
// import LoginForm from './components/Login';
// import OTPVerification from './components/OtpVerify';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<NavScrollExample />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route path="/login" element={<LoginForm/>} />
//         <Route path="/verify" element={<OTPVerification/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// // ReactDOM.render(<App />, document.getElementById('root'));
// export default App;

//App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import SignupForm from './components/Signup';
import OTPVerification from './components/OtpVerify';
import LoginForm from './components/Login';
import CourseList from './components/CoursePage';
// import NavScrollExample from './components/HomePage';
import Sidebar from './components/SideBar';
import EventForm from './components/CreateEvent';
import MyEvents from './components/MyEvents';


function App() {
  const [activationToken, setActivationToken] = useState('');

  const handleSignUp = async (formData) => {
    try {
      // Make the signup request
      const response = await axios.post('http://localhost:8000/api/v1/registration', formData);
      // Extract the access token from the response
      console.log("from app js",response.data)
      const { activationToken } = response.data;
      setActivationToken(activationToken);

    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Sidebar/>} />
        <Route path="/signup" element={<SignupForm handleSignUp={handleSignUp} />} />
        <Route path="/verify" element={<OTPVerification activationToken={activationToken} />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/create-event" element={<EventForm/>} />
        <Route path="/order" element={<MyEvents/>} />


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;






