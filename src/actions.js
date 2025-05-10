import { post } from './lib/fetchClient';

export const login = async ({ username, password }) => {
  try {
    // Use the post helper function which automatically adds the accessToken
    const data = await post('/login', { username, password });
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Example of a protected API call that will automatically include the accessToken
export const fetchUserProfile = async () => {
  try {
    // The accessToken will be automatically added by the fetchClient
    const data = await post('/user/profile');
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Add more API action functions as needed
