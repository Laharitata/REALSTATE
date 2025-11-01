import axios from "axios";

export default axios.create({
  baseURL: "https://realstate-4.onrender.com/api",  // backend deployed on Render
});
