
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Settings } from "lucide-react";
import { useState, useEffect } from "react";

const SuperUserPanel = () => {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "09:30", query: "", isActive: false },
    { id: 2, time: "10:30", query: "", isActive: false },
    { id: 3, time: "11:30", query: "", isActive: false },
    { id: 4, time: "12:30", query: "", isActive: false },
  ]);
  
  const [forceInjectQuery, setForceInjectQuery] = useState("");
  const [nextDispatch, setNextDispatch] = useState("");
  const [countdown, setCountdown] = useState("");

  // Calculate next dispatch time and countdown
  useEffect(() => {
    const calculateNextDispatch = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Define dispatch times (30 minutes past each hour from 9 to 23)
      const dispatchTimes = [];
      for (let hour = 9; hour <= 23; hour++) {
        dispatchTimes.push({ hour, minute: 30 });
      }
      
      // Find next dispatch time
      let nextDispatchTime = null;
      for (const time of dispatchTimes) {
        if (time.hour > currentHour || (time.hour === currentHour && time.minute > currentMinute)) {
          nextDispatchTime = time;
          break;
        }
      }
      
      // If no dispatch today, use first dispatch tomorrow
      if (!nextDispatchTime) {
        nextDispatchTime = { hour: 9, minute: 30 };
      }
      
      const next = new Date();
      if (nextDispatchTime.hour === 9 && currentHour >= 23) {
        next.setDate(next.getDate() + 1);
      }
      next.setHours(nextDispatchTime.hour, nextDispatchTime.minute, 0, 0);
      
      setNextDispatch(`${nextDispatchTime.hour.toString().padStart(2, '0')}:${nextDispatchTime.minute.toString().padStart(2, '0')}`);
      
      // Calculate countdown
      const diff = next.getTime() - now.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setCountdown(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateNextDispatch();
    const interval = setInterval(calculateNextDispatch, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleQueryChange = (slotId: number, query: string) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, query } : slot
    ));
  };

  const handleSetQuery = (slotId: number) => {
    setTimeSlots(prev => prev.map(slot => 
      slot.id === slotId ? { ...slot, isActive: slot.query.trim() !== "" } : slot
    ));
  };

  const handleForceInject = () => {
    if (forceInjectQuery.trim()) {
      console.log("Force injecting query:", forceInjectQuery);
      // Here you would implement the actual force injection logic
      setForceInjectQuery("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Compact Timer Card */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-1">Next dispatch at {nextDispatch}</div>
            <div className="text-2xl font-bold text-green-600">{countdown} remaining</div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timeSlots.map((slot) => (
          <Card key={slot.id} className={`transition-colors ${slot.isActive ? 'border-green-500 bg-green-50' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time Slot {slot.time}</span>
                </span>
                {slot.isActive && (
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Set query for {slot.time} dispatch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter query number..."
                  value={slot.query}
                  onChange={(e) => handleQueryChange(slot.id, e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={() => handleSetQuery(slot.id)}
                  disabled={!slot.query.trim()}
                >
                  Set
                </Button>
              </div>
              {slot.query && (
                <div className="text-sm text-gray-600">
                  Query: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{slot.query}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Force Inject Card */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-700">
            <Zap className="h-5 w-5" />
            <span>Force Inject Query</span>
          </CardTitle>
          <CardDescription className="text-orange-600">
            Immediately dispatch a query outside of scheduled time slots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter query number for immediate dispatch..."
              value={forceInjectQuery}
              onChange={(e) => setForceInjectQuery(e.target.value)}
              className="flex-1 border-orange-200 focus:border-orange-400"
            />
            <Button 
              onClick={handleForceInject}
              disabled={!forceInjectQuery.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Zap className="h-4 w-4 mr-2" />
              Force Inject
            </Button>
          </div>
          <p className="text-xs text-orange-600 mt-2">
            ⚠️ This will bypass the scheduled time slots and execute immediately
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperUserPanel;
