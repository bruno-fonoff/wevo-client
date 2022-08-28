import axios from "axios";

const apiURL = {
  development: "http://localhost:4000",
  production: "Deploy URL",
};

const api = axios.create({
  baseURL: apiURL[process.env.NODE_ENV],
});

export { api };
