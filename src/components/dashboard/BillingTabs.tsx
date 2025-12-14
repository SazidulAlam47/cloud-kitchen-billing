import { cn } from '../../utils/cn';

interface BillingTabsProps {
    activeTab: 'corporate' | 'event';
    onChange: (tab: 'corporate' | 'event') => void;
}

const BillingTabs = ({ activeTab, onChange }: BillingTabsProps) => {
    return (
        <div className="flex border-b border-gray-200">
            <button
                onClick={() => onChange('corporate')}
                className={cn(
                    "flex-1 px-6 py-4 text-sm font-medium transition-colors text-center relative",
                    activeTab === 'corporate'
                        ? "text-primary-600 bg-primary-50/50"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
            >
                Corporate Billing
                {activeTab === 'corporate' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
                )}
            </button>
            <button
                onClick={() => onChange('event')}
                className={cn(
                    "flex-1 px-6 py-4 text-sm font-medium transition-colors text-center relative",
                    activeTab === 'event'
                        ? "text-primary-600 bg-primary-50/50"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
            >
                Event Billing
                {activeTab === 'event' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600" />
                )}
            </button>
        </div>
    );
};

export default BillingTabs;
