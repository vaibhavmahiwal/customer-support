import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "x-api-key": "dev-secret",
    "Content-Type": "application/json",
  },
});

export default client;