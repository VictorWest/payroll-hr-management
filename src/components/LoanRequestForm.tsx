import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoanRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const employees = [
  { value: 'john-doe', label: 'John Doe' },
  { value: 'jane-smith', label: 'Jane Smith' },
  { value: 'mike-johnson', label: 'Mike Johnson' },
  { value: 'sarah-wilson', label: 'Sarah Wilson' }
];

const LoanRequestForm: React.FC<LoanRequestFormProps> = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    employee: '',
    requestAmount: '',
    loanDuration: '',
    monthDeduction: '',
    purpose: '',
    dateOfApplication: new Date().toISOString().split('T')[0]
  });
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      employee: '',
      requestAmount: '',
      loanDuration: '',
      monthDeduction: '',
      purpose: '',
      dateOfApplication: new Date().toISOString().split('T')[0]
    });
    onOpenChange(false);
  };

  const selectedEmployee = employees.find(emp => emp.value === formData.employee);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Loan Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee</Label>
            <Popover open={employeeOpen} onOpenChange={setEmployeeOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={employeeOpen} className="w-full justify-between">
                  {selectedEmployee ? selectedEmployee.label : "Select employee..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup>
                    {employees.map((employee) => (
                      <CommandItem key={employee.value} value={employee.value} onSelect={() => {
                        setFormData({...formData, employee: employee.value});
                        setEmployeeOpen(false);
                      }}>
                        <Check className={cn("mr-2 h-4 w-4", formData.employee === employee.value ? "opacity-100" : "opacity-0")} />
                        {employee.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestAmount">Request Amount</Label>
            <Input id="requestAmount" type="number" value={formData.requestAmount} onChange={(e) => setFormData({...formData, requestAmount: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanDuration">Loan Duration (months)</Label>
            <Input id="loanDuration" type="number" value={formData.loanDuration} onChange={(e) => setFormData({...formData, loanDuration: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthDeduction">Monthly Deduction</Label>
            <Input id="monthDeduction" type="number" value={formData.monthDeduction} onChange={(e) => setFormData({...formData, monthDeduction: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Textarea id="purpose" value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfApplication">Date of Application</Label>
            <Input id="dateOfApplication" type="date" value={formData.dateOfApplication} onChange={(e) => setFormData({...formData, dateOfApplication: e.target.value})} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoanRequestForm;