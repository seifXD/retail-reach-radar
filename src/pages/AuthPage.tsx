
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        const { error } = await signUp(agentId, password, fullName);
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created",
            description: "Your account has been created successfully. You can now sign in.",
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(agentId, password);
        if (error) {
          toast({
            title: "Sign In Failed",
            description: "Invalid Agent ID or password",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Phone className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {isSignUp ? 'Create Agent Account' : 'Agent Sign In'}
          </CardTitle>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Create your Agent account to access Retail Reach Radar'
              : 'Enter your Agent ID to access Retail Reach Radar'
            }
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="agentId">Agent ID</Label>
              <Input
                id="agentId"
                type="text"
                placeholder="Enter your Agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  {isSignUp ? (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isSignUp 
                ? 'Already have an account? Sign In'
                : 'Need an account? Sign Up'
              }
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact your supervisor or IT support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
