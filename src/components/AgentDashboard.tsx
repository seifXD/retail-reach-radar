
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Phone, Target, Clock, TrendingUp, Users } from "lucide-react";

const AgentDashboard = () => {
  const todayStats = {
    callsToday: 23,
    successfulCalls: 8,
    tasksCompleted: 5,
    totalTasks: 12
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  const tasks = [
    {
      name: "POS acquisition",
      priority: "High",
      retailersCount: 15,
      completedCalls: 3,
      description: "Contact retailers for new POS device acquisition",
      deadline: "Today"
    },
    {
      name: "Etisalat cash",
      priority: "Medium",
      retailersCount: 8,
      completedCalls: 2,
      description: "Follow up on Etisalat cash service integration",
      deadline: "Tomorrow"
    },
    {
      name: "POS follow up",
      priority: "High",
      retailersCount: 12,
      completedCalls: 5,
      description: "Follow up with existing POS users for support",
      deadline: "Today"
    },
    {
      name: "App retention",
      priority: "Low",
      retailersCount: 6,
      completedCalls: 1,
      description: "Re-engage retailers who stopped using the app",
      deadline: "This week"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <Phone className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.callsToday}</div>
            <p className="text-xs text-blue-100">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Calls</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.successfulCalls}</div>
            <p className="text-xs text-green-100">
              35% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Progress</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayStats.tasksCompleted}/{todayStats.totalTasks}</div>
            <Progress value={(todayStats.tasksCompleted / todayStats.totalTasks) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Call Time</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:32</div>
            <p className="text-xs text-purple-100">
              -15s from average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Assigned Tasks</CardTitle>
          <CardDescription>Tasks you need to complete today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{task.name}</h3>
                    <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{task.retailersCount} retailers</span>
                    </span>
                    <span>Progress: {task.completedCalls}/{task.retailersCount} calls</span>
                    <span>Due: {task.deadline}</span>
                  </div>
                  <p className="text-sm text-gray-700">{task.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(task.completedCalls / task.retailersCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <Button size="sm" className="ml-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Task
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentDashboard;
