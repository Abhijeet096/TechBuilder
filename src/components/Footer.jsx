import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container-max py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary text-white flex items-center justify-center font-bold">AI</div>
            <span className="font-semibold text-gray-900">AI Website Builder</span>
          </div>
          <p className="mt-3">Build your website in minutes with AI.</p>
        </div>
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">Company</div>
          <Link to="/" className="hover:text-primary">About</Link><br/>
          <a href="#pricing" className="hover:text-primary">Pricing</a><br/>
          <a href="#features" className="hover:text-primary">Features</a>
        </div>
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">Legal</div>
          <a href="#" className="hover:text-primary">Privacy</a><br/>
          <a href="#" className="hover:text-primary">Terms</a><br/>
          <Link to="/" className="hover:text-primary">Contact</Link>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} AI Website Builder. All rights reserved.</div>
    </footer>
  );
}
