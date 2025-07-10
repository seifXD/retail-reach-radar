
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, TrendingUp, Settings } from "lucide-react";
import SupervisorDashboard from "@/components/SupervisorDashboard";
import RetailerProfiles from "@/components/RetailerProfiles";
import TaskManagement from "@/components/TaskManagement";
import SuperUserPanel from "@/components/SuperUserPanel";
import Header from "@/components/Header";

const SupervisorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header userRole="supervisor" setUserRole={() => {}} />

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
            <TabsTrigger value="superuser" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Super User</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <SupervisorDashboard />
          </TabsContent>

          <TabsContent value="retailers">
            <RetailerProfiles userRole="supervisor" />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement userRole="supervisor" />
          </TabsContent>

          <TabsContent value="superuser">
            <SuperUserPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SupervisorPage;
