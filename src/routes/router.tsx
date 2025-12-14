import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import CreateCorporate from '../pages/corporate/CreateCorporate';
import EditCorporate from '../pages/corporate/EditCorporate';
import CreateEvent from '../pages/event/CreateEvent';
import EditEvent from '../pages/event/EditEvent';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'corporate',
                children: [
                    {
                        path: 'create',
                        element: <CreateCorporate />,
                    },
                    {
                        path: 'edit/:id',
                        element: <EditCorporate />,
                    },
                ]
            },
            {
                path: 'event',
                children: [
                    {
                        path: 'create',
                        element: <CreateEvent />,
                    },
                    {
                        path: 'edit/:id',
                        element: <EditEvent />,
                    },
                ]
            },
        ],
    },
]);

export default router;
