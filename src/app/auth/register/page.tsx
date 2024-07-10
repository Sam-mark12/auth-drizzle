'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { createUser } from './_actions/create-user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/lib/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


 
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUser(email, password);
      toast.success('User created successfully');
      router.push('/auth/login');
    } catch (error) {
      toast.error("Couldn't create user. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white border border-green-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-90 relative text-green-600">
        <h1 className="text-4xl text-green-600 font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSignUp}>
          <div className="relative my-6">
            <input
              type="email"
              placeholder="Ema  il"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-72 py-2 px-0 text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-300 appearance-none focus:outline-none focus:ring-0 focus:text-green-600 focus:border-green-500 peer"
            />
           
          </div>
          <div className="relative my-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-72 py-2 px-0 text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-300 appearance-none focus:outline-none focus:ring-0 focus:text-green-600 focus:border-green-500 peer"
            />
            
          </div>
          <div className="relative my-6">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-72 py-2 px-0 text-sm text-green-600 bg-transparent border-0 border-b-2 border-green-300 appearance-none focus:outline-none focus:ring-0 focus:text-green-600 focus:border-green-500 peer"
            />
  
           
          </div>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-green-600 text-white hover:bg-green-700 hover:text-white py-2 transition-colors duration-300"
            type="submit"
          >
            Register
          </button>
          <div>
            <span className="m-4">
              Already have an Account?
              <Link className="text-green-600 hover:text-green-700" href="/auth/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;