import React, { useEffect, useState } from 'react';

const Upload = () => {
  const [form, setForm] = useState({
    url: '',
    title: '',
    description: '',
    price: '',
    ownerId: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error loading users:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.url || !form.price || !form.ownerId) {
      alert('Please fill out required fields.');
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (res.ok) {
        alert('Photo uploaded!');
        setForm({ url: '', title: '', description: '', price: '', ownerId: '' });
      } else {
        alert(result.message || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading photo.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload AI-Generated Photo</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="url"
          placeholder="Image URL *"
          value={form.url}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          style={styles.textarea}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (memecoins) *"
          value={form.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select
          name="ownerId"
          value={form.ownerId}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Owner *</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username} (Balance: {user.balance})
            </option>
          ))}
        </select>
        <button type="submit" style={styles.button}>Upload</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    resize: 'vertical'
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Upload;
