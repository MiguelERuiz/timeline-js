import axios from "axios";

// Set your Rails API base URL here
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Function to get the stored token
const getAuthToken = () => localStorage.getItem("token");

const EventService = {
  // Fetch all events from the API
  getEvents: async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/events`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  getFilteredEvents: async (categoryId) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/events?category_id=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered events:", error);
      throw error;
    }
  }
};

export default EventService;
