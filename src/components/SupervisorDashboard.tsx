import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, Phone, Target, TrendingUp, Award, AlertCircle, Clock, Calendar } from "lucide-react";
import { useState } from "react";

const SupervisorDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const teamStats = {
    totalAgents: 8,
    activeAgents: 6,
    todayCalls: 156,
    successRate: 42
  };

  const agents = [
    { 
      id: 1,
      name: "Sarah Johnson", 
      calls: 28, 
      success: 12, 
      tasks: 8, 
      performance: 85, 
      status: "active",
      lastLogin: "2024-01-15 09:30:00",
      loginDuration: "4h 30m",
      location: "New York, NY"
    },
    { 
      id: 2,
      name: "Mike Chen", 
      calls: 22, 
      success: 9, 
      tasks: 6, 
      performance: 78, 
      status: "active",
      lastLogin: "2024-01-15 08:45:00",
      loginDuration: "5h 15m",
      location: "Los Angeles, CA"
    },
    { 
      id: 3,
      name: "Emma Davis", 
      calls: 31, 
      success: 15, 
      tasks: 10, 
      performance: 92, 
      status: "active",
      lastLogin: "2024-01-15 09:00:00",
      loginDuration: "5h 00m",
      location: "Chicago, IL"
    },
    { 
      id: 4,
      name: "James Wilson", 
      calls: 19, 
      success: 7, 
      tasks: 5, 
      performance: 68, 
      status: "inactive",
      lastLogin: "2024-01-14 16:20:00",
      loginDuration: "0m",
      location: "Houston, TX"
    },
    { 
      id: 5,
      name: "Lisa Rodriguez", 
      calls: 25, 
      success: 11, 
      tasks: 7, 
      performance: 81, 
      status: "active",
      lastLogin: "2024-01-15 10:15:00",
      loginDuration: "3h 45m",
      location: "Phoenix, AZ"
    },
    { 
      id: 6,
      name: "Tom Anderson", 
      calls: 31, 
      success: 14, 
      tasks: 9, 
      performance: 88, 
      status: "active",
      lastLogin: "2024-01-15 08:30:00",
      loginDuration: "5h 30m",
      location: "Philadelphia, PA"
    },
    { 
      id: 7,
      name: "Maria Garcia", 
      calls: 0, 
      success: 0, 
      tasks: 0, 
      performance: 0, 
      status: "inactive",
      lastLogin: "2024-01-13 14:45:00",
      loginDuration: "0m",
      location: "San Antonio, TX"
    },
    { 
      id: 8,
      name: "David Kim", 
      calls: 15, 
      success: 6, 
      tasks: 4, 
      performance: 72, 
      status: "inactive",
      lastLogin: "2024-01-14 11:30:00",
      loginDuration: "0m",
      location: "San Diego, CA"
    }
  ];

  const activeAgents = agents.filter(agent => agent.status === "active");
  const inactiveAgents = agents.filter(agent => agent.status === "inactive");

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
  };

  const closeAgentDetails = () => {
    setSelectedAgent(null);
  };

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
            <CardDescription>Real-time performance metrics for your team (Click on any agent for details)</CardDescription>
          </div>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Assign Tasks
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Active Agents Section */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Active Agents ({activeAgents.length})
              </h3>
              <div className="space-y-3">
                {activeAgents.map((agent) => (
                  <div 
                    key={agent.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-l-4 border-green-500"
                    onClick={() => handleAgentClick(agent)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{agent.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Calls: {agent.calls}</span>
                          <span>Success: {agent.success}</span>
                          <span>Tasks: {agent.tasks}</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {agent.loginDuration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="default" className="bg-green-500">Online</Badge>
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
            </div>

            {/* Inactive Agents Section */}
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Inactive Agents ({inactiveAgents.length})
              </h3>
              <div className="space-y-3">
                {inactiveAgents.map((agent) => (
                  <div 
                    key={agent.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border-l-4 border-red-500 opacity-75"
                    onClick={() => handleAgentClick(agent)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{agent.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Calls: {agent.calls}</span>
                          <span>Success: {agent.success}</span>
                          <span>Tasks: {agent.tasks}</span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Last seen: {new Date(agent.lastLogin).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="destructive">Offline</Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{agent.performance}%</div>
                        <Progress value={agent.performance} className="w-24 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Details Modal/Card */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{selectedAgent.name}</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={closeAgentDetails}>
                  ×
                </Button>
              </div>
              <CardDescription>Agent Details & Statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant={selectedAgent.status === "active" ? "default" : "destructive"}>
                  {selectedAgent.status === "active" ? "Online" : "Offline"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Last Login:</span>
                <span className="text-sm text-gray-600">
                  {new Date(selectedAgent.lastLogin).toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Session Duration:</span>
                <span className="text-sm text-gray-600">{selectedAgent.loginDuration}</span>
              </div>
              
              <div className="space-y-2">
                <span className="font-medium">Performance:</span>
                <div className="flex items-center space-x-2">
                  <Progress value={selectedAgent.performance} className="flex-1" />
                  <span className="text-sm font-medium">{selectedAgent.performance}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{selectedAgent.calls}</div>
                  <div className="text-xs text-gray-500">Calls Today</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{selectedAgent.success}</div>
                  <div className="text-xs text-gray-500">Successful</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{selectedAgent.tasks}</div>
                  <div className="text-xs text-gray-500">Tasks</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SupervisorDashboard;
