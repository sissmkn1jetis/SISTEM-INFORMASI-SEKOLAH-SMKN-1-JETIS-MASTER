import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:8080/api",
   baseURL: "https://api1.sissmkn1jetis.my.id/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;