import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="md:w-64 md:flex-shrink-0">
      <div className="md:hidden p-4">
        <button className="btn btn-secondary w-full" onClick={() => setOpen(v => !v)}>
          {open ? 'Hide Menu' : 'Show Menu'}
        </button>
      </div>
      <aside className={(open ? 'block' : 'hidden') + ' md:block bg-white md:h-[calc(100vh-4rem)] md:sticky md:top-16 border-r border-gray-200'}>
        <nav className="p-4 space-y-1">
          {[
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/dashboard#sites', label: 'My Websites' },
            { to: '/dashboard#templates', label: 'Templates' },
            { to: '/dashboard#settings', label: 'Settings' },
          ].map(item => (
            <NavLink key={item.to} to={item.to} className={({isActive}) =>
              'block rounded-md px-3 py-2 text-sm ' + (isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100')
            }>
              {item.label}
            </NavLink>
          ))}
          <button
            className="block w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => { logout(); navigate('/login'); setOpen(false); }}
          >
            Logout
          </button>
        </nav>
      </aside>
    </div>
  );
}
