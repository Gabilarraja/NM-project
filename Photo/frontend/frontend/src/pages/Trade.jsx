import React, { useEffect, useState } from 'react';

const Trade = () => {
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  // Fetch photos and users on mount
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/photos`)
      .then(res => res.json())
      .then(data => setPhotos(data));

    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleBuy = async (photoId) => {
    if (!selectedUser) {
      alert('Please select a buyer first.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buyerId: selectedUser, photoId })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Photo purchased successfully!');
        // Refresh photos to reflect new owner
        const updatedPhotos = await fetch(`${process.env.REACT_APP_API_URL}/api/photos`)
          .then(res => res.json());
        setPhotos(updatedPhotos);
      } else {
        alert(result.message || 'Purchase failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error while purchasing.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trade AI Photos</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Select Buyer: </strong></label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">-- Choose a user --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} (Balance: {user.balance})
            </option>
          ))}
        </select>
      </div>

      <div style={styles.grid}>
        {photos.map(photo => (
          <div key={photo._id} style={styles.card}>
            <img src={photo.url} alt={photo.title} style={styles.image} />
            <h3>{photo.title}</h3>
            <p>{photo.description}</p>
            <p><strong>Price:</strong> {photo.price} memecoins</p>
            <p><strong>Owner:</strong> {photo.owner?.username || 'Unknown'}</p>
            {selectedUser && photo.owner?._id !== selectedUser && (
              <button onClick={() => handleBuy(photo._id)} style={styles.button}>
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    backgroundColor: '#f9f9f9'
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Trade;
