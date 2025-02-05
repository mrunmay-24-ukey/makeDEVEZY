import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Code2, Zap, Database, FileText, Box, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">makeDEVEZY</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" />
              <NavItem to="/snippets" icon={<Code2 className="h-5 w-5" />} text="Snippets" />
              <NavItem to="/api-tester" icon={<Zap className="h-5 w-5" />} text="API Tester" />
              <NavItem to="/env-manager" icon={<Database className="h-5 w-5" />} text="Env Manager" />
              <NavItem to="/documentation" icon={<FileText className="h-5 w-5" />} text="Docs" />
              <NavItem to="/codecollab" icon={<Box className="h-5 w-5" />} text="Code Collab" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, icon, text }) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
            isActive
              ? 'text-indigo-600 bg-indigo-50'
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
          }`
        }
      >
        {icon}
        <span>{text}</span>
      </NavLink>
    );
  }
  

export default Navbar