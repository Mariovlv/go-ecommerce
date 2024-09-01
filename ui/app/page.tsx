"use client"
import Link from 'next/link';
import useStore from './state/store';

export default function Home() {
  const { isLoggedIn, userData } = useStore();

  return (
    <div className="flex flex-col m-2 p-2">
      {isLoggedIn ? (
        <p>Bienvenido, {userData?.username}!</p>
      ) : (
        <p>Crea una cuenta en <Link href="/signup">Signup</Link></p>
      )}
      <h1>Inicio</h1>
    </div>
  );
}