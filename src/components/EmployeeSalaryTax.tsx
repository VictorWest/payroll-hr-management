import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SalaryComponentRow from './SalaryComponentRow';
import AddAllowanceRow from './AddAllowanceRow';

interface SalaryComponent {
  name: string;
  percentage: number;
  amount: number;
}

interface CustomAllowance {
  id: string;
  title: string;
  percentage: number;
  amount: number;
}

interface Employee {
  id: string;
  fullName: string;
  monthlySalary: number;
}

const EmployeeSalaryTax: React.FC = () => {
  const { toast } = useToast();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>([
    { name: 'Basic Salary', percentage: 0, amount: 0 },
    { name: 'Housing Allowance', percentage: 0, amount: 0 },
    { name: 'Transport Allowance', percentage: 0, amount: 0 }
  ]);
  const [customAllowances, setCustomAllowances] = useState<CustomAllowance[]>([]);
  
  // Mock employees data
  const employees: Employee[] = [
    { id: '1', fullName: 'Adebayo Johnson', monthlySalary: 450000 },
    { id: '2', fullName: 'Fatima Abubakar', monthlySalary: 380000 },
    { id: '3', fullName: 'Chidi Okafor', monthlySalary: 520000 }
  ];

  useEffect(() => {
    if (selectedEmployeeId) {
      const employee = employees.find(emp => emp.id === selectedEmployeeId);
      if (employee) {
        setGrossSalary(employee.monthlySalary);
      }
    }
  }, [selectedEmployeeId]);

  const getTotalPercentage = () => {
    const componentsTotal = salaryComponents.reduce((sum, comp) => sum + comp.percentage, 0);
    const allowancesTotal = customAllowances.reduce((sum, allow) => sum + allow.percentage, 0);
    return componentsTotal + allowancesTotal;
  };

  const handleComponentChange = (index: number, field: 'percentage' | 'amount', value: number) => {
    const newComponents = [...salaryComponents];
    newComponents[index] = { ...newComponents[index], [field]: value };
    setSalaryComponents(newComponents);
  };

  const addCustomAllowance = () => {
    const newAllowance: CustomAllowance = {
      id: Date.now().toString(),
      title: '',
      percentage: 0,
      amount: 0
    };
    setCustomAllowances([...customAllowances, newAllowance]);
  };

  const removeCustomAllowance = (id: string) => {
    setCustomAllowances(customAllowances.filter(allow => allow.id !== id));
  };

  const updateCustomAllowance = (id: string, field: string, value: any) => {
    setCustomAllowances(customAllowances.map(allow => 
      allow.id === id ? { ...allow, [field]: value } : allow
    ));
  };

  const getExistingTitles = () => {
    return customAllowances.map(allow => allow.title).filter(title => title.length > 0);
  };

  const handleSave = () => {
    if (!selectedEmployeeId) {
      toast({
        title: "Error",
        description: "Please select an employee first",
        variant: "destructive"
      });
      return;
    }

    const totalPercentage = getTotalPercentage();
    if (totalPercentage > 100) {
      toast({
        title: "Validation Error",
        description: "Total percentage cannot exceed 100%",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Salary components saved successfully",
    });
  };

  const totalPercentage = getTotalPercentage();
  const isOverLimit = totalPercentage > 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Salary & Tax</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Select Employee</Label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.fullName} - ₦{employee.monthlySalary.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Gross Salary</Label>
              <div className="text-2xl font-bold text-green-600 mt-2">
                ₦{grossSalary.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedEmployeeId && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Salary Components
                <div className="text-sm font-normal">
                  Total: {totalPercentage.toFixed(2)}%
                  {isOverLimit && <AlertTriangle className="inline ml-2 h-4 w-4 text-red-500" />}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 font-semibold text-sm text-gray-600 border-b pb-2">
                <div>Component</div>
                <div>Percentage (%)</div>
                <div>Amount (₦)</div>
              </div>
              
              {salaryComponents.map((component, index) => (
                <SalaryComponentRow
                  key={component.name}
                  name={component.name}
                  percentage={component.percentage}
                  amount={component.amount}
                  grossSalary={grossSalary}
                  onPercentageChange={(value) => handleComponentChange(index, 'percentage', value)}
                  onAmountChange={(value) => handleComponentChange(index, 'amount', value)}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add Allowances
                <Button onClick={addCustomAllowance} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Allowance
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customAllowances.length > 0 && (
                <div className="grid grid-cols-5 gap-4 font-semibold text-sm text-gray-600 border-b pb-2">
                  <div>Title</div>
                  <div>Percentage (%)</div>
                  <div>Amount (₦)</div>
                  <div>Action</div>
                </div>
              )}
              
              {customAllowances.map((allowance) => (
                <AddAllowanceRow
                  key={allowance.id}
                  id={allowance.id}
                  title={allowance.title}
                  percentage={allowance.percentage}
                  amount={allowance.amount}
                  grossSalary={grossSalary}
                  existingTitles={getExistingTitles()}
                  onTitleChange={(value) => updateCustomAllowance(allowance.id, 'title', value)}
                  onPercentageChange={(value) => updateCustomAllowance(allowance.id, 'percentage', value)}
                  onAmountChange={(value) => updateCustomAllowance(allowance.id, 'amount', value)}
                  onRemove={() => removeCustomAllowance(allowance.id)}
                />
              ))}
            </CardContent>
          </Card>

          {isOverLimit && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Total percentage ({totalPercentage.toFixed(2)}%) exceeds 100%. Please adjust the values.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isOverLimit || !selectedEmployeeId}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Salary Components
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeSalaryTax;