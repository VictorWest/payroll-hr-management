import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Plus, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AppraisalInterview {
  id: string;
  employeeId: string;
  employeeName: string;
  interviewDate: string;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const AppraisalInterview: React.FC = () => {
  const [interviews, setInterviews] = useState<AppraisalInterview[]>([]);
  const [newInterview, setNewInterview] = useState({
    employeeId: '',
    employeeName: '',
    interviewDate: '',
    interviewer: '',
    notes: ''
  });

  const employees = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Wilson' }
  ];

  const handleCreateInterview = () => {
    if (newInterview.employeeId && newInterview.interviewDate && newInterview.interviewer) {
      const employee = employees.find(emp => emp.id === newInterview.employeeId);
      const interview: AppraisalInterview = {
        id: Date.now().toString(),
        employeeId: newInterview.employeeId,
        employeeName: employee?.name || '',
        interviewDate: newInterview.interviewDate,
        interviewer: newInterview.interviewer,
        status: 'scheduled',
        notes: newInterview.notes
      };
      setInterviews([...interviews, interview]);
      setNewInterview({ employeeId: '', employeeName: '', interviewDate: '', interviewer: '', notes: '' });
    }
  };

  const handleStatusChange = (interviewId: string, newStatus: AppraisalInterview['status']) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId ? { ...interview, status: newStatus } : interview
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Appraisal Interviews
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Appraisal Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Employee</Label>
                  <Select value={newInterview.employeeId} onValueChange={(value) => setNewInterview({...newInterview, employeeId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Interview Date</Label>
                  <Input
                    type="datetime-local"
                    value={newInterview.interviewDate}
                    onChange={(e) => setNewInterview({...newInterview, interviewDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Interviewer</Label>
                  <Input
                    value={newInterview.interviewer}
                    onChange={(e) => setNewInterview({...newInterview, interviewer: e.target.value})}
                    placeholder="Enter interviewer name"
                  />
                </div>
                <div>
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    value={newInterview.notes}
                    onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                    placeholder="Additional notes"
                    rows={3}
                  />
                </div>
                <Button onClick={handleCreateInterview} className="w-full">
                  Schedule Interview
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="w-full">
          {interviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No interviews scheduled yet.</p>
              <p className="text-sm">Schedule your first interview using the button above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card key={interview.id} className="w-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{interview.employeeName}</h3>
                        <p className="text-sm text-gray-600">Date: {new Date(interview.interviewDate).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Interviewer: {interview.interviewer}</p>
                        {interview.notes && (
                          <p className="text-sm text-gray-600 mt-2">Notes: {interview.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                        <Select onValueChange={(value) => handleStatusChange(interview.id, value as AppraisalInterview['status'])}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalInterview;