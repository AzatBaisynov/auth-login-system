import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { UsersPage } from '@/pages/UsersPage';
import { EventLogPage } from '@/pages/EventLogPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/logs" element={<EventLogPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
