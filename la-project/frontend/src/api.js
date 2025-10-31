import axios from "axios";

export default axios.create({
  baseURL: "https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app/api",  // backend deployed on Vercel
});
