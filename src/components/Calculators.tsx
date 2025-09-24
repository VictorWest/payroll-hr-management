import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, Save, Eye } from 'lucide-react';
import PAYECalculatorMain from './PAYECalculatorMain';
import PayeCalculator2025NTA from './PayeCalculator2025NTA';
import EmployeeSearchInput from './EmployeeSearchInput';
import SavedDataViewer from './SavedDataViewer';
import SalaryComponents from './SalaryComponents';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Calculators: React.FC = () => {
  const [pensionData, setPensionData] = useState({
    employeeName: '',
    monthlySalary: 0,
    employeeRate: '8',
    employerRate: '10',
    result: { employee: 0, employer: 0, total: 0 }
  });
  
  const [salaryComponents, setSalaryComponents] = useState([
    { name: 'Basic Salary', percentage: 60, amount: 0 },
    { name: 'Housing Allowance', percentage: 25, amount: 0 },
    { name: 'Transport Allowance', percentage: 15, amount: 0 }
  ]);
  
  const [showSavedPension, setShowSavedPension] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (pensionData.monthlySalary > 0) {
      const updatedComponents = salaryComponents.map(comp => ({
        ...comp,
        amount: (pensionData.monthlySalary * comp.percentage) / 100
      }));
      setSalaryComponents(updatedComponents);
    }
  }, [pensionData.monthlySalary]);

  const handleEmployeeSelect = async (employeeName: string) => {
    setPensionData({...pensionData, employeeName});
    // Fetch employee salary from database or use mock data
    const mockSalary = 500000; // This should come from employee data
    setPensionData(prev => ({...prev, monthlySalary: mockSalary}));
  };

  const calculatePension = () => {
    const salary = pensionData.monthlySalary || 0;
    const empRate = parseFloat(pensionData.employeeRate) / 100;
    const empRRate = parseFloat(pensionData.employerRate) / 100;
    
    const employeeContribution = salary * empRate;
    const employerContribution = salary * empRRate;
    const totalContribution = employeeContribution + employerContribution;
    
    setPensionData({
      ...pensionData,
      result: {
        employee: Math.round(employeeContribution),
        employer: Math.round(employerContribution),
        total: Math.round(totalContribution)
      }
    });
  };

  const savePensionCalculation = async () => {
    if (!pensionData.result.total || !pensionData.employeeName) {
      toast({
        title: "Error",
        description: "Please calculate pension and enter employee name first",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_pension_calculations')
        .insert({
          employee_name: pensionData.employeeName,
          monthly_salary: pensionData.monthlySalary,
          employee_rate: parseFloat(pensionData.employeeRate),
          employer_rate: parseFloat(pensionData.employerRate),
          employee_contribution: pensionData.result.employee,
          employer_contribution: pensionData.result.employer,
          total_contribution: pensionData.result.total,
          salary_components: salaryComponents
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pension calculation saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pension calculation",
        variant: "destructive"
      });
    }
  };

  if (showSavedPension) {
    return <SavedDataViewer type="pension" onClose={() => setShowSavedPension(false)} />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Calculators</h1>
      
      <Tabs defaultValue="paye" className="space-y-6">
        <TabsList>
          <TabsTrigger value="paye">PAYE Calculator</TabsTrigger>
          <TabsTrigger value="paye-2025-nta">PAYE Calculator 2025 NTA</TabsTrigger>
          <TabsTrigger value="pension">Pension Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="paye">
          <PAYECalculatorMain />
        </TabsContent>

        <TabsContent value="paye-2025-nta">
          <PayeCalculator2025NTA />
        </TabsContent>

        <TabsContent value="pension">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pension Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <EmployeeSearchInput
                      value={pensionData.employeeName}
                      onChange={handleEmployeeSelect}
                      placeholder="Search and select employee"
                      label="Employee Name"
                    />
                  </div>
                  <div>
                    <Label>Monthly Salary (₦)</Label>
                    <Input
                      type="number"
                      value={pensionData.monthlySalary}
                      onChange={(e) => setPensionData({...pensionData, monthlySalary: parseFloat(e.target.value) || 0})}
                      placeholder="Enter monthly salary"
                      readOnly
                      className="bg-gray-100"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Employee Rate (%)</Label>
                    <Input
                      type="number"
                      value={pensionData.employeeRate}
                      onChange={(e) => setPensionData({...pensionData, employeeRate: e.target.value})}
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <Label>Employer Rate (%)</Label>
                    <Input
                      type="number"
                      value={pensionData.employerRate}
                      onChange={(e) => setPensionData({...pensionData, employerRate: e.target.value})}
                      placeholder="10"
                    />
                  </div>
                </div>
                
                <Button onClick={calculatePension} className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Pension
                </Button>
                
                {pensionData.result.total > 0 && (
                  <>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Employee</h3>
                        <p className="text-xl font-bold text-blue-600">
                          ₦{pensionData.result.employee.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Employer</h3>
                        <p className="text-xl font-bold text-green-600">
                          ₦{pensionData.result.employer.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-purple-800 mb-2">Total</h3>
                        <p className="text-xl font-bold text-purple-600">
                          ₦{pensionData.result.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button onClick={savePensionCalculation} variant="outline">
                        <Save className="mr-2 h-4 w-4" />
                        Save Calculation
                      </Button>
                      <Button onClick={() => setShowSavedPension(true)} variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View Saved Data
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <SalaryComponents
              monthlySalary={pensionData.monthlySalary}
              components={salaryComponents}
              readOnly={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculators;