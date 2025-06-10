import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Search, Phone, Target, DollarSign, TrendingUp, Filter, Trophy, Zap } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

const GoalOrientedCalling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('balance_desc');
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [rechargeGoal, setRechargeGoal] = useState(50000);
  const [currentProgress, setCurrentProgress] = useState(12500);
  const { toast } = useToast();

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

  // Data for visualizations
  const progressData = [
    { name: 'Completed', value: currentProgress, color: '#10b981' },
    { name: 'Remaining', value: remaining, color: '#e5e7eb' }
  ];

  const weeklyData = [
    { day: 'Mon', amount: 2500 },
    { day: 'Tue', amount: 3200 },
    { day: 'Wed', amount: 1800 },
    { day: 'Thu', amount: 2900 },
    { day: 'Fri', amount: 2100 },
    { day: 'Sat', amount: 0 },
    { day: 'Sun', amount: 0 }
  ];

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
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Target Quest</h2>
            </div>
            <p className="text-blue-100 text-lg">Your mission: Reach {formatCurrency(rechargeGoal)} in recharges this month</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{formatCurrency(currentProgress)} / {formatCurrency(rechargeGoal)}</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-blue-800" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <span className="text-sm text-blue-100">Achieved</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(currentProgress)}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-300" />
                  <span className="text-sm text-blue-100">Remaining</span>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(remaining)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Goal Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Remaining</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span>Weekly Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

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
                    <h3 className="font-medium text-gray-900">{retailer.name}</h3>
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
    </div>
  );
};

export default GoalOrientedCalling;
