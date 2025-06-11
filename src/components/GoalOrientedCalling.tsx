import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Phone, Target, TrendingUp, Filter, Zap, User, CreditCard, Smartphone, Wallet } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface Retailer {
  id: string;
  retailer_id: string;
  name: string;
  mobile?: string;
  solde?: number;
  last_call_date?: string;
  last_recharge_date?: string;
  project_name?: string;
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

const GoalOrientedCalling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('balance_desc');
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [rechargeGoal, setRechargeGoal] = useState(50000);
  const [currentProgress, setCurrentProgress] = useState(12500);
  const [selectedRetailer, setSelectedRetailer] = useState<RetailerDetails | null>(null);
  const [isRetailerDialogOpen, setIsRetailerDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleRetailerClick = (retailerId: string, retailerName: string) => {
    const details = getRetailerDetails(retailerId);
    // Update the name to match the actual retailer
    details.name = retailerName;
    setSelectedRetailer(details);
    setIsRetailerDialogOpen(true);
  };

  const fetchRetailers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('retailers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching retailers:', error);
        toast({
          title: "Error",
          description: "Failed to fetch retailers",
          variant: "destructive",
        });
        return;
      }

      setRetailers(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLastCallDate = async (retailerId: string) => {
    try {
      const { error } = await supabase
        .from('retailers')
        .update({ last_call_date: new Date().toISOString() })
        .eq('id', retailerId);

      if (error) {
        console.error('Error updating last call date:', error);
        toast({
          title: "Error",
          description: "Failed to update call date",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Call logged successfully",
      });

      fetchRetailers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Suspended": return "destructive";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const formatCurrency = (amount?: number) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const sortRetailers = (retailers: Retailer[]) => {
    const filtered = retailers.filter(retailer =>
      retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      retailer.retailer_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'balance_desc':
        return filtered.sort((a, b) => (b.solde || 0) - (a.solde || 0));
      case 'balance_asc':
        return filtered.sort((a, b) => (a.solde || 0) - (b.solde || 0));
      case 'last_call':
        return filtered.sort((a, b) => {
          const dateA = a.last_call_date ? new Date(a.last_call_date).getTime() : 0;
          const dateB = b.last_call_date ? new Date(b.last_call_date).getTime() : 0;
          return dateA - dateB;
        });
      case 'last_recharge':
        return filtered.sort((a, b) => {
          const dateA = a.last_recharge_date ? new Date(a.last_recharge_date).getTime() : 0;
          const dateB = b.last_recharge_date ? new Date(b.last_recharge_date).getTime() : 0;
          return dateA - dateB;
        });
      default:
        return filtered;
    }
  };

  const sortedRetailers = sortRetailers(retailers);
  const progressPercentage = (currentProgress / rechargeGoal) * 100;
  const remaining = rechargeGoal - currentProgress;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section with Goal Progress */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Target Quest</h2>
            </div>
            <p className="text-blue-100">Your mission: Reach {formatCurrency(rechargeGoal)} in recharges this month</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{formatCurrency(currentProgress)} / {formatCurrency(rechargeGoal)}</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-blue-800" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span className="text-xs text-blue-100">Achieved</span>
                </div>
                <div className="text-lg font-bold">{formatCurrency(currentProgress)}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-orange-300" />
                  <span className="text-xs text-blue-100">Remaining</span>
                </div>
                <div className="text-lg font-bold">{formatCurrency(remaining)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retailers Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Retailers</CardTitle>
          <CardDescription>Select retailers to call based on your recharge goal strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search retailers by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance_desc">Highest Balance First</SelectItem>
                <SelectItem value="balance_asc">Lowest Balance First</SelectItem>
                <SelectItem value="last_call">Oldest Call First</SelectItem>
                <SelectItem value="last_recharge">Oldest Recharge First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {sortedRetailers.map((retailer) => (
              <div key={retailer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleRetailerClick(retailer.retailer_id, retailer.name)}
                      className="font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
                    >
                      {retailer.name}
                    </button>
                    <Badge variant="outline">ID: {retailer.retailer_id}</Badge>
                    {(retailer.solde || 0) > 10000 && (
                      <Badge variant="default">High Balance</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span className="font-medium">Balance: {formatCurrency(retailer.solde)}</span>
                    <span>Last Call: {formatDate(retailer.last_call_date)}</span>
                    <span>Last Recharge: {formatDate(retailer.last_recharge_date)}</span>
                  </div>
                  {retailer.mobile && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{retailer.mobile}</span>
                    </div>
                  )}
                  {retailer.project_name && (
                    <p className="text-sm text-gray-700">Project: {retailer.project_name}</p>
                  )}
                </div>
                <Button 
                  size="sm"
                  onClick={() => updateLastCallDate(retailer.id)}
                  className="ml-4"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            ))}
          </div>

          {sortedRetailers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No retailers found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

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
                    <Progress value={(selectedRetailer.progress / selectedRetailer.target) * 100} className="h-3" />
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

export default GoalOrientedCalling;
