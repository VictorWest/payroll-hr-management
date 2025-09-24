import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Download, Printer, Edit, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const AttendanceRecords: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { id: '1', employeeName: 'John Doe', date: '2024-03-15', timeIn: '08:00', timeOut: '17:00', month: 'March', year: '2024', status: 'Present', hoursWorked: 8 },
    { id: '2', employeeName: 'Jane Smith', date: '2024-03-15', timeIn: '09:30', timeOut: '17:00', month: 'March', year: '2024', status: 'Late', hoursWorked: 7.5 },
    { id: '3', employeeName: 'Mike Johnson', date: '2024-03-14', timeIn: '08:00', timeOut: '17:00', month: 'March', year: '2024', status: 'Present', hoursWorked: 8 },
    { id: '4', employeeName: 'Sarah Wilson', date: '2024-03-13', timeIn: '', timeOut: '', month: 'March', year: '2024', status: 'Absent', hoursWorked: 0 }
  ]);

  const [editingRecord, setEditingRecord] = useState<AttendanceRecord | null>(null);
  const [editReason, setEditReason] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [selectedYear, setSelectedYear] = useState('2024');

  const handleEditRecord = () => {
    if (editingRecord && editReason.trim()) {
      setAttendanceRecords(attendanceRecords.map(record => 
        record.id === editingRecord.id 
          ? { ...editingRecord, editReason }
          : record
      ));
      setEditingRecord(null);
      setEditReason('');
      alert('Attendance record updated successfully!');
    }
  };

  const exportToCSV = () => {
    const headers = ['Employee', 'Date', 'Time In', 'Time Out', 'Month', 'Year', 'Status', 'Hours', 'Edit Reason'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        record.employeeName, record.date, record.timeIn, record.timeOut, 
        record.month, record.year, record.status, record.hoursWorked, record.editReason || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-records-${filterPeriod}.csv`;
    a.click();
  };

  const exportToPDF = () => {
    window.print();
  };

  const getFilteredRecords = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    switch (filterPeriod) {
      case 'daily':
        return attendanceRecords.filter(record => record.date === today);
      case 'monthly':
        return attendanceRecords.filter(record => 
          record.month === selectedMonth && record.year === selectedYear
        );
      case 'quarterly':
        const currentQuarter = Math.floor((now.getMonth() / 3));
        const quarterMonths = [
          ['January', 'February', 'March'],
          ['April', 'May', 'June'],
          ['July', 'August', 'September'],
          ['October', 'November', 'December']
        ][currentQuarter];
        return attendanceRecords.filter(record => 
          quarterMonths.includes(record.month) && record.year === selectedYear
        );
      default:
        return attendanceRecords;
    }
  };

  const filteredRecords = getFilteredRecords();

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Attendance Records</h2>
        <div className="flex gap-2">
          <Button onClick={exportToPDF} size="sm" variant="outline">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button onClick={exportToPDF} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            PDF
          </Button>
          <Button onClick={exportToCSV} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Period</Label>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filterPeriod === 'monthly' && (
              <>
                <div>
                  <Label>Month</Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['2024', '2023', '2022'].map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Edit Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employeeName}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.timeIn}</TableCell>
                    <TableCell>{record.timeOut}</TableCell>
                    <TableCell>{record.month}</TableCell>
                    <TableCell>{record.year}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.hoursWorked}h</TableCell>
                    <TableCell className="text-sm text-gray-600">{record.editReason || '-'}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setEditingRecord(record)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Attendance Record</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Employee</Label>
                              <Input value={editingRecord?.employeeName || ''} 
                                     onChange={(e) => setEditingRecord(editingRecord ? {...editingRecord, employeeName: e.target.value} : null)} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Time In</Label>
                                <Input type="time" value={editingRecord?.timeIn || ''} 
                                       onChange={(e) => setEditingRecord(editingRecord ? {...editingRecord, timeIn: e.target.value} : null)} />
                              </div>
                              <div>
                                <Label>Time Out</Label>
                                <Input type="time" value={editingRecord?.timeOut || ''} 
                                       onChange={(e) => setEditingRecord(editingRecord ? {...editingRecord, timeOut: e.target.value} : null)} />
                              </div>
                            </div>
                            <div>
                              <Label>Status</Label>
                              <Select value={editingRecord?.status} onValueChange={(value) => setEditingRecord(editingRecord ? {...editingRecord, status: value as AttendanceRecord['status']} : null)}>
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
                            <div>
                              <Label>Reason for Edit</Label>
                              <Textarea value={editReason} onChange={(e) => setEditReason(e.target.value)} 
                                        placeholder="Error in Marking or other reason" />
                            </div>
                            <Button onClick={handleEditRecord} className="w-full" disabled={!editReason.trim()}>
                              Update Record
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceRecords;