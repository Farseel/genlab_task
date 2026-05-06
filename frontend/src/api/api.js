import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://genlab-task.onrender.com";

export const API = axios.create({
  baseURL: baseURL
});