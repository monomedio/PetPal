import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../api/login-service.js';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

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
      const user = await login(formData['username'], formData['password']);
      console.log('Logged in:', user);

      setError(null);
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  if (loginSuccess) {
    return <Navigate to="/pets" />; 
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid container">
      <div className="row justify-content-center align-items-center">

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
            placeholder="Username"
            value={formData.username}
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
            className="form-control login-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        </div>
        </div>

        {error && (
          <div className="row justify-content-center align-items-center">
            <p className="text-danger">{error}</p>
          </div>
        )}

      <button
        type="submit"
        className="button-fill my-3 d-flex py-1 justify-content-center align-items-center">
        Login
      </button>

    </form>
  );
};

export default LoginForm;

// import React, { useState } from 'react';
// import { login } from '../../api/login-service.js'; 

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
  
//     if (files) {
//       const newFormData = new FormData();
//       newFormData.append(name, files[0]);
//       setFormData(newFormData);
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const user = await login(formData['username'], formData['password']);
//         console.log('Logged in:', user);
//       } catch (error) {
//         console.error('Login error:', error.message);
//       }


//     console.log('Form Data:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-grid container">
//       <div className="row justify-content-center align-items-center">

//       <div className="row justify-content-center align-items-center">
//         <div className="justify-content-center align-items-center">
//           <label htmlFor="username" className="sign-up-name-text">
//             Username:*
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             className="form-control sign-up-name"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//       </div>


//       <div className="row justify-content-center align-items-center">
//         <div className="justify-content-center align-items-center">
//           <label
//             id="confirm-signup-password-label"
//             htmlFor="signup-password"
//             className="login-password-text"
//           >
//             Password:*
//           </label>
//           <input
//             type="password"
//             id="signup-password"
//             name="password"
//             className="form-control login-password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="button-fill my-3 d-flex py-1 justify-content-center align-items-center"
//       >
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;