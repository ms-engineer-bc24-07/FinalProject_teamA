// app/components/Common/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-center p-4 bg-gray-300 border-b border-gray-400">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav className="mt-2">
        <Link href="/" className="mr-4 text-blue-600 hover:underline">
          Home1
        </Link>
        <Link href="/home2" className="text-blue-600 hover:underline">
          Home2
        </Link>
      </nav>
    </header>
  );
};

export default Header;
