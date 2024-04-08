// import React, { useState } from 'react';
// import axios from 'axios';
// import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

// function SignupForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     console.log("clicked")
//     e.preventDefault();
//     if (!formData.name || !formData.email || !formData.password) {
//         console.error('Name, email, and password are required');
//         return; // Exit early if any required field is empty
//     }
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/registration', formData);
//       console.log(response.data);
//       // Optionally, you can handle success response here, e.g., show success message to the user
//     } catch (error) {
//       console.error('Registration failed:', error.message);
//       // Optionally, you can handle error response here, e.g., display error message to the user
//     }
//   };

//   return (
//     <MDBContainer fluid className="p-3 my-5 h-custom">
//       <MDBRow>
//         <MDBCol col='10' md='6'>
//           <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
//         </MDBCol>
//         <MDBCol col='4' md='6'>
//           <form >
//             <p className="lead fw-normal mb-0 me-3">Sign up with</p>
//             {/* Add sign-up form inputs here */}
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Name'
//               id='nameInput'
//               type='text'
//               size="lg"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required="true"
//             />
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Email address'
//               id='emailInput'
//               type='email'
//               size="lg"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <MDBInput
//               wrapperClass='mb-4'
//               label='Password'
//               id='passwordInput'
//               type='password'
//               size="lg"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <MDBBtn type="submit" onClick={handleSubmit} className="mb-0 px-5" size='lg'>Sign up</MDBBtn>
//           </form>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default SignupForm;


// SignUpForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      // Make the signup request
      const response = await axios.post('http://localhost:8000/api/v1/registration', formData);
      // Redirect to OTP verification page
      console.log(response)
      console.log(response.data.activationToken)
      navigate('/verify', { state: { activationToken: response.data.activationToken } });
    } catch (error) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <div className='formbody'>
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>
        
        <MDBCol col='4' md='6'>
          <form onSubmit={handleSignUp}>
          <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign Up</p>
              
            </div>
            <MDBInput
              className='mb-4'
              placeholder='Name'
              id='nameInput'
              type='text'
              size="lg"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <MDBInput
              className='mb-4'
              placeholder='Email address'
              id='emailInput'
              type='email'
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <MDBInput
              className='mb-4'
              placeholder='Password'
              id='passwordInput'
              type='password'
              size="lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <MDBBtn type="submit" className="mb-0 px-5 button" size='lg'>Sign up</MDBBtn>
            <div class="text-center text-lg-start mt-4 pt-2">
            <p class="small fw-bold mt-2 pt-1 mb-0">Already an User? <a href="http://localhost:3000/login"
                class="link-danger">LogIn</a></p>
          </div>
          </form>
          
          </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default SignupForm;



