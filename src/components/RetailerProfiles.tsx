
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Phone, Mail, CreditCard, FileText, Plus } from "lucide-react";

interface RetailerProfilesProps {
  userRole: 'agent' | 'supervisor';
}

const RetailerProfiles = ({ userRole }: RetailerProfilesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRetailer, setSelectedRetailer] = useState<any>(null);

  const retailers = [
    {
      id: 1,
      name: "John Smith",
      contact: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john@premiumelectronics.com",
      creditLimit: 15000,
      currentCredit: 12500,
      lastCall: "2023-12-15",
      status: "Active",
      priority: "High",
      notes: [
        { date: "2023-12-15", agent: "Sarah", note: "Interested in new product line. Follow up next week." },
        { date: "2023-12-10", agent: "Mike", note: "Payment received. Credit restored." }
      ],
      callHistory: [
        { date: "2023-12-15", outcome: "Interested", duration: "5:23" },
        { date: "2023-12-10", outcome: "Payment Discussion", duration: "3:45" }
      ]
    },
    {
      id: 2,
      name: "Maria Garcia",
      contact: "Maria Garcia",
      phone: "+1 (555) 234-5678",
      email: "maria@cityhardware.com",
      creditLimit: 8500,
      currentCredit: 6200,
      lastCall: "2023-12-12",
      status: "Active",
      priority: "Medium",
      notes: [
        { date: "2023-12-12", agent: "Emma", note: "Requested catalog for spring season." },
        { date: "2023-12-08", agent: "Sarah", note: "Slow payer but reliable. Good relationship." }
      ],
      callHistory: [
        { date: "2023-12-12", outcome: "Follow-up", duration: "4:12" },
        { date: "2023-12-08", outcome: "Catalog Request", duration: "2:56" }
      ]
    },
    {
      id: 3,
      name: "Robert Johnson",
      contact: "Robert Johnson",
      phone: "+1 (555) 345-6789",
      email: "robert@dtfurniture.com",
      creditLimit: 22000,
      currentCredit: 18750,
      lastCall: "2023-12-14",
      status: "Active",
      priority: "High",
      notes: [
        { date: "2023-12-14", agent: "Lisa", note: "Ready to place large order. Waiting for final approval." },
        { date: "2023-12-11", agent: "Tom", note: "Discussed new furniture line. Very interested." }
      ],
      callHistory: [
        { date: "2023-12-14", outcome: "Order Pending", duration: "7:18" },
        { date: "2023-12-11", outcome: "Product Discussion", duration: "6:02" }
      ]
    }
  ];

  const filteredRetailers = retailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                placeholder="Search retailers by name or contact..."
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
                <Badge variant={retailer.priority === "High" ? "destructive" : retailer.priority === "Medium" ? "default" : "secondary"}>
                  {retailer.priority}
                </Badge>
              </div>
              <CardDescription>{retailer.contact}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{retailer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{retailer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>Credit: ${retailer.currentCredit.toLocaleString()} / ${retailer.creditLimit.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Last Call: {retailer.lastCall}</p>
                <p className="text-sm font-medium mt-1">{retailer.notes[0]?.note}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setSelectedRetailer(retailer)}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Profile
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
                            <label className="text-sm font-medium text-gray-600">Contact Person</label>
                            <p className="text-lg">{selectedRetailer.contact}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Phone</label>
                            <p className="text-lg">{selectedRetailer.phone}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-lg">{selectedRetailer.email}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">Status</label>
                            <Badge className="mt-1">{selectedRetailer.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Credit Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Credit Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-600">Credit Limit</label>
                              <p className="text-2xl font-bold text-green-600">${selectedRetailer.creditLimit.toLocaleString()}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-600">Available Credit</label>
                              <p className="text-2xl font-bold text-blue-600">${selectedRetailer.currentCredit.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notes History */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Notes & History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedRetailer.notes.map((note: any, index: number) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">{note.agent}</span>
                                  <span className="text-sm text-gray-500">{note.date}</span>
                                </div>
                                <p className="text-gray-700">{note.note}</p>
                              </div>
                            ))}
                            <div className="mt-4">
                              <Textarea placeholder="Add a new note..." className="mb-2" />
                              <Button size="sm">Add Note</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Call History */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Call History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedRetailer.callHistory.map((call: any, index: number) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="font-medium">{call.outcome}</p>
                                  <p className="text-sm text-gray-500">{call.date}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{call.duration}</p>
                                  <p className="text-xs text-gray-500">Duration</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RetailerProfiles;
