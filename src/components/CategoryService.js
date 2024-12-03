import axios from "axios";

// Set your Rails API base URL here
const API_BASE_URL = "http://localhost:3000";

const CategoryService = {
  // Fetch all categories from the API
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};

export default CategoryService;
