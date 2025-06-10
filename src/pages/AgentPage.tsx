
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Phone, Target, TrendingUp, Lock, Crosshair } from "lucide-react";
import AgentDashboard from "@/components/AgentDashboard";
import AssignedTasks from "@/components/AssignedTasks";
import GoalOrientedCalling from "@/components/GoalOrientedCalling";
import Header from "@/components/Header";

interface Task {
  id: number;
  retailerName: string;
  retailerId: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  taskType: string;
  description: string;
  outcome?: string;
}

const AgentPage = () => {
  // Mock data for assigned tasks - in real app this would come from database
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([
    {
      id: 1,
      retailerName: "Michael Thompson",
      retailerId: "RT001",
      priority: "High" as const,
      dueDate: "2023-12-16",
      status: "In Progress" as const,
      taskType: "Follow-up call",
      description: "Follow up on product line interest. Prepare proposal."
    },
    {
      id: 2,
      retailerName: "Sarah Rodriguez", 
      retailerId: "RT002",
      priority: "Medium" as const,
      dueDate: "2023-12-17",
      status: "Pending" as const,
      taskType: "Credit review",
      description: "Review payment history and adjust credit terms if needed."
    },
    {
      id: 3,
      retailerName: "David Chen",
      retailerId: "RT003", 
      priority: "High" as const,
      dueDate: "2023-12-15",
      status: "Completed" as const,
      taskType: "Order processing",
      description: "Process and confirm large furniture order. Verify inventory."
    }
  ]);

  const uncompletedTasks = assignedTasks.filter(task => task.status !== 'Completed');
  const hasUncompletedTasks = uncompletedTasks.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header userRole="agent" setUserRole={() => {}} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="assigned-tasks" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Assigned Tasks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="goal-calling" 
              className="flex items-center space-x-2"
              disabled={hasUncompletedTasks}
            >
              {hasUncompletedTasks && <Lock className="h-4 w-4" />}
              <Crosshair className="h-4 w-4" />
              <span>Target Quest</span>
            </TabsTrigger>
            <TabsTrigger value="call-history" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AgentDashboard />
          </TabsContent>

          <TabsContent value="assigned-tasks">
            <AssignedTasks tasks={assignedTasks} onTasksUpdate={setAssignedTasks} />
          </TabsContent>

          <TabsContent value="goal-calling">
            {hasUncompletedTasks ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Assigned Tasks First</h3>
                  <p className="text-gray-600">
                    You have {uncompletedTasks.length} uncompleted assigned task(s). 
                    Please complete them before accessing Target Quest.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <GoalOrientedCalling />
            )}
          </TabsContent>

          <TabsContent value="call-history">
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

export default AgentPage;
