import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../services/firebase';

const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-4xl animate-spin text-secondary">progress_activity</span>
      </div>
    );
  }

  if (user) {
    // Si el usuario ya está autenticado, lo redirigimos al perfil (o al inicio)
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;
