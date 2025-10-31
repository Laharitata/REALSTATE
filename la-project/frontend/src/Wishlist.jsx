import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Ensure only non-null objects
      const validWishlist = (res.data.wishlist || []).filter(item => item != null);
      setWishlist(validWishlist);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://realstate-1f928m2sl-laharis-projects-185ef7fa.vercel.app/api/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWishlist(); // refresh after remove
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading wishlist...</div>;

  if (wishlist.length === 0)
    return <div style={{ padding: "100px 20px" }}><h2>Your Wishlist is empty</h2></div>;

  return (
    <div style={{ padding: "80px 20px" }}>
      <h2>My Wishlist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {wishlist.map(p =>
          p ? <PropertyCard key={p._id} property={p} onRemove={() => handleRemove(p._id)} /> : null
        )}
      </div>
    </div>
  );
}
