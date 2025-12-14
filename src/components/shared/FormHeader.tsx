import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '../ui/Button';

interface FormHeaderProps {
    title: string;
    onCancel: () => void;
    isSaveDisabled?: boolean;
}

const FormHeader = ({ title, onCancel, isSaveDisabled }: FormHeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button type="button" variant="secondary" onClick={onCancel} size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {title}
                </h1>
            </div>
            <Button type="submit" disabled={isSaveDisabled} className="shadow-lg hover:shadow-xl">
                <Save className="w-4 h-4 mr-2" />
                Save Bill
            </Button>
        </div>
    );
};

export default FormHeader;
