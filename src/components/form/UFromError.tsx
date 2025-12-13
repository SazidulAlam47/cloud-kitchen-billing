interface UFromErrorProps {
    error?: {
        message?: string;
    };
}

const UFromError = ({ error }: UFromErrorProps) => {
    if (!error?.message) return null;
    return <small className="text-red-500 block mt-1">{error.message}</small>;
};

export default UFromError;
