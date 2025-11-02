import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import PropertyCard from "./PropertyCard";

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minSqft: '',
    maxSqft: '',
    minRooms: '',
    maxRooms: '',
    isRent: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await api.get("/properties");
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProperties = properties.filter(p => {
    const price = p.price || 0;
    const sqft = p.area || 0;
    const rooms = p.bedrooms || 0;

    return (
      (filters.minPrice === '' || price >= parseInt(filters.minPrice)) &&
      (filters.maxPrice === '' || price <= parseInt(filters.maxPrice)) &&
      (filters.minSqft === '' || sqft >= parseInt(filters.minSqft)) &&
      (filters.maxSqft === '' || sqft <= parseInt(filters.maxSqft)) &&
      (filters.minRooms === '' || rooms >= parseInt(filters.minRooms)) &&
      (filters.maxRooms === '' || rooms <= parseInt(filters.maxRooms)) &&
      (filters.isRent === '' || p.isRent === (filters.isRent === 'true'))
    );
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading properties...</div>;

  const flats = filteredProperties.filter(p => p.type === 'Flat');
  const houses = filteredProperties.filter(p => p.type === 'Individual House');
  const shops = filteredProperties.filter(p => p.type === 'Shop');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Properties</h2>

      {/* Filter Section */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Filter Properties</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
          <div>
            <label>Min Price: </label>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="e.g. 100000" />
          </div>
          <div>
            <label>Max Price: </label>
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="e.g. 500000" />
          </div>
          <div>
            <label>Min Sqft: </label>
            <input type="number" name="minSqft" value={filters.minSqft} onChange={handleFilterChange} placeholder="e.g. 500" />
          </div>
          <div>
            <label>Max Sqft: </label>
            <input type="number" name="maxSqft" value={filters.maxSqft} onChange={handleFilterChange} placeholder="e.g. 2000" />
          </div>
          <div>
            <label>Min Rooms: </label>
            <input type="number" name="minRooms" value={filters.minRooms} onChange={handleFilterChange} placeholder="e.g. 1" />
          </div>
          <div>
            <label>Max Rooms: </label>
            <input type="number" name="maxRooms" value={filters.maxRooms} onChange={handleFilterChange} placeholder="e.g. 5" />
          </div>
          <div>
            <label>Type: </label>
            <select name="isRent" value={filters.isRent} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="false">Buy</option>
              <option value="true">Rent</option>
            </select>
          </div>
          <button onClick={() => setFilters({ minPrice: '', maxPrice: '', minSqft: '', maxSqft: '', minRooms: '', maxRooms: '', isRent: '' })} style={{ padding: '8px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear Filters</button>
        </div>
      </div>

      {flats.length > 0 && (
        <>
          <h3>Flats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {flats.map(p => <PropertyCard key={p._id} property={p} />)}
          </div>
        </>
      )}

      {houses.length > 0 && (
        <>
          <h3>Houses</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {houses.map(p => <PropertyCard key={p._id} property={p} />)}
          </div>
        </>
      )}

      {shops.length > 0 && (
        <>
          <h3>Shops</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {shops.map(p => <PropertyCard key={p._id} property={p} />)}
          </div>
        </>
      )}

      {filteredProperties.length === 0 && !loading && <p>No properties match your filters.</p>}
    </div>
  );
}
