import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { useStore } from './store';
import Router, { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fetch = useStore((state) => state.fetch);
  const data = useStore((state) => state.data);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userLogin: any = {
      username: username,
      password: password,
    };
    if (username && password) {
      axios.post('http://localhost:4000/auth/login', userLogin);
      alert('success');
    } else {
      alert('input isemty');
    }
    Router.push('/weather');
  };
  return (
    <>
      <section className="login-container">
        <div className="login-title">Login</div>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter user name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
            type="text"
            placeholder="Enter Pass word"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
        <div className="login-register"> Donnt have an account yet</div>
        <Link href="/register">Register one for free</Link>
      </section>
    </>
  );
}
