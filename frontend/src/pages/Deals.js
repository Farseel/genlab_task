import { useEffect, useState } from "react";
import { API } from "../api/api";

export default function Deals() {
  const [deals, setDeals] = useState([]);
  const [form, setForm] = useState({});

  const fetchDeals = async () => {
    const res = await API.get("/deals");
    setDeals(res.data);
  };

  const addDeal = async () => {
    await API.post("/deals", form);
    fetchDeals();
  };

  const deleteDeal = async (id) => {
    await API.delete(`/deals/${id}`);
    fetchDeals();
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Deals</h2>

      <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})}/>
      <input placeholder="Discount %" onChange={e => setForm({...form, discount: e.target.value})}/>
      <button onClick={addDeal}>Add Deal</button>

      {deals.map(d => (
        <div key={d._id}>
          {d.title} - {d.discount}% OFF
          <button onClick={() => deleteDeal(d._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}