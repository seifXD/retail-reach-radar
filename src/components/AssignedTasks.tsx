
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Clock, Target, MessageSquare } from "lucide-react";

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

interface AssignedTasksProps {
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

const AssignedTasks: React.FC<AssignedTasksProps> = ({ tasks, onTasksUpdate }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleStartTask = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: "In Progress" as const } : task
    );
    onTasksUpdate(updatedTasks);
  };

  const handleCompleteTask = () => {
    if (selectedTaskId === null) return;
    
    const updatedTasks = tasks.map(task =>
      task.id === selectedTaskId 
        ? { ...task, status: "Completed" as const, outcome: comment }
        : task
    );
    onTasksUpdate(updatedTasks);
    setComment("");
    setSelectedTaskId(null);
    setIsDialogOpen(false);
  };

  const openCompleteDialog = (taskId: number) => {
    setSelectedTaskId(taskId);
    setIsDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "default";
      case "Low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Assigned Tasks</span>
          </CardTitle>
          <CardDescription>
            Complete your assigned tasks to unlock Target Quest
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{task.retailerName}</h3>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Retailer ID:</span>
                        <span>{task.retailerId}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Type:</span>
                        <span>{task.taskType}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{task.description}</p>
                    
                    {task.outcome && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Call Outcome:</span>
                        </div>
                        <p className="text-sm text-green-700">{task.outcome}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    {task.status === "Pending" && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStartTask(task.id)}
                        className="whitespace-nowrap"
                      >
                        Start Task
                      </Button>
                    )}
                    
                    {task.status === "In Progress" && (
                      <>
                        <Button size="sm" variant="outline" className="whitespace-nowrap">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                        
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="default"
                              onClick={() => openCompleteDialog(task.id)}
                              className="whitespace-nowrap"
                            >
                              Complete
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Complete Task</DialogTitle>
                              <DialogDescription>
                                Add a comment about your call with {tasks.find(t => t.id === selectedTaskId)?.retailerName} before marking this task as complete.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <label htmlFor="comment" className="text-sm font-medium">
                                  Call Outcome / Comments
                                </label>
                                <Textarea
                                  id="comment"
                                  placeholder="Describe the outcome of your call, any agreements made, follow-up actions needed, etc."
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  className="min-h-[100px]"
                                />
                              </div>
                            </div>
                            
                            <DialogFooter>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => {
                                  setIsDialogOpen(false);
                                  setComment("");
                                  setSelectedTaskId(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                type="button" 
                                onClick={handleCompleteTask}
                                disabled={!comment.trim()}
                              >
                                Complete Task
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    
                    {task.status === "Completed" && (
                      <div className="text-sm text-green-600 font-medium">
                        ✓ Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignedTasks;
