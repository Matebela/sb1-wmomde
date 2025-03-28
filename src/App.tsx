import React from 'react';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Toaster position="top-right" />
      {!user ? <LoginForm /> : <Dashboard />}
    </>
  );
}

export default App;