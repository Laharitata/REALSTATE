import { useState } from "react";
import axios from "axios";

export default function Sell() {
  const [form, setForm] = useState({
    title: "", location: "", price: "", sqft: "", rooms: "", category: "", images: [], isRent: false
  });
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files) {
      const fileArray = Array.from(files);
      setForm({ ...form, images: fileArray });
      setPreviews(fileArray.map(f => URL.createObjectURL(f)));
    } else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key === "images") form.images.forEach(img => formData.append("images", img));
        else formData.append(key, form[key]);
      });

      await axios.post("http://localhost:5000/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      alert("Property listed successfully!");
      setForm({ title: "", location: "", price: "", sqft: "", rooms: "", category: "", images: [], isRent: false });
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Error uploading property!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Sell Your Property</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input name="sqft" type="number" value={form.sqft} onChange={handleChange} placeholder="Area (sqft)" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input name="rooms" type="number" value={form.rooms} onChange={handleChange} placeholder="Rooms" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <select name="category" value={form.category} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <option value="">Select Category</option>
          <option value="Flat">Flat</option>
          <option value="Individual House">Individual House</option>
          <option value="Shop">Shop</option>
        </select>
        <label>
          <input type="checkbox" name="isRent" checked={form.isRent} onChange={(e) => setForm({ ...form, isRent: e.target.checked })} />
          Is this for rent?
        </label>
        <input type="file" name="images" accept="image/*" multiple onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {previews.map((src, idx) => <img key={idx} src={src} alt="" width="100" style={{ borderRadius: '5px' }} />)}
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
}
