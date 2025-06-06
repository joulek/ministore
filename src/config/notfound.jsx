import React, { useEffect, useState } from 'react';

const NotFound = () => {
  const [show, setShow] = useState(false);

  // Animation déclenchée après le chargement du composant
  useEffect(() => {
    setTimeout(() => setShow(true), 100); // petit délai pour déclencher l'effet
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 Page Not Found</h1>
      <div style={styles.content}>
        <img
          src="/images/images.png"
          alt="404"
          style={{
            ...styles.image,
            transform: show ? 'scale(1)' : 'scale(0.5)',
            opacity: show ? 1 : 0,
          }}
        />
        <p style={styles.text}>
          Look like you're lost<br />
          the page you are looking for is not available!
        </p>
        <a href="/" style={styles.link}>Go to Home</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  content: {
    marginTop: '20px',
  },
  image: {
    width: '400px', // ✅ image plus grande
    height: 'auto',
    transition: 'transform 0.6s ease, opacity 0.6s ease', // ✅ animation douce
  },
  text: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#555',
  },
  link: {
    color: '#fff',
    padding: '10px 20px',
    backgroundColor: '#39ac31',
    margin: '20px 0',
    display: 'inline-block',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default NotFound;
