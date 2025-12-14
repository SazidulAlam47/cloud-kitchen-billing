import { cn } from '../../utils/cn';

interface MobileOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {
    return (
        <div 
            className={cn(
                "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={onClose}
        />
    );
};

export default MobileOverlay;