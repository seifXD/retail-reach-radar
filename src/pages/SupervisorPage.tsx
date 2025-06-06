
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, Target, TrendingUp } from "lucide-react";
import SupervisorDashboard from "@/components/SupervisorDashboard";
import RetailerProfiles from "@/components/RetailerProfiles";
import TaskManagement from "@/components/TaskManagement";
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
            <TabsTrigger value="calls" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Log</span>
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

export default SupervisorPage;
