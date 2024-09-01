import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex p-3 m-5 justify-between font-mono rounded-lg shadow-md">
      <h1 className="text-xl"><Link href={"/"}>MyFirstEcommerce</Link></h1>
      <ul className="flex px-2">
        <li className="px-2"><Link href={"/ping"} className="hover:text-blue-500 transition-all duration-200">ping</Link></li>
        <li className="px-2"><Link href={"/"} className="hover:text-blue-500 transition-all duration-200">home</Link></li>
        <li className="px-2"><Link href={"/products"} className="hover:text-blue-500 transition-all duration-200">products</Link></li>
        <li className="px-2"><Link href={"/signup"} className="hover:text-blue-500 transition-all duration-200">sign up</Link></li>
        <li className="px-2"><Link href={"/signin"} className="hover:text-blue-500 transition-all duration-200">sign in</Link></li>
      </ul>
    </nav>
  );
}