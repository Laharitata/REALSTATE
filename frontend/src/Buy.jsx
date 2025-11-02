// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropertyCard from './PropertyCard';
// import Navbar from './Navbar';

// export default function Buy() {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/properties')
//       .then(res => setProperties(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const flats = properties.filter(p => p.type === 'Flat');
//   const houses = properties.filter(p => p.type === 'Individual House');
//   const shops = properties.filter(p => p.type === 'Shop');

//   return (
//     <div style={{ padding: '20px' }}>
//       <Navbar />
//       <h2>Available Properties</h2>

//       {flats.length > 0 && (
//         <>
//           <h3>Flats</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
//             {flats.map(p => <PropertyCard key={p._id} property={p} />)}
//           </div>
//         </>
//       )}

//       {houses.length > 0 && (
//         <>
//           <h3>Houses</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
//             {houses.map(p => <PropertyCard key={p._id} property={p} />)}
//           </div>
//         </>
//       )}

//       {shops.length > 0 && (
//         <>
//           <h3>Shops</h3>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
//             {shops.map(p => <PropertyCard key={p._id} property={p} />)}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";

export default function Buy() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading properties...</div>;

  const flats = properties.filter(p => p.type === 'Flat');
  const houses = properties.filter(p => p.type === 'Individual House');
  const shops = properties.filter(p => p.type === 'Shop');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Properties</h2>

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

      {properties.length === 0 && !loading && <p>No properties available.</p>}
    </div>
  );
}
