
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Calendar, User, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: number;
  retailerName: string;
  retailerId: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  taskType: string;
  description: string;
}

interface AssignedTasksProps {
  tasks: Task[];
}

const AssignedTasks = ({ tasks }: AssignedTasksProps) => {
  const [taskList, setTaskList] = useState(tasks);

  const completedTasks = taskList.filter(task => task.status === 'Completed');
  const uncompletedTasks = taskList.filter(task => task.status !== 'Completed');

  const markAsCompleted = (taskId: number) => {
    setTaskList(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: 'Completed' as const } : task
      )
    );
  };

  const markAsCalled = (taskId: number) => {
    setTaskList(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: 'In Progress' as const } : task
      )
    );
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "Pending": return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const TaskCard = ({ task, showActions = true }: { task: Task; showActions?: boolean }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-3">
          {getStatusIcon(task.status)}
          <h3 className="font-medium text-gray-900">{task.retailerName}</h3>
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>
          <Badge variant="outline">
            {task.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>ID: {task.retailerId}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {task.dueDate}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 font-medium">{task.taskType}</p>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      {showActions && task.status !== 'Completed' && (
        <div className="flex space-x-2 ml-4">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => markAsCalled(task.id)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
          <Button 
            size="sm"
            onClick={() => markAsCompleted(task.id)}
          >
            Mark Complete
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <AlertCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskList.length}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uncompletedTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
          <CardDescription>Tasks assigned to you by your supervisor</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="uncompleted" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="uncompleted" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Uncompleted ({uncompletedTasks.length})</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Completed Today ({completedTasks.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="uncompleted">
              <div className="space-y-4">
                {uncompletedTasks.length > 0 ? (
                  uncompletedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">All Tasks Completed!</h3>
                    <p className="text-gray-600">Great job! You've completed all your assigned tasks for today.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {completedTasks.length > 0 ? (
                  completedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} showActions={false} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Completed Tasks Yet</h3>
                    <p className="text-gray-600">Complete your assigned tasks to see them here.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignedTasks;
