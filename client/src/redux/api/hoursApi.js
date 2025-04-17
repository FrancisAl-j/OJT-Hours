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

  get: async () => {
    try {
      const res = await axios.get(`${baseURL}get`, { withCredentials: true });

      return res.data;
    } catch (error) {
      throw error;
    }
  },

  update: async ({ id, time, minutes, seconds }) => {
    try {
      const res = await axios.put(
        `${baseURL}update/${id}`,
        { time, minutes, seconds },
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
