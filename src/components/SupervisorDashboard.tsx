
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, Phone, Target, TrendingUp, Award, AlertCircle } from "lucide-react";

const SupervisorDashboard = () => {
  const teamStats = {
    totalAgents: 8,
    activeAgents: 6,
    todayCalls: 156,
    successRate: 42
  };

  const agents = [
    { name: "Sarah Johnson", calls: 28, success: 12, tasks: 8, performance: 85 },
    { name: "Mike Chen", calls: 22, success: 9, tasks: 6, performance: 78 },
    { name: "Emma Davis", calls: 31, success: 15, tasks: 10, performance: 92 },
    { name: "James Wilson", calls: 19, success: 7, tasks: 5, performance: 68 },
    { name: "Lisa Rodriguez", calls: 25, success: 11, tasks: 7, performance: 81 },
    { name: "Tom Anderson", calls: 31, success: 14, tasks: 9, performance: 88 }
  ];

  return (
    <div className="space-y-6">
      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.activeAgents}/{teamStats.totalAgents}</div>
            <p className="text-xs text-indigo-100">
              75% team utilization
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Calls Today</CardTitle>
            <Phone className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.todayCalls}</div>
            <p className="text-xs text-emerald-100">
              +18% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.successRate}%</div>
            <p className="text-xs text-cyan-100">
              +3% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-amber-100">
              Daily target achievement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Real-time performance metrics for your team</CardDescription>
          </div>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Assign Tasks
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Calls: {agent.calls}</span>
                      <span>Success: {agent.success}</span>
                      <span>Tasks: {agent.tasks}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{agent.performance}%</div>
                    <Progress value={agent.performance} className="w-24 h-2 mt-1" />
                  </div>
                  <Badge variant={agent.performance >= 85 ? "default" : agent.performance >= 70 ? "secondary" : "destructive"}>
                    {agent.performance >= 85 ? (
                      <Award className="h-3 w-3 mr-1" />
                    ) : agent.performance < 70 ? (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    ) : null}
                    {agent.performance >= 85 ? "Excellent" : agent.performance >= 70 ? "Good" : "Needs Attention"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorDashboard;
