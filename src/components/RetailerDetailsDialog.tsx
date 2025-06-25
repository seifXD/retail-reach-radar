
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Target, CreditCard, Smartphone, Wallet } from "lucide-react";
import { RetailerDetails } from "@/types/tasks";

interface RetailerDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  retailer: RetailerDetails | null;
}

const RetailerDetailsDialog = ({ isOpen, onOpenChange, retailer }: RetailerDetailsDialogProps) => {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Suspended": return "destructive";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{retailer?.name} Details</span>
          </DialogTitle>
          <DialogDescription>
            Retailer ID: {retailer?.id}
          </DialogDescription>
        </DialogHeader>
        
        {retailer && (
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
                  <span className="text-lg font-bold">${retailer.target.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Progress:</span>
                  <span className="text-lg font-bold text-blue-600">${retailer.progress.toLocaleString()}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((retailer.progress / retailer.target) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(retailer.progress / retailer.target) * 100}%` }}
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
                  <p className="text-lg">{retailer.lastRecharge}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Recharge Method</label>
                  <p className="text-lg">{retailer.rechargeMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Credit Score</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">{retailer.creditScore}</span>
                    <Badge variant={retailer.creditScore >= 80 ? "default" : retailer.creditScore >= 60 ? "secondary" : "destructive"}>
                      {retailer.creditScore >= 80 ? "Excellent" : retailer.creditScore >= 60 ? "Good" : "Poor"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Cash-in Mode</label>
                  <div className="flex items-center space-x-2">
                    <Badge variant={retailer.cashInMode === "Enabled" ? "default" : "secondary"}>
                      {retailer.cashInMode}
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
                    <Badge variant={getStatusBadgeVariant(retailer.accountStatus)}>
                      {retailer.accountStatus}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Device Model</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {retailer.deviceModel === "POS" ? (
                      <CreditCard className="h-4 w-4" />
                    ) : (
                      <Smartphone className="h-4 w-4" />
                    )}
                    <span className="text-lg font-medium">{retailer.deviceModel}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Wallet Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Wallet className="h-4 w-4" />
                    <Badge variant={getStatusBadgeVariant(retailer.walletStatus)}>
                      {retailer.walletStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RetailerDetailsDialog;
