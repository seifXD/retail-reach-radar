
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Phone, Calendar, User, CheckCircle, Clock, AlertCircle, ChevronDown } from "lucide-react";
import { Task } from "@/types/tasks";
import CircularProgress from "./CircularProgress";

interface TaskCardProps {
  task: Task;
  showActions?: boolean;
  showStatusBadge?: boolean;
  onRetailerClick: (retailerId: string) => void;
  onMarkAsCalled: (taskId: number) => void;
  onMarkComplete: (taskId: number, outcome: string) => void;
}

const TaskCard = ({ 
  task, 
  showActions = true, 
  showStatusBadge = true,
  onRetailerClick,
  onMarkAsCalled,
  onMarkComplete
}: TaskCardProps) => {
  const taskProgress = task.progress || (task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 30 : 0);

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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-3">
          {getStatusIcon(task.status)}
          <button
            onClick={() => onRetailerClick(task.retailerId)}
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
              onClick={() => onMarkAsCalled(task.id)}
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
                <DropdownMenuItem onClick={() => onMarkComplete(task.id, 'Reachable')}>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Reachable
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMarkComplete(task.id, 'Unreachable')}>
                  <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                  Unreachable
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onMarkComplete(task.id, 'Not Interested')}>
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

export default TaskCard;
