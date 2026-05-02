"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
  { name: 'Projects', path: '/admin/projects', icon: '📁' },
  { name: 'Skills', path: '/admin/skills', icon: '⚡' },
  { name: 'Experience', path: '/admin/experience', icon: '💼' },
  { name: 'Education', path: '/admin/education', icon: '🎓' },
  { name: 'Blog', path: '/admin/blog', icon: '📝' },
  { name: 'Messages', path: '/admin/messages', icon: '✉️' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin') return;

    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token) {
      router.push('/admin');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin');
  };

  // Don't show layout on login page
  if (pathname === '/admin') {
    return children;
  }

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Background Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500 blob opacity-5 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-pink-500 blob opacity-5 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#12122a]/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-white font-bold">Swikar Admin</h1>
                <p className="text-white/50 text-xs">Portfolio CMS</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname === item.path || pathname.startsWith(item.path + '/')
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user?.email || 'Admin'}</p>
                <p className="text-white/50 text-xs">Administrator</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/"
                className="flex-1 px-3 py-2 text-center text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0f0f23]/80 backdrop-blur-lg border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Page Title */}
            <h2 className="text-xl font-bold text-white capitalize">
              {pathname.split('/').pop() || 'Dashboard'}
            </h2>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
