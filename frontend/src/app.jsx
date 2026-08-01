import { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem } from './services/api';

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    setLoading(true);
    const res = await fetchItems();
    if (res.success) setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createItem({ name, description });
    setName('');
    setDescription('');
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🚀 Bakelume API</h1>

      <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>➕ Agregar</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <h3>📋 Items ({items.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map(item => (
              <li key={item._id} style={{ padding: '10px', margin: '5px 0', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{item.name}</strong>
                  {item.description && <span style={{ color: '#666', marginLeft: '10px' }}>{item.description}</span>}
                </div>
                <button onClick={() => handleDelete(item._id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>🗑️</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}