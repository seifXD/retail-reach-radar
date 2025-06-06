
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  userRole: 'agent' | 'supervisor';
  setUserRole: (role: 'agent' | 'supervisor') => void;
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/112b426a-382f-426a-baed-c1b99f0ce5e8.png" 
              alt="Maxab Logo" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, {user.user_metadata?.full_name || user.user_metadata?.agent_id || 'Agent'}
                </span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={userRole === 'agent' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => navigate('/agent')}
                    className="text-sm"
                  >
                    Agent View
                  </Button>
                  <Button
                    variant={userRole === 'supervisor' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => navigate('/supervisor')}
                    className="text-sm"
                  >
                    Supervisor View
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="text-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
