import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const ErrorPage = () => {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message || 'Page Not Found';
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'Unknown error';
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 text-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-col items-center space-y-3">
                    <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
                        <p className="mt-2 text-lg text-gray-600">
                            {errorMessage}
                        </p>
                    </div>
                </div>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Link to="/">
                        <Button className="min-w-[200px] shadow-lg hover:shadow-xl transition-all">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
