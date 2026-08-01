const API_URL = 'http://localhost:5000/api/items';

export const fetchItems = () => fetch(API_URL).then(r => r.json());

export const createItem = (data) => fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json());

export const updateItem = (id, data) => fetch(`${API_URL}/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(r => r.json());

export const deleteItem = (id) => fetch(`${API_URL}/${id}`, {
  method: 'DELETE'
}).then(r => r.json());