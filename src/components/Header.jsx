import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container-max h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary text-white flex items-center justify-center font-bold">AI</div>
          <span className="font-semibold text-gray-900">AI Website Builder</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>Home</NavLink>
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>About</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-gray-700">Hi, {user.name?.split(' ')[0] || 'User'}</span>
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
