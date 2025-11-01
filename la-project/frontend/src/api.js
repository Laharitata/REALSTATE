import axios from "axios";

export default axios.create({
  baseURL: "https://realstate-5.onrender.com/api",  // backend deployed on Render
});
