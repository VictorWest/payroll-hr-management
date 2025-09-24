import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search } from 'lucide-react';
import ActivityHistory from '@/components/ActivityHistory';

const PayrollPosting: React.FC = () => {
  const [postingMode, setPostingMode] = useState<'group' | 'individual'>('group');
  const [settings, setSettings] = useState({ month: '', year: '' });
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeduction, setSelectedDeduction] = useState('');
  const [selectedBonus, setSelectedBonus] = useState('');
  const [deductionAmount, setDeductionAmount] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [statutoryType, setStatutoryType] = useState('');
  const [statutoryCalcType, setStatutoryCalcType] = useState<'percentage' | 'amount'>('percentage');
  const [statutoryPercentage, setStatutoryPercentage] = useState('');
  const [statutoryAmount, setStatutoryAmount] = useState('');
  
  const employees = [
    { id: '1', name: 'John Doe', basic: 50000, housing: 20000, transport: 10000 },
    { id: '2', name: 'Jane Smith', basic: 60000, housing: 25000, transport: 12000 },
    { id: '3', name: 'Mike Johnson', basic: 45000, housing: 18000, transport: 8000 },
    { id: '4', name: 'Sarah Wilson', basic: 55000, housing: 22000, transport: 11000 },
    { id: '5', name: 'David Brown', basic: 48000, housing: 19000, transport: 9000 }
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 41 }, (_, i) => 2025 + i);
  const deductions = ['Tax', 'Pension', 'NHIS', 'Loan Repayment', 'Uniform'];
  const bonuses = ['Performance Bonus', 'Holiday Bonus', 'Overtime', 'Commission'];
  const statutoryContributions = [
    { type: 'Employer Pension', percentage: 10, description: '10% of BHT (Basic, Housing, Transport)' },
    { type: 'Employer NHIS', percentage: 10, description: '10% of Basic Salary' },
    { type: 'Employer ECS', percentage: 1, description: '1% or Amount' },
    { type: 'Employer ITF', percentage: 1, description: '1% of Monthly Gross Salary' }
  ];

  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleSelectAllEmployees = () => {
    if (postingMode === 'group') {
      if (selectedEmployees.length === employees.length) {
        setSelectedEmployees([]);
      } else {
        setSelectedEmployees(employees.map(emp => emp.id));
      }
    }
  };

  const handlePostDeductions = () => {
    console.log('Posting deductions:', {
      employees: selectedEmployees,
      deduction: selectedDeduction,
      amount: deductionAmount
    });
  };

  const handlePostBonuses = () => {
    console.log('Posting bonuses:', {
      employees: selectedEmployees,
      bonus: selectedBonus,
      amount: bonusAmount
    });
  };

  const handlePostStatutory = () => {
    console.log('Posting statutory contributions:', {
      employees: selectedEmployees,
      statutory: { type: statutoryType, calcType: statutoryCalcType, percentage: statutoryPercentage, amount: statutoryAmount }
    });
  };

  const getSelectedEmployee = () => {
    return employees.find(emp => selectedEmployees.includes(emp.id));
  };

  const calculateDefaultAmount = () => {
    const employee = getSelectedEmployee();
    if (!employee || !statutoryType) return 0;
    
    switch (statutoryType) {
      case 'Employer Pension':
        return (employee.basic + employee.housing + employee.transport) * 0.1;
      case 'Employer NHIS':
        return employee.basic * 0.1;
      case 'Employer ECS':
        return employee.basic * 0.01;
      case 'Employer ITF':
        return (employee.basic + employee.housing + employee.transport) * 0.01;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Posting Mode</CardTitle></CardHeader>
        <CardContent>
          <RadioGroup value={postingMode} onValueChange={(value: 'group' | 'individual') => setPostingMode(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group">Group Posting</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual">Individual Posting</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Month</Label>
            <Select value={settings.month} onValueChange={(value) => setSettings({...settings, month: value})}>
              <SelectTrigger><SelectValue placeholder="Select month" /></SelectTrigger>
              <SelectContent>
                {months.map(month => (<SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Year</Label>
            <Select value={settings.year} onValueChange={(value) => setSettings({...settings, year: value})}>
              <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                {years.map(year => (<SelectItem key={year} value={year.toString()}>{year}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Select Employees
            {postingMode === 'group' && (
              <Button onClick={handleSelectAllEmployees} variant="outline" size="sm">
                {selectedEmployees.length === employees.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-2">
                  <Checkbox id={employee.id} checked={selectedEmployees.includes(employee.id)} onCheckedChange={(checked) => handleEmployeeSelection(employee.id, checked as boolean)} />
                  <Label htmlFor={employee.id} className="text-sm">{employee.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Deductions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Deduction</Label>
              <Select value={selectedDeduction} onValueChange={setSelectedDeduction}>
                <SelectTrigger><SelectValue placeholder="Select deduction" /></SelectTrigger>
                <SelectContent>
                  {deductions.map(deduction => (<SelectItem key={deduction} value={deduction}>{deduction}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={deductionAmount} onChange={(e) => setDeductionAmount(e.target.value)} />
            </div>
            <Button onClick={handlePostDeductions} className="w-full" disabled={!selectedDeduction || !deductionAmount || selectedEmployees.length === 0}>
              Post Deductions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Bonuses</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Bonus</Label>
              <Select value={selectedBonus} onValueChange={setSelectedBonus}>
                <SelectTrigger><SelectValue placeholder="Select bonus" /></SelectTrigger>
                <SelectContent>
                  {bonuses.map(bonus => (<SelectItem key={bonus} value={bonus}>{bonus}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter amount" value={bonusAmount} onChange={(e) => setBonusAmount(e.target.value)} />
            </div>
            <Button onClick={handlePostBonuses} className="w-full" disabled={!selectedBonus || !bonusAmount || selectedEmployees.length === 0}>
              Post Bonuses
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Employer Statutory Contribution</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Select Statutory Contribution</Label>
            <Select value={statutoryType} onValueChange={setStatutoryType}>
              <SelectTrigger><SelectValue placeholder="Select statutory contribution" /></SelectTrigger>
              <SelectContent>
                {statutoryContributions.map(contrib => (
                  <SelectItem key={contrib.type} value={contrib.type}>{contrib.type} - {contrib.description}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {statutoryType && selectedEmployees.length > 0 && (
            <>
              <div className="p-3 bg-gray-50 rounded">
                <h4 className="font-medium mb-2">Employee Details:</h4>
                {getSelectedEmployee() && (
                  <div className="text-sm space-y-1">
                    <div>Basic Salary: ₦{(getSelectedEmployee()?.basic || 0).toLocaleString()}</div>
                    <div>Housing Allowance: ₦{(getSelectedEmployee()?.housing || 0).toLocaleString()}</div>
                    <div>Transport Allowance: ₦{(getSelectedEmployee()?.transport || 0).toLocaleString()}</div>
                    <div className="font-medium">Calculated Amount: ₦{calculateDefaultAmount().toLocaleString()}</div>
                  </div>
                )}
              </div>
              
              <RadioGroup value={statutoryCalcType} onValueChange={(value: 'percentage' | 'amount') => setStatutoryCalcType(value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amount" id="amount" />
                  <Label htmlFor="amount">Fixed Amount</Label>
                </div>
              </RadioGroup>
              
              {statutoryCalcType === 'percentage' ? (
                <div>
                  <Label>Percentage (%)</Label>
                  <Input type="number" placeholder="Enter percentage" value={statutoryPercentage} onChange={(e) => setStatutoryPercentage(e.target.value)} />
                </div>
              ) : (
                <div>
                  <Label>Amount</Label>
                  <Input type="number" placeholder="Enter amount" value={statutoryAmount} onChange={(e) => setStatutoryAmount(e.target.value)} />
                </div>
              )}
              
              <Button onClick={handlePostStatutory} className="w-full" disabled={selectedEmployees.length === 0 || (!statutoryPercentage && !statutoryAmount)}>
                Post to Employer Statutory Contribution
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <ActivityHistory />
    </div>
  );
};

export default PayrollPosting;