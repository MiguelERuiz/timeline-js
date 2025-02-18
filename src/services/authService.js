import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const login = async (nickname, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { nickname, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${API_BASE_URL}/current_user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.user;
  } catch (error) {
    console.error('Error fetching user', error);
    return null;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.delete(`${API_BASE_URL}/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    localStorage.removeItem("token"); // Remove token from storage
  } catch (error) {
    console.error("Logout failed", error);
  }
};
