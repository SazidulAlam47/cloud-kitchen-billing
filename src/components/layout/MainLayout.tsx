import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from '../shared/MobileHeader';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden transition-all duration-300">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-1 overflow-hidden p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
