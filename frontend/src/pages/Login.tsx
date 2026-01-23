import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [admin,setAdmin] = useState<LoginResponse>()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!regEx.test(email) || password.length < 6) {
      setError("Please enter a valid email and a password with at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data: LoginResponse = await response.json();
      
      localStorage.setItem('authToken', data.token);
      if(data){
        setAdmin(data);
        navigate("/add-candidate");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              disabled={isLoading}
              required
            />
          </div>
          {error && <div style={styles.errorBox}>{error}</div>}
          <button 
            type="submit" 
            style={{
              ...styles.button,
              backgroundColor: isLoading ? '#ccc' : '#007bff',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:'50vw',
    backgroundColor: '#f0f2f5',
    borderRadius: '10px',
  },
  card: {
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '10px',
  },
  errorBox: {
    color: '#d9534f',
    backgroundColor: '#fdeded',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  }
};

export default LoginPage