import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [cin, setCin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { nom, cin };
      const userApi = new authApi();
      const loginData = await userApi.loginUser(credentials);

      if (!loginData || !loginData.utilisateur || !loginData.utilisateur.role) {
        throw new Error("Données utilisateur invalides.");
      }

      const utilisateur = loginData.utilisateur;
      const userRole = utilisateur.role;

      sessionStorage.setItem('token', loginData.access_token);
      sessionStorage.setItem('username', utilisateur.username);
      sessionStorage.setItem('role', userRole);

      setLoggedIn(true);

      if (userRole === 'admin') {
        navigate('/admin/clients/client');
      } else if (userRole === 'gestionnaire') {
        navigate('/gestionnaire/client');
      } else if (userRole === 'magasinier') {
        navigate('/magasinier/piecesb');
      }
      else if (userRole === 'technicien') {
        navigate('/operateur/EtapeOperateur');
      } else {
        setErrorMessage("Rôle d'utilisateur non reconnu.");
      }
    } catch (error) {
      console.error('Erreur de connexion :', error);
      setErrorMessage('Nom ou CIN incorrect. Veuillez réessayer.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.loginBox}>
          <img src="/images/logo_sbtf_sansbg.png" alt="Logo SBTF" style={styles.logo} />
          <h2 style={styles.title}>Se Connecter</h2>

          {errorMessage && <div style={styles.error}>{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CIN</label>
              <input
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('/images/login-bg.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: '#fff',
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '140px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '30px',
    fontWeight: '600',
    color: '#fff',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '6px',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3A3A3A',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  error: {
    width: '100%',
    backgroundColor: '#ffcccc',
    color: '#990000',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

export default Login;
