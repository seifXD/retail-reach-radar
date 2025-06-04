
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Phone, Target, Clock, TrendingUp } from "lucide-react";

const AgentDashboard = () => {
  const todayStats = {
    callsToday: 23,
    successfulCalls: 8,
    tasksCompleted: 5,
    totalTasks: 12
  };

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
          <CardDescription>Retailers you need to contact today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Premium Electronics Store", priority: "High", credit: "$15,000", lastCall: "3 days ago", notes: "Interested in new product line" },
              { name: "City Hardware Depot", priority: "Medium", credit: "$8,500", lastCall: "1 week ago", notes: "Payment issues resolved" },
              { name: "Downtown Furniture Co.", priority: "High", credit: "$22,000", lastCall: "2 days ago", notes: "Ready to place large order" },
              { name: "Garden Center Plus", priority: "Low", credit: "$3,200", lastCall: "5 days ago", notes: "Seasonal buyer - follow up in spring" }
            ].map((retailer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{retailer.name}</h3>
                    <Badge variant={retailer.priority === "High" ? "destructive" : retailer.priority === "Medium" ? "default" : "secondary"}>
                      {retailer.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>Credit: {retailer.credit}</span>
                    <span>Last call: {retailer.lastCall}</span>
                  </div>
                  <p className="text-sm text-gray-700">{retailer.notes}</p>
                </div>
                <Button size="sm" className="ml-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
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
