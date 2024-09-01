"use client"
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { signinUser } from '../api/ping'; // Assume this function exists for signin
import useStore from '../state/store';
import { useRouter } from 'next/navigation';

interface SigninData {
  email: string;
  password: string;
}

export const signin = async (data: SigninData): Promise<AxiosResponse<any>> => {
  try {
    const response = await signinUser(data);
    return response;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const login = useStore(state => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    const signinData: SigninData = { email, password };

    try {
      const response = await signin(signinData);
      console.log('Signin successful:', response);
      
      login({
        username: response.data.username, // Assuming the API returns a username
        email: response.data.email,
        // Add any other user data from the response as needed
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/'); // Redirect to dashboard after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Signin error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {isSuccess && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">Login successful! Redirecting to dashboard...</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}