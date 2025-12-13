import { LayoutDashboard, FileText, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Create Corporate Bill', path: '/corporate/create', icon: FileText },
  { name: 'Create Event Bill', path: '/event/create', icon: Calendar },
];

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          MetroChef
        </h1>
        <p className="text-xs text-slate-400 mt-1">Billing System</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-slate-800 hover:scale-[1.02]",
                isActive 
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-900/50" 
                  : "text-slate-400 hover:text-white"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 text-center">
          &copy; 2025 MetroChef
        </div>
      </div>
    </div>
  );
}
