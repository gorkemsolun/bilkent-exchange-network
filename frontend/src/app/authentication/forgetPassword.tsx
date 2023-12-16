import React, { useState } from 'react';
import axios from 'axios';
import "./forgetPassword.css"
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the server to handle the forgot password logic
      const response = await axios.post('http://localhost:3000/user/forgetPassword', {
        email: email, 
      } );

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending forgot password request:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgetPassword;