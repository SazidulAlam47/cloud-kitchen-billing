import { FiBriefcase, FiCalendar } from 'react-icons/fi';

interface EmptyStateProps {
    activeTab: 'corporate' | 'event';
}

const EmptyState = ({ activeTab }: EmptyStateProps) => {
    return (
        <div className="text-center py-12">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'corporate' ? (
                    <FiBriefcase className="w-8 h-8 text-gray-400" />
                ) : (
                    <FiCalendar className="w-8 h-8 text-gray-400" />
                )}
            </div>
            <h3 className="text-lg font-medium text-gray-900">No bills found</h3>
            <p className="text-gray-500 mt-1">Get started by creating a new {activeTab} bill.</p>
        </div>
    );
};

export default EmptyState;
