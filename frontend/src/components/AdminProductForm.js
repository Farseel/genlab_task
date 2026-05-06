import { useState } from "react";

export default function AdminProductForm({ onSubmit }) {
  const [form, setForm] = useState({});

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Price" onChange={e => setForm({...form, price: e.target.value})}/>
      <input placeholder="Image URL" onChange={e => setForm({...form, image: e.target.value})}/>
      <input placeholder="Category" onChange={e => setForm({...form, category: e.target.value})}/>
      <input placeholder="Stock" onChange={e => setForm({...form, stock: e.target.value})}/>
      
      <button onClick={() => onSubmit(form)}>Add Product</button>
    </div>
  );
}