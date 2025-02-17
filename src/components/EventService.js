import axios from "axios";

// Set your Rails API base URL here
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const EventService = {
  // Fetch all events from the API
  getEvents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },

  getFilteredEvents: async (categoryId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events?category_id=${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered events:", error);
      throw error;
    }
  }
};

export default EventService;
