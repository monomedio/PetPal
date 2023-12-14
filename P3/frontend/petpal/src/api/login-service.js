const TOKEN_KEY = 'authToken';

export const login = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { access } = await response.json();

    // Store the access token in localStorage
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem('username', username);
  } catch (error) {
    throw new Error('Error during login:', error);
    // Handle login failure if needed
  }
};
