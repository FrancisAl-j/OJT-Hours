import axios from "axios";

const baseURL = "http://localhost:3000/api/hours/";

export const hours = {
  create: async ({ time, hoursTarget }) => {
    try {
      const res = await axios.post(
        `${baseURL}create`,
        { time, hoursTarget },
        { withCredentials: true }
      );

      return res;
    } catch (error) {
      throw error;
    }
  },
};
