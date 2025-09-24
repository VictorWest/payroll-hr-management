import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Employee {
  id: string;
  fullName: string;
  email: string;
  position: string;
  department: string;
  monthlySalary: number;
  employmentStatus: 'Active' | 'Inactive' | 'Terminated' | 'On Leave' | 'Probation';
  startDate: string;
  phoneNumber: string;
}

interface EditRecord {
  id: string;
  employeeName: string;
  reason: string;
  editedBy: string;
  editedAt: string;
  changes: string;
}

interface EmployeeEditDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee, editRecord: EditRecord) => void;
}

const EmployeeEditDialog: React.FC<EmployeeEditDialogProps> = ({ employee, isOpen, onClose, onSave }) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(employee);
  const [editReason, setEditReason] = useState('');

  React.useEffect(() => {
    setEditedEmployee(employee);
    setEditReason('');
  }, [employee]);

  const handleSave = () => {
    if (editedEmployee && editReason.trim()) {
      const editRecord: EditRecord = {
        id: Date.now().toString(),
        employeeName: editedEmployee.fullName,
        reason: editReason,
        editedBy: 'Current User',
        editedAt: new Date().toISOString(),
        changes: 'Employee details updated'
      };
      onSave(editedEmployee, editRecord);
      onClose();
    }
  };

  if (!editedEmployee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Employee - {editedEmployee.fullName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input value={editedEmployee.fullName} onChange={(e) => setEditedEmployee({...editedEmployee, fullName: e.target.value})} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={editedEmployee.email} onChange={(e) => setEditedEmployee({...editedEmployee, email: e.target.value})} />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input value={editedEmployee.phoneNumber} onChange={(e) => setEditedEmployee({...editedEmployee, phoneNumber: e.target.value})} />
            </div>
            <div>
              <Label>Position</Label>
              <Input value={editedEmployee.position} onChange={(e) => setEditedEmployee({...editedEmployee, position: e.target.value})} />
            </div>
            <div>
              <Label>Department</Label>
              <Input value={editedEmployee.department} onChange={(e) => setEditedEmployee({...editedEmployee, department: e.target.value})} />
            </div>
            <div>
              <Label>Monthly Salary (₦)</Label>
              <Input type="number" value={editedEmployee.monthlySalary} onChange={(e) => setEditedEmployee({...editedEmployee, monthlySalary: Number(e.target.value)})} />
            </div>
            <div>
              <Label>Employment Status</Label>
              <Select value={editedEmployee.employmentStatus} onValueChange={(value) => setEditedEmployee({...editedEmployee, employmentStatus: value as Employee['employmentStatus']})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Probation">Probation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Start Date</Label>
              <Input type="date" value={editedEmployee.startDate} onChange={(e) => setEditedEmployee({...editedEmployee, startDate: e.target.value})} />
            </div>
          </div>
          <div>
            <Label>Reason for Edit *</Label>
            <Textarea value={editReason} onChange={(e) => setEditReason(e.target.value)} placeholder="Please provide a reason for this edit" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={!editReason.trim()}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeEditDialog;