import axios from "axios";

// Set your Rails API base URL here
const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Function to get the stored token
const getAuthToken = () => localStorage.getItem("token");

const CategoryService = {
  // Fetch all categories from the API
  getCategories: async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_BASE_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};

export default CategoryService;
