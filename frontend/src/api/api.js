import axios from "axios";

export const API = axios.create({
  baseURL: "https://genlab-task.onrender.com"
});