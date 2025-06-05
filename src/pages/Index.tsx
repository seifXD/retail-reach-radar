
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, Target, TrendingUp, Calendar, Settings } from "lucide-react";
import AgentDashboard from "@/components/AgentDashboard";
import SupervisorDashboard from "@/components/SupervisorDashboard";
import RetailerProfiles from "@/components/RetailerProfiles";
import TaskManagement from "@/components/TaskManagement";

const Index = () => {
  const [userRole, setUserRole] = useState<'agent' | 'supervisor'>('agent');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/auth'}
                className="text-sm"
              >
                Agent Sign In
              </Button>
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="retailers" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Retailers</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Log</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {userRole === 'agent' ? <AgentDashboard /> : <SupervisorDashboard />}
          </TabsContent>

          <TabsContent value="retailers">
            <RetailerProfiles userRole={userRole} />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement userRole={userRole} />
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
                <CardDescription>Recent calls and outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((call) => (
                    <div key={call} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Phone className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Retailer #{call}23</p>
                          <p className="text-sm text-gray-500">Called 2 hours ago</p>
                        </div>
                      </div>
                      <Badge variant={call % 3 === 0 ? "default" : call % 2 === 0 ? "secondary" : "outline"}>
                        {call % 3 === 0 ? "Interested" : call % 2 === 0 ? "Follow-up" : "No Answer"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
