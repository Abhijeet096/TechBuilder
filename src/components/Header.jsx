import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <div className="container-max h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary text-white flex items-center justify-center font-bold">AI</div>
          <span className="font-semibold text-gray-900 dark:text-gray-100">AI Website Builder</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-300">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>Home</NavLink>
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="hidden sm:inline-flex text-xs px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300">Hi, {user.name?.split(' ')[0] || 'User'}</span>
              <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
