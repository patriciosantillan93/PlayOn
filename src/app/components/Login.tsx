"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import styles from './Login.module.css'; // Import your CSS module

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Handle the login request
    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Login successful!');

        // Store the token in localStorage
        localStorage.setItem("authToken", result.token);  // Save the token

        // Redirect to the complete reservation page
        router.push("/complete-reservation"); // Redirect to desired page after login
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to log in");
      }
    } catch (error) {
      setError("Network error or server is not available.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.success}>{message}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
