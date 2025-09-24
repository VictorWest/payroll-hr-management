import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Download, Printer, Edit, Search, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AttendanceRecords from './AttendanceRecords';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  month: string;
  year: string;
  status: 'Late' | 'Present' | 'Absent' | 'Leave' | 'overtime' | 'Suspension' | 'terminated';
  hoursWorked: number;
  editReason?: string;
}

const AttendanceManagement: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', employeeName: 'John Doe', date: '2024-03-15', timeIn: '08:00', timeOut: '17:00', month: 'March', year: '2024', status: 'Present', hoursWorked: 8 },
    { id: '2', employeeName: 'Jane Smith', date: '2024-03-15', timeIn: '09:30', timeOut: '17:00', month: 'March', year: '2024', status: 'Late', hoursWorked: 7.5 }
  ]);

  const [searchEmployee, setSearchEmployee] = useState('');
  const [newAttendance, setNewAttendance] = useState({
    employeeName: '',
    timeIn: '',
    timeOut: '',
    date: new Date().toISOString().split('T')[0],
    year: '2025',
    status: 'Present' as AttendanceRecord['status']
  });
  const [showMarkForm, setShowMarkForm] = useState(false);

  const employees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
  const filteredEmployees = employees.filter(emp => 
    emp.toLowerCase().includes(searchEmployee.toLowerCase())
  );

  const handleMarkAttendance = () => {
    if (newAttendance.employeeName && newAttendance.timeIn && newAttendance.timeOut) {
      const record: AttendanceRecord = {
        id: Date.now().toString(),
        employeeName: newAttendance.employeeName,
        date: newAttendance.date,
        timeIn: newAttendance.timeIn,
        timeOut: newAttendance.timeOut,
        month: new Date(newAttendance.date).toLocaleString('default', { month: 'long' }),
        year: newAttendance.year,
        status: newAttendance.status,
        hoursWorked: calculateHours(newAttendance.timeIn, newAttendance.timeOut)
      };
      setAttendanceRecords([...attendanceRecords, record]);
      setNewAttendance({ employeeName: '', timeIn: '', timeOut: '', date: new Date().toISOString().split('T')[0], year: '2025', status: 'Present' });
      setShowMarkForm(false);
      alert('Attendance marked successfully!');
    }
  };

  const calculateHours = (timeIn: string, timeOut: string) => {
    const start = new Date(`2000-01-01T${timeIn}`);
    const end = new Date(`2000-01-01T${timeOut}`);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60) * 10) / 10;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      case 'Leave': return 'bg-blue-100 text-blue-800';
      case 'overtime': return 'bg-orange-100 text-orange-800';
      case 'Suspension': return 'bg-purple-100 text-purple-800';
      case 'terminated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateYears = () => {
    const years = [];
    for (let year = 2025; year <= 2045; year++) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Attendance Management</h2>
        </div>
        <Button onClick={() => setShowMarkForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      <Tabs defaultValue="mark" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mark" className="space-y-4">
          <Dialog open={showMarkForm} onOpenChange={setShowMarkForm}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Mark Attendance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Search Employee</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search employee name" 
                      value={searchEmployee}
                      onChange={(e) => setSearchEmployee(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {searchEmployee && (
                    <div className="mt-2 border rounded-md max-h-32 overflow-y-auto">
                      {filteredEmployees.map(emp => (
                        <div key={emp} className="p-2 hover:bg-gray-100 cursor-pointer" 
                             onClick={() => { setNewAttendance({...newAttendance, employeeName: emp}); setSearchEmployee(''); }}>
                          {emp}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label>Selected Employee</Label>
                  <Input value={newAttendance.employeeName} readOnly className="bg-gray-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Time In</Label>
                    <Input type="time" value={newAttendance.timeIn} 
                           onChange={(e) => setNewAttendance({...newAttendance, timeIn: e.target.value})} />
                  </div>
                  <div>
                    <Label>Time Out</Label>
                    <Input type="time" value={newAttendance.timeOut} 
                           onChange={(e) => setNewAttendance({...newAttendance, timeOut: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={newAttendance.date} 
                           onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})} />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Select value={newAttendance.year} onValueChange={(value) => setNewAttendance({...newAttendance, year: value})}>
                      <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                      <SelectContent>
                        {generateYears().map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={newAttendance.status} onValueChange={(value) => setNewAttendance({...newAttendance, status: value as AttendanceRecord['status']})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Present">Present</SelectItem>
                      <SelectItem value="Absent">Absent</SelectItem>
                      <SelectItem value="Late">Late</SelectItem>
                      <SelectItem value="Leave">Leave</SelectItem>
                      <SelectItem value="overtime">Overtime</SelectItem>
                      <SelectItem value="Suspension">Suspension</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleMarkAttendance} className="w-full" 
                        disabled={!newAttendance.employeeName || !newAttendance.timeIn || !newAttendance.timeOut}>
                  Mark Attendance
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time In</TableHead>
                      <TableHead>Time Out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.timeIn}</TableCell>
                        <TableCell>{record.timeOut}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.hoursWorked}h</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <AttendanceRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttendanceManagement;