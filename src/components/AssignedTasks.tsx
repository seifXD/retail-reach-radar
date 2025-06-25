import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Calendar, User, CheckCircle, Clock, AlertCircle, ChevronDown, Target, CreditCard, Smartphone, Wallet, Battery } from "lucide-react";
import { useState } from "react";

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
  comment?: string;
  progress?: number; // Progress percentage (0-100)
}

interface RetailerDetails {
  id: string;
  name: string;
  target: number;
  progress: number;
  lastRecharge: string;
  rechargeMethod: string;
  creditScore: number;
  accountStatus: "Active" | "Inactive" | "Suspended";
  cashInMode: "Enabled" | "Disabled";
  deviceModel: "POS" | "App";
  walletStatus: "Active" | "Inactive" | "Pending";
}

interface AssignedTasksProps {
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

const AssignedTasks = ({ tasks, onTasksUpdate }: AssignedTasksProps) => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [comment, setComment] = useState("");
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
    setComment("");
    setIsDialogOpen(true);
  };

  const confirmCompletion = () => {
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
      setComment("");
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

  const getOutcomeStyles = (outcome: string) => {
    switch (outcome) {
      case "Reachable": 
        return "bg-green-500 text-white hover:bg-green-600 border-green-500 px-2.5 py-0.5 text-xs font-semibold";
      case "Unreachable": 
        return "bg-red-500 text-white hover:bg-red-600 border-red-500 px-2.5 py-0.5 text-xs font-semibold";
      case "Not Interested": 
        return "bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500 px-2.5 py-0.5 text-xs font-semibold";
      default: 
        return "bg-gray-500 text-white hover:bg-gray-600 border-gray-500 px-2.5 py-0.5 text-xs font-semibold";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Suspended": return "destructive";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const CircularProgress = ({ value, size = 60 }: { value: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-blue-600 transition-all duration-300 ease-in-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">{Math.round(value)}%</span>
        </div>
      </div>
    );
  };

  const TaskCard = ({ task, showActions = true, showStatusBadge = true }: { task: Task; showActions?: boolean; showStatusBadge?: boolean }) => {
    const taskProgress = task.progress || (task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 30 : 0);
    
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-3">
            {getStatusIcon(task.status)}
            <button
              onClick={() => handleRetailerClick(task.retailerId)}
              className="font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
            >
              {task.retailerName}
            </button>
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
            {showStatusBadge && (
              <Badge variant="outline">
                {task.status}
              </Badge>
            )}
            {task.outcome && (
              <div className={`inline-flex items-center rounded-full border ${getOutcomeStyles(task.outcome)}`}>
                {task.outcome}
              </div>
            )}
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
          
          {task.comment && (
            <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <p className="text-sm text-gray-700"><strong>Comment:</strong> {task.comment}</p>
            </div>
          )}
        </div>
        
        {/* Progress Circle */}
        <div className="flex items-center space-x-4 ml-4">
          <div className="flex flex-col items-center space-y-1">
            <CircularProgress value={taskProgress} size={50} />
            <span className="text-xs text-gray-500 font-medium">Progress</span>
          </div>
          
          {showActions && task.status !== 'Completed' && (
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => markAsCalled(task.id)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">
                    Mark Complete
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => handleCompleteWithComment(task.id, 'Reachable')}>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Reachable
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCompleteWithComment(task.id, 'Unreachable')}>
                    <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                    Unreachable
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCompleteWithComment(task.id, 'Not Interested')}>
                    <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                    Not Interested
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    );
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
                    <TaskCard key={task.id} task={task} showActions={false} showStatusBadge={false} />
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

      {/* Comment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Call Comment</DialogTitle>
            <DialogDescription>
              Please add a comment about your call before marking this task as {selectedOutcome?.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">
                Call Notes (Optional)
              </label>
              <Textarea
                id="comment"
                placeholder="Add any notes about the call..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmCompletion}>
              Mark as {selectedOutcome}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Retailer Details Dialog */}
      <Dialog open={isRetailerDialogOpen} onOpenChange={setIsRetailerDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{selectedRetailer?.name} Details</span>
            </DialogTitle>
            <DialogDescription>
              Retailer ID: {selectedRetailer?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRetailer && (
            <div className="space-y-6">
              {/* Target & Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Target className="h-5 w-5" />
                    <span>Target & Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Target:</span>
                    <span className="text-lg font-bold">${selectedRetailer.target.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Current Progress:</span>
                    <span className="text-lg font-bold text-blue-600">${selectedRetailer.progress.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round((selectedRetailer.progress / selectedRetailer.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(selectedRetailer.progress / selectedRetailer.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <CreditCard className="h-5 w-5" />
                    <span>Financial Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Last Recharge</label>
                    <p className="text-lg">{selectedRetailer.lastRecharge}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Recharge Method</label>
                    <p className="text-lg">{selectedRetailer.rechargeMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Credit Score</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">{selectedRetailer.creditScore}</span>
                      <Badge variant={selectedRetailer.creditScore >= 80 ? "default" : selectedRetailer.creditScore >= 60 ? "secondary" : "destructive"}>
                        {selectedRetailer.creditScore >= 80 ? "Excellent" : selectedRetailer.creditScore >= 60 ? "Good" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Cash-in Mode</label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={selectedRetailer.cashInMode === "Enabled" ? "default" : "secondary"}>
                        {selectedRetailer.cashInMode}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account & Device Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Smartphone className="h-5 w-5" />
                    <span>Account & Device Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Account Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getStatusBadgeVariant(selectedRetailer.accountStatus)}>
                        {selectedRetailer.accountStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Device Model</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {selectedRetailer.deviceModel === "POS" ? (
                        <CreditCard className="h-4 w-4" />
                      ) : (
                        <Smartphone className="h-4 w-4" />
                      )}
                      <span className="text-lg font-medium">{selectedRetailer.deviceModel}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Wallet Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Wallet className="h-4 w-4" />
                      <Badge variant={getStatusBadgeVariant(selectedRetailer.walletStatus)}>
                        {selectedRetailer.walletStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignedTasks;
