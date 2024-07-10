'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { loginUser } from './_actions/login-user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};


const handleLogin = async (e: React.FormEvent) => {
    console.log("Login button pressed");
    console.log(email,password);
    e.preventDefault();
    try {
      await loginUser(email, password);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-green-900">Sign in to your account</h2>
        <form  className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-700">Email address</label>
            <div className="mt-1">
            <input
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  required
  className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-green-400 focus:ring-green-500 focus:border-green-500 text-green-900"
  placeholder="you@example.com"
  onChange={(e) => setEmail(e.target.value)}
/>

            </div>
          </div>
          <div>
  <label htmlFor="password" className="block text-sm font-medium text-green-700">Password</label>
  <div className="mt-1 relative">
    <input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      required
      className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-green-400 focus:ring-green-500 focus:border-green-500 text-green-900"
      placeholder="••••••••"
      onChange={(e) => setPassword(e.target.value)}
    />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <svg className="h-5 w-5 text-green-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        ) : (
          <svg className="h-5 w-5 text-green-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            <path d="M2.5 12h19"></path>
          </svg>
        )}
      </button>
  </div>
</div>
          <div className="flex items-center justify-between">
           
            <div className="text-sm">
              <Link href="/forgot" className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <Link href="/auth/register" className="font-medium text-green-600 hover:text-green-500">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;