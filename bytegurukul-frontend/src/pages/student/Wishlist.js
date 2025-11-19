// src/pages/student/Wishlist.js
import React from 'react';
import StudentNavbar from '../../components/student/StudentNavbar';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist = [], removeFromWishlist = () => {} } = useCart();

  // demo fallback
  const items = wishlist.length ? wishlist : [
    { id:'p1', title:'Project - Library Management', price: 199 },
    { id:'p2', title:'DSA Practice Pack', price: 0 }
  ];

  return (
    <>
      <StudentNavbar />
      <div style={wStyles.page}>
        <h1>Wishlist</h1>
        <p style={{color:'var(--text-secondary)'}}>Items you saved to buy later</p>

        <div style={wStyles.grid}>
          {items.map(i => (
            <div key={i.id} style={wStyles.card}>
              <div>
                <div style={{fontWeight:700}}>{i.title}</div>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>{i.price === 0 ? 'FREE' : `₹ ${i.price}`}</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <Link to={`/projects/${i.id}`} style={wStyles.btn}>View</Link>
                <button onClick={() => removeFromWishlist(i.id)} style={wStyles.btnGhost}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const wStyles = {
  page: { padding:'12px 20px', maxWidth:1000, margin:'8px auto' },
  grid: { display:'grid', gap:12, marginTop:12 },
  card: { padding:14, borderRadius:12, background:'var(--surface)', border:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' },
  btn: { background:'var(--primary)', color:'white', padding:'8px 12px', borderRadius:8, textDecoration:'none' },
  btnGhost: { background:'transparent', border:'1px solid var(--border)', padding:'8px 12px', borderRadius:8, cursor:'pointer' }
};
