import React, { useState } from 'react';
export default function Upload() {
  const [photo, setPhoto] = useState({ title: '', url: '', description: '', price: '' });
  const handleChange = e => setPhoto({ ...photo, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="url" placeholder="Image URL" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}