"use client"
import React, { useState, useEffect } from 'react';
import { ping } from '../api/ping';

export default function Ping() {
  const [pingResponse, setPingResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await ping();
        setPingResponse(response.data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPing();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Ping Test</h1>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl">
            Ping response: <span className="font-semibold">{pingResponse}</span>
          </p>
        </div>
      )}
    </div>
  );
}