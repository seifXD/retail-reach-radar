
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Phone, Mail, CreditCard, FileText, Plus, Calendar, DollarSign } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";

interface Retailer {
  id: string;
  retailer_id: string;
  name: string;
  mobile?: string;
  sales_order_id?: string;
  project_name?: string;
  description?: string;
  last_recharge_date?: string;
  preferred_collection_method?: string;
  solde?: number;
  agent_id?: string;
  last_call_date?: string;
  created_at: string;
  added_at: string;
}

interface RetailerProfilesProps {
  userRole: 'agent' | 'supervisor';
}

const RetailerProfiles = ({ userRole }: RetailerProfilesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const { user } = useAuth();
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
          description: `Failed to fetch retailers: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      setRetailers(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
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
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount?: number) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
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
          <CardTitle>Retailer Database</CardTitle>
          <CardDescription>Search and manage your retailer contacts</CardDescription>
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

      {/* Retailers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRetailers.map((retailer) => (
          <Card key={retailer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{retailer.name}</CardTitle>
                <Badge variant="outline">
                  ID: {retailer.retailer_id}
                </Badge>
              </div>
              <CardDescription>{retailer.project_name || 'No project assigned'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {retailer.mobile && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{retailer.mobile}</span>
                  </div>
                )}
                {retailer.sales_order_id && (
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>Order: {retailer.sales_order_id}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Balance: {formatCurrency(retailer.solde)}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Last Call: {formatDate(retailer.last_call_date)}</p>
                <p className="text-sm text-gray-600">Last Recharge: {formatDate(retailer.last_recharge_date)}</p>
                {retailer.description && (
                  <p className="text-sm font-medium mt-1">{retailer.description}</p>
                )}
              </div>

              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1" onClick={() => setSelectedRetailer(retailer)}>
                      <FileText className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{retailer.name} - Full Profile</DialogTitle>
                    </DialogHeader>
                    
                    {selectedRetailer && (
                      <div className="space-y-6">
                        {/* Contact Info */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Contact Information</CardTitle>
                          </CardHeader>
                          <CardContent className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Retailer ID</label>
                              <p className="text-lg">{selectedRetailer.retailer_id}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Mobile</label>
                              <p className="text-lg">{selectedRetailer.mobile || 'Not provided'}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Project</label>
                              <p className="text-lg">{selectedRetailer.project_name || 'Not assigned'}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Sales Order ID</label>
                              <p className="text-lg">{selectedRetailer.sales_order_id || 'Not provided'}</p>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Financial Information */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Financial Information</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-600">Current Balance</label>
                                <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedRetailer.solde)}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-600">Collection Method</label>
                                <p className="text-lg">{selectedRetailer.preferred_collection_method || 'Not specified'}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Activity Log */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Activity Log</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">Last Call Date</span>
                                  <span className="text-sm text-gray-500">{formatDate(selectedRetailer.last_call_date)}</span>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">Last Recharge Date</span>
                                  <span className="text-sm text-gray-500">{formatDate(selectedRetailer.last_recharge_date)}</span>
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">Added to System</span>
                                  <span className="text-sm text-gray-500">{formatDate(selectedRetailer.added_at)}</span>
                                </div>
                              </div>
                              
                              {selectedRetailer.description && (
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Description</span>
                                  </div>
                                  <p className="text-gray-700">{selectedRetailer.description}</p>
                                </div>
                              )}

                              <div className="mt-4 space-y-2">
                                <Textarea 
                                  placeholder="Add a note about this retailer..." 
                                  value={newNote}
                                  onChange={(e) => setNewNote(e.target.value)}
                                />
                                <div className="flex space-x-2">
                                  <Button size="sm" disabled>Add Note</Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateLastCallDate(selectedRetailer.id)}
                                  >
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Mark as Called
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRetailers.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              {retailers.length === 0 
                ? "No retailers found in database." 
                : "No retailers found matching your search."}
            </p>
            {retailers.length === 0 && (
              <Button 
                onClick={fetchRetailers} 
                className="mt-4"
                variant="outline"
              >
                Refresh Data
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RetailerProfiles;
