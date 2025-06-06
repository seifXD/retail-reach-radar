
import { useAuth } from '@/contexts/AuthContext';
import AuthPage from '@/pages/AuthPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  // Temporarily bypass authentication - remove this when you have credentials
  const BYPASS_AUTH = true;

  if (loading && !BYPASS_AUTH) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !BYPASS_AUTH) {
    return <AuthPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
