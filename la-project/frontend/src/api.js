import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",  // backend running on port 5000
});
