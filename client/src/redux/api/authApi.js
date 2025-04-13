import axios from "axios";
const baseURL = "http://localhost:3000/api/auth/";

export const auth = {
  //! Checking authentication to keep users login
  checkAuth: async () => {
    try {
      const res = await axios.get(`${baseURL}check`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error;
    }
  },

  //! Log in
  login: async (formData) => {
    try {
      const res = await axios.post(`${baseURL}signin`, formData, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error;
    }
  },

  //! Sign up
  signup: async (formData) => {
    try {
      const res = await axios.post(`${baseURL}signup`, formData);

      return res;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(
        `${baseURL}logout`,
        {},
        { withCredentials: true }
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
};
