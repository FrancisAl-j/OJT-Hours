import axios from "axios";
const baseURL = "http://localhost:3000/api/auth/";

export const auth = {
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
};
