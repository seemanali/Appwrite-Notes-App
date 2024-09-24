import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(user.loginStatus);
  }, [user]);

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto flex-col sm:flex-row">
        <div className="mb-2 sm:mb-0">
          <Link to="/" className="text-2xl font-bold hover:text-gray-300 whitespace-nowrap">
            NotesProblem
          </Link>
        </div>
        <div className="flex items-center space-x-4 flex-wrap">
          <Link to="/" className="hover:text-gray-300 whitespace-nowrap">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                to="/signup"
                className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 whitespace-nowrap"
              >
                Log In
              </Link>
            </>
          ) : (
            <>
              <Link to="/mynotes" className="hover:text-gray-300 whitespace-nowrap">
                My Notes
              </Link>
              <Link to="/notesform" className="hover:text-gray-300 whitespace-nowrap">
                Add Note
              </Link>
              <Link to="/profile" className="hover:text-gray-300 whitespace-nowrap">
                Profile
              </Link>
              <Link
                to="/logout"
                className="bg-red-500 px-3 py-2 rounded-md hover:bg-red-600 whitespace-nowrap"
              >
                Log Out
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
