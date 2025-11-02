import { useState, useEffect } from "react";
import api from "./api";

export default function Sell() {
  const [form, setForm] = useState({
    title: "", location: "", price: "", sqft: "", rooms: "", bathrooms: "", category: "", images: [], isRent: false
  });
  const [previews, setPreviews] = useState([]);
  const [userProperties, setUserProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('sell');

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/contact-requests/seller", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Get unique properties from contact requests
        const properties = res.data.contactRequests.reduce((acc, request) => {
          const existing = acc.find(p => p._id === request.property._id);
          if (!existing) {
            acc.push(request.property);
          }
          return acc;
        }, []);
        setUserProperties(properties);
      } catch (err) {
        console.error("Error fetching user properties:", err);
      }
    };

    fetchUserProperties();
  }, []);

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

      await api.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      alert("Property listed successfully!");
      setForm({ title: "", location: "", price: "", sqft: "", rooms: "", bathrooms: "", category: "", images: [], isRent: false });
      setPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Error uploading property!");
    }
  };

  const tabStyle = {
    padding: "10px 20px",
    margin: "0 5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold"
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#3498db",
    color: "#fff"
  };

  const cardStyle = {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🏠 Property Management</h2>

      {/* Tab Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={activeTab === 'sell' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('sell')}
        >
          Sell Property
        </button>
        <button
          style={activeTab === 'myProperties' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('myProperties')}
        >
          My Properties ({userProperties.length})
        </button>
      </div>

      {/* Sell Property Tab */}
      {activeTab === 'sell' && (
        <div>
          <h3>Sell Your Property</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input name="sqft" type="number" value={form.sqft} onChange={handleChange} placeholder="Area (sqft)" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input name="rooms" type="number" value={form.rooms} onChange={handleChange} placeholder="Bedrooms" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
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
      )}

      {/* My Properties Tab */}
      {activeTab === 'myProperties' && (
        <div>
          <h3>My Listed Properties</h3>
          {userProperties.length === 0 ? (
            <p>You haven't listed any properties yet.</p>
          ) : (
            <div>
              {userProperties.map((property, index) => (
                <div key={index} style={cardStyle}>
                  <h4>{property.title}</h4>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p><strong>Price:</strong> ₹{property.price}</p>
                  <p><strong>Area:</strong> {property.area} sqft</p>
                  <p><strong>Type:</strong> {property.type}</p>
                  <p><strong>Status:</strong> {property.isRent ? "For Rent" : "For Sale"}</p>
                  <p><strong>Listed on:</strong> {new Date(property.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
