
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Task, RetailerDetails } from "@/types/tasks";
import TaskCard from "./TaskCard";
import RetailerDetailsDialog from "./RetailerDetailsDialog";
import TaskCompletionDialog from "./TaskCompletionDialog";

interface AssignedTasksProps {
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

const AssignedTasks = ({ tasks, onTasksUpdate }: AssignedTasksProps) => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<RetailerDetails | null>(null);
  const [isRetailerDialogOpen, setIsRetailerDialogOpen] = useState(false);

  // Mock retailer details - in real app this would come from database
  const getRetailerDetails = (retailerId: string): RetailerDetails => {
    const mockDetails: Record<string, RetailerDetails> = {
      "RT001": {
        id: "RT001",
        name: "Michael Thompson",
        target: 10000,
        progress: 7500,
        lastRecharge: "2023-12-10",
        rechargeMethod: "Instant",
        creditScore: 85,
        accountStatus: "Active",
        cashInMode: "Enabled",
        deviceModel: "POS",
        walletStatus: "Active"
      },
      "RT002": {
        id: "RT002",
        name: "Sarah Rodriguez",
        target: 8000,
        progress: 3200,
        lastRecharge: "2023-12-08",
        rechargeMethod: "Normal",
        creditScore: 72,
        accountStatus: "Active",
        cashInMode: "Disabled",
        deviceModel: "App",
        walletStatus: "Active"
      },
      "RT003": {
        id: "RT003",
        name: "David Chen",
        target: 12000,
        progress: 9600,
        lastRecharge: "2023-12-12",
        rechargeMethod: "Instant Plus",
        creditScore: 91,
        accountStatus: "Active",
        cashInMode: "Enabled",
        deviceModel: "POS",
        walletStatus: "Active"
      }
    };
    
    return mockDetails[retailerId] || {
      id: retailerId,
      name: "Unknown Retailer",
      target: 5000,
      progress: 2000,
      lastRecharge: "2023-12-01",
      rechargeMethod: "Normal",
      creditScore: 60,
      accountStatus: "Active",
      cashInMode: "Enabled",
      deviceModel: "App",
      walletStatus: "Active"
    };
  };

  const handleRetailerClick = (retailerId: string) => {
    const details = getRetailerDetails(retailerId);
    setSelectedRetailer(details);
    setIsRetailerDialogOpen(true);
  };

  const completedTasks = tasks.filter(task => task.status === 'Completed');
  const uncompletedTasks = tasks.filter(task => task.status !== 'Completed');

  const handleCompleteWithComment = (taskId: number, outcome: string) => {
    setSelectedTask(taskId);
    setSelectedOutcome(outcome);
    setIsDialogOpen(true);
  };

  const confirmCompletion = (comment: string) => {
    if (selectedTask && selectedOutcome) {
      const updatedTasks = tasks.map(task => 
        task.id === selectedTask 
          ? { ...task, status: 'Completed' as const, outcome: selectedOutcome, comment: comment.trim() || undefined, progress: 100 } 
          : task
      );
      onTasksUpdate(updatedTasks);
      setIsDialogOpen(false);
      setSelectedTask(null);
      setSelectedOutcome("");
    }
  };

  const markAsCalled = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        // Increase progress by 25% when marking as called, or set to 50% if it was 0
        const newProgress = task.progress ? Math.min(task.progress + 25, 90) : 50;
        return { ...task, status: 'In Progress' as const, progress: newProgress };
      }
      return task;
    });
    onTasksUpdate(updatedTasks);
  };

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
            <div className="text-2xl font-bold">{tasks.length}</div>
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
                    <TaskCard 
                      key={task.id} 
                      task={task}
                      onRetailerClick={handleRetailerClick}
                      onMarkAsCalled={markAsCalled}
                      onMarkComplete={handleCompleteWithComment}
                    />
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
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      showActions={false} 
                      showStatusBadge={false}
                      onRetailerClick={handleRetailerClick}
                      onMarkAsCalled={markAsCalled}
                      onMarkComplete={handleCompleteWithComment}
                    />
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

      {/* Task Completion Dialog */}
      <TaskCompletionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedOutcome={selectedOutcome}
        onConfirm={confirmCompletion}
      />

      {/* Retailer Details Dialog */}
      <RetailerDetailsDialog
        isOpen={isRetailerDialogOpen}
        onOpenChange={setIsRetailerDialogOpen}
        retailer={selectedRetailer}
      />
    </div>
  );
};

export default AssignedTasks;
