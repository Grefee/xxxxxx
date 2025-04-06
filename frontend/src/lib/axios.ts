import axios from "axios";

const backend_url = import.meta.env.VITE_BACK_URL || "localhost";
const backend_port = import.meta.env.VITE_BACK_PORT || "5260";

const api = axios.create({
  baseURL: `http://${backend_url}:${backend_port}`,
});

export default api;
