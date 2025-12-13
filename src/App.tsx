import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { CreateCorporate } from './pages/corporate/CreateCorporate';
import { EditCorporate } from './pages/corporate/EditCorporate';
import { CreateEvent } from './pages/event/CreateEvent';
import { EditEvent } from './pages/event/EditEvent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="corporate/create" element={<CreateCorporate />} />
        <Route path="corporate/edit/:id" element={<EditCorporate />} />
        <Route path="event/create" element={<CreateEvent />} />
        <Route path="event/edit/:id" element={<EditEvent />} />
        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
