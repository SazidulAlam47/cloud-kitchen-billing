import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => {
  return (
    <div className="md:hidden p-4 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-30 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-gray-800">MetroChef</span>
      </div>
    </div>
  );
};

export default MobileHeader;
