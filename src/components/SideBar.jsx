// src/components/Sidebar.jsx
import { 
    HomeIcon, 
    ShoppingBagIcon, 
    UserGroupIcon, 
    ChartBarIcon, 
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon
  } from '@heroicons/react/24/outline';
  
  function Sidebar() {
    const navItems = [
      { name: 'Dashboard', icon: HomeIcon },
      { name: 'Products', icon: ShoppingBagIcon, active: true },
      { name: 'Customers', icon: UserGroupIcon },
      { name: 'Reports', icon: ChartBarIcon },
      { name: 'Settings', icon: Cog6ToothIcon },
    ];
  
    return (
      <aside className="w-64 bg-indigo-800 text-white flex flex-col">
        {/* Logo */}
        <div className="px-6 py-4 flex items-center border-b border-indigo-700">
          <div className="bg-white rounded-md p-1.5">
            <svg className="h-8 w-8 text-indigo-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold">Door Delv</span>
        </div>
  
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-2 py-3 rounded-md text-sm font-medium ${
                item.active 
                  ? 'bg-indigo-900 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-700'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
  
        {/* Logout */}
        <div className="px-4 py-6 border-t border-indigo-700">
          <a
            href="#"
            className="flex items-center px-2 py-3 text-sm font-medium text-indigo-200 rounded-md hover:bg-indigo-700"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            Logout
          </a>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;