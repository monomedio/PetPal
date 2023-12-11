import { login } from './login.js'; // Update the path accordingly
export const url = 'http://localhost:8000'
// Temporary script for manual login without UI


// Replace with the actual username and password for testing
const username = 'shelter1';
const password = '123';

const performTemporaryLogin = async () => {
  try {
    // Call the login function from login.js
    const success = await login(username, password);

    if (success) {
      // The login was successful, perform additional actions if needed
      console.log('Temporary login successful!');
    } else {
      // Handle failed login, show an error message, etc.
      console.log('Temporary login failed.');
    }
  } catch (error) {
    // Handle any unexpected errors during login
    console.error('Error during temporary login:', error);
  }
};

export async function getPet(id) {
    await performTemporaryLogin();
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);

    return fetch(
        `${url}/pets/${id}/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}

export async function getPetImage(id) {
    await performTemporaryLogin();
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);

    return fetch(
        `${url}/pets/${id}/images/`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
        ).then(res => res.json())
}
