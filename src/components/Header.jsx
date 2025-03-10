// src/components/Header.jsx
import { BellIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

function Header({ setShowForm }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold text-gray-800">Door Delv</h1>
        
        <div className="flex items-center">
          <button 
            onClick={() => setShowForm(true)}
            className="mr-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Product
          </button>
          
          <button className="p-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          
          <div className="ml-4 relative">
            <button className="flex items-center focus:outline-none">
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                DD
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
