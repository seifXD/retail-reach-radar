
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Phone, Calendar, FileText } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface RetailerEnhanced {
  id: string;
  added_at: string;
  agent_assigned?: string;
  retailer_id: string;
  name: string;
  mobile?: string;
  sales_order_id?: string;
  created_at: string;
  project_name?: string;
  description?: string;
  last_recharge_date?: string;
  preferred_collection_method?: string;
  solde?: number;
  agent_id?: string;
  last_call_date?: string;
  priority?: string;
  commentaire?: string;
  inserted_at: string;
}

interface RetailersTableProps {
  userRole: 'agent' | 'supervisor';
}

const RetailersTable = ({ userRole }: RetailersTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [retailers, setRetailers] = useState<RetailerEnhanced[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRetailers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('retailers_enhanced')
        .select('*')
        .order('added_at', { ascending: false });

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
        .from('retailers_enhanced')
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
        description: "Call date updated successfully",
      });

      fetchRetailers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  const filteredRetailers = retailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.retailer_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount?: number) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPriorityBadgeVariant = (priority?: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Retailer Database</CardTitle>
          <CardDescription>Comprehensive retailer management with priority and task assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search retailers by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {userRole === 'supervisor' && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Retailer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Retailers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Added At</TableHead>
                  <TableHead>Agent Assigned</TableHead>
                  <TableHead>Retailer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Sales Order ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Last Recharge</TableHead>
                  <TableHead>Collection Method</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Call</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRetailers.map((retailer) => (
                  <TableRow key={retailer.id}>
                    <TableCell className="text-sm">{formatDate(retailer.added_at)}</TableCell>
                    <TableCell className="text-sm">{retailer.agent_assigned || 'Unassigned'}</TableCell>
                    <TableCell className="font-medium">{retailer.retailer_id}</TableCell>
                    <TableCell className="font-medium">{retailer.name}</TableCell>
                    <TableCell className="text-sm">{retailer.mobile || 'N/A'}</TableCell>
                    <TableCell className="text-sm">{retailer.sales_order_id || 'N/A'}</TableCell>
                    <TableCell className="text-sm">{retailer.project_name || 'N/A'}</TableCell>
                    <TableCell className="text-sm">{formatDate(retailer.last_recharge_date)}</TableCell>
                    <TableCell className="text-sm">{retailer.preferred_collection_method || 'N/A'}</TableCell>
                    <TableCell className="text-sm font-medium">{formatCurrency(retailer.solde)}</TableCell>
                    <TableCell className="text-sm">{formatDate(retailer.last_call_date)}</TableCell>
                    <TableCell>
                      {retailer.priority && (
                        <Badge variant={getPriorityBadgeVariant(retailer.priority)}>
                          {retailer.priority}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {retailer.commentaire || 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateLastCallDate(retailer.id)}
                        >
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredRetailers.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No retailers found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetailersTable;
