import React, { useEffect, useState } from 'react';

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/photos`)
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch((err) => console.error('Error fetching photos:', err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore AI-Generated Photos</h1>
      <div style={styles.grid}>
        {photos.map((photo) => (
          <div key={photo._id} style={styles.card}>
            <img src={photo.url} alt={photo.title} style={styles.image} />
            <h3>{photo.title || 'Untitled'}</h3>
            <p>{photo.description}</p>
            <p><strong>Price:</strong> {photo.price} memecoins</p>
            <p><small>Owner: {photo.owner?.username || 'Unknown'}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '1rem 2rem'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1rem',
    backgroundColor: '#fafafa'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  }
};

export default Home;
