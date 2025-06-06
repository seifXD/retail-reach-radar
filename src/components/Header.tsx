
import { Button } from "@/components/ui/button";
import { Phone, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  userRole: 'agent' | 'supervisor';
  setUserRole: (role: 'agent' | 'supervisor') => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Retail Reach Radar</h1>
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
                    onClick={() => setUserRole('agent')}
                    className="text-sm"
                  >
                    Agent View
                  </Button>
                  <Button
                    variant={userRole === 'supervisor' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setUserRole('supervisor')}
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
