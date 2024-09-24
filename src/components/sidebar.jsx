'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  return (
    <div className="h-full w-1/4 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="flex flex-col mt-4 space-y-2">
        <Link href="/profile" legacyBehavior>
          <a className={`p-4 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-200 ${isActive('/profile') ? 'bg-gray-700' : ''}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Profile</span>
          </a>
        </Link>
        <Link href="/saved" legacyBehavior>
          <a className={`p-4 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-200 ${isActive('/saved') ? 'bg-gray-700' : ''}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Saved</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
