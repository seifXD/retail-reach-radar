
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, Calendar, Target, AlertCircle } from "lucide-react";

interface TaskManagementProps {
  userRole: 'agent' | 'supervisor';
}

const TaskManagement = ({ userRole }: TaskManagementProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string>('all');

  const agents = [
    { id: 'sarah', name: 'Sarah Johnson' },
    { id: 'mike', name: 'Mike Chen' },
    { id: 'emma', name: 'Emma Davis' },
    { id: 'james', name: 'James Wilson' },
    { id: 'lisa', name: 'Lisa Rodriguez' },
    { id: 'tom', name: 'Tom Anderson' }
  ];

  const tasks = [
    {
      id: 1,
      title: "Contact Premium Electronics Store",
      description: "Follow up on product line interest. Prepare proposal.",
      assignedTo: "Sarah Johnson",
      priority: "High",
      dueDate: "2023-12-16",
      status: "In Progress",
      retailer: "Premium Electronics Store"
    },
    {
      id: 2,
      title: "Credit review for City Hardware",
      description: "Review payment history and adjust credit terms if needed.",
      assignedTo: "Mike Chen",
      priority: "Medium",
      dueDate: "2023-12-17",
      status: "Pending",
      retailer: "City Hardware Depot"
    },
    {
      id: 3,
      title: "Large order processing",
      description: "Process and confirm large furniture order. Verify inventory.",
      assignedTo: "Emma Davis",
      priority: "High",
      dueDate: "2023-12-15",
      status: "Completed",
      retailer: "Downtown Furniture Co."
    },
    {
      id: 4,
      title: "Seasonal catalog distribution",
      description: "Send spring catalog to interested retailers.",
      assignedTo: "Lisa Rodriguez",
      priority: "Low",
      dueDate: "2023-12-20",
      status: "Pending",
      retailer: "Multiple"
    }
  ];

  const filteredTasks = selectedAgent === 'all' 
    ? tasks 
    : tasks.filter(task => task.assignedTo.toLowerCase().includes(selectedAgent));

  return (
    <div className="space-y-6">
      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'In Progress').length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'Completed').length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Task Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>
              {userRole === 'supervisor' ? 'Assign and monitor tasks for your team' : 'Your assigned tasks and progress'}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            {userRole === 'supervisor' && (
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  {agents.map(agent => (
                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {userRole === 'supervisor' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Task Title</label>
                      <Input placeholder="Enter task title..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Enter task description..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Assign to</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select agent" />
                          </SelectTrigger>
                          <SelectContent>
                            {agents.map(agent => (
                              <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input type="date" />
                    </div>
                    <Button className="w-full">Create Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                      {task.priority}
                    </Badge>
                    <Badge variant={task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                    <span>Retailer: {task.retailer}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {userRole === 'agent' && task.status !== 'Completed' && (
                    <Button size="sm" variant="outline">
                      Mark Complete
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManagement;
