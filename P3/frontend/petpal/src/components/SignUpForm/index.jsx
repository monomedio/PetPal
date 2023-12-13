import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files) {
      const newFormData = new FormData();
      newFormData.append(name, files[0]);
      setFormData(newFormData);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data  = new FormData();
        
        for(const name in formData) {
            console.log('item:', name);
            data.append(name, formData[name]);
        }

        console.log('Form Data:', data);

        const response = await fetch('http://localhost:8000/accounts/seeker/', {
          method: 'POST',
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
          body: data,
        });
  
        if (response.ok) {
          // Handle successful response
          console.log('Form submitted successfully');
        } else {
          // Handle error response
          console.error('Failed to submit form:', response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error.message);
      }
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid container">
      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label htmlFor="first_name" className="sign-up-name-text">
            First name:*
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="form-control sign-up-name"
            placeholder="John"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label htmlFor="last_name" className="sign-up-name-text">
            Last name:*
          </label>
          <input
            type="text"
            id="last-name"
            name="last_name"
            className="form-control sign-up-name"
            placeholder="Smith"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label htmlFor="username" className="sign-up-name-text">
            Username:*
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control sign-up-name"
            placeholder="johnsmith1"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label htmlFor="email" className="login-email-text">
            Email:*
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control login-username"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label htmlFor="phone" className="login-email-text">
            Phone:*
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control login-username"
            placeholder="12345678"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="justify-content-center align-items-center">
          <label
            id="confirm-signup-password-label"
            htmlFor="signup-password"
            className="login-password-text"
          >
            Password:*
          </label>
          <input
            type="password"
            id="signup-password"
            name="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Must contain at least one number, one special character, one uppercase and lowercase letter, and at least 8 characters"
            className="form-control login-password"
            placeholder="****************"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="justify-content-center align-items-center">
          <label
            id="confirm-signup-password-label"
            htmlFor="confirm-signup-password"
            className="login-password-text"
          >
            Confirm password:*
          </label>
          <input
            type="password"
            id="confirm-signup-password"
            name="password2"
            className="form-control login-password"
            placeholder="****************"
            value={formData.password2}
            onChange={handleChange}
            required
          />
          <span id="passwordMatchMessage"></span>
        </div>

        <div id="message">
          Password must contain the following:
          <p id="letter" className="invalid">
            A <b>lowercase</b> letter
          </p>
          {/* ... (other password requirements) */}
        </div>
      </div>

      <button
        type="submit"
        className="button-fill my-3 d-flex py-1 justify-content-center align-items-center"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;