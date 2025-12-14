import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../ui/Button';

interface DashboardHeaderProps {
    activeTab: 'corporate' | 'event';
}

const DashboardHeader = ({ activeTab }: DashboardHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage all your billing records in one place.</p>
            </div>
            <Button onClick={() => navigate(`/${activeTab}/create`)} className="gap-2 shadow-lg hover:shadow-xl transition-all">
                <FiPlus className="w-4 h-4" />
                Create New {activeTab === 'corporate' ? 'Bill' : 'Event'}
            </Button>
        </div>
    );
};

export default DashboardHeader;
