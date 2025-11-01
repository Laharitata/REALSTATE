import axios from "axios";

export default axios.create({
  baseURL: "https://realstate-2-8vnf.onrender.com/api",  // backend deployed on Render
});
