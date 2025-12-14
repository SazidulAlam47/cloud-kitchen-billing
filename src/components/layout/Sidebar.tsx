import { LayoutDashboard, FileText, Calendar, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Create Corporate Bill', path: '/corporate/create', icon: FileText },
  { name: 'Create Event Bill', path: '/event/create', icon: Calendar },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={cn(
        "h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              MetroChef
            </h1>
            <p className="text-xs text-slate-400 mt-1">Billing System</p>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()} // Close sidebar on navigation on mobile
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                  isActive 
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-900/50 hover:bg-primary-800" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
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
    </>
  );
};

export default Sidebar;
