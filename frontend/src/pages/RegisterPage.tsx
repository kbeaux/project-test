import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuth } from '@/lib/auth';

export function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <RegisterForm />
    </div>
  );
}