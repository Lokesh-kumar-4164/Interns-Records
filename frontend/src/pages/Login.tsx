import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyPopUp from "../components/VerifyOTP";
import { useLoginStore } from "../store/authStore";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    role: string;
    name: string;
  };
}

type User = {
  email:string,
  user:string,
  role:string
}

const VITE_URL = import.meta.env.VITE_API_URL;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useLoginStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUser = async (): Promise<LoginResponse> => {
    const response = await fetch(`${VITE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.json();
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const roleCheck = await fetch(
        `${VITE_URL}/admin/check-role?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!roleCheck.ok) {
        throw new Error("Failed to check role");
      }

      const data = await roleCheck.json();

      if (data.role !== "superadmin") {
        alert("Only super admin can reset password");
        return;
      }

      const response = await fetch(`${VITE_URL}/admin/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset mail");
      }

      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regEx.test(email) || password.length < 6) {
      setError("Please enter a valid email and password");
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchUser();

      localStorage.setItem("authToken", data.token);

      const user:User = {
        email,
        user:data.user.name,
        role:data.user.role
      }

      login(user);
      navigate("/add-candidate");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {isOpen && <VerifyPopUp email={email} />}
      <div style={styles.card}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
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
              backgroundColor: isLoading ? "#ccc" : "#007bff",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>

          <div className="flex justify-end">
            <button
              className="text-sm text-gray-600 hover:text-gray-800 m-4"
              onClick={handleResetPassword}
              type="button"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    width: "100%",
    maxWidth: "400px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "10px",
  },
  errorBox: {
    color: "#d9534f",
    backgroundColor: "#fdeded",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "15px",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default LoginPage;
