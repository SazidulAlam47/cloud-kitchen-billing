interface UFormErrorProps {
    error?: {
        message?: string;
    };
}

const UFormError = ({ error }: UFormErrorProps) => {
    if (!error?.message) return null;
    return <small className="text-red-500 block mt-1">{error.message}</small>;
};

export default UFormError;
