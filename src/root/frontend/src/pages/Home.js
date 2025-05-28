import React, { useEffect, useState } from 'react';
export default function Home() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/photos')
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, []);

  return (
    <div>
      <h1>AI Photo Marketplace</h1>
      {photos.map(photo => (
        <div key={photo._id}>
          <img src={photo.url} alt={photo.title} width={200} />
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
          <p>Price: {photo.price} coins</p>
        </div>
      ))}
    </div>
  );
}
