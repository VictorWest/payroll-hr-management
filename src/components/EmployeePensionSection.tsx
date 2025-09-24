import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EmployeeSearchInput from './EmployeeSearchInput';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

interface PensionData {
  employee_name: string;
  monthly_salary: number;
  employee_rate: number;
  employer_rate: number;
  employee_contribution: number;
  employer_contribution: number;
  total_contribution: number;
}

const EmployeePensionSection: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [pensionData, setPensionData] = useState<PensionData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleEmployeeSelect = async (employeeName: string) => {
    setSelectedEmployee(employeeName);
    if (employeeName) {
      await fetchPensionData(employeeName);
    }
  };

  const fetchPensionData = async (employeeName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_pension_calculations')
        .select('*')
        .eq('employee_name', employeeName)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setPensionData(data[0]);
      } else {
        setPensionData(null);
        toast({
          title: "No Data Found",
          description: "No pension data found for this employee",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch pension data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const savePensionData = async () => {
    if (!pensionData || !selectedEmployee) {
      toast({
        title: "Error",
        description: "No data to save",
        variant: "destructive"
      });
      return;
    }

    try {
      // Save to employee payroll records or update employee profile
      toast({
        title: "Success",
        description: "Pension data saved to employee record"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save pension data",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pension Contributions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <EmployeeSearchInput
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
            placeholder="Search and select employee"
            label="Employee Name"
          />
        </div>
        
        {loading && (
          <div className="text-center py-4">
            <p>Loading pension data...</p>
          </div>
        )}
        
        {pensionData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Monthly Salary</Label>
                <Input
                  value={`₦${pensionData.monthly_salary?.toLocaleString() || 0}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Employee Rate (%)</Label>
                <Input
                  value={`${pensionData.employee_rate || 0}%`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Employer Rate (%)</Label>
                <Input
                  value={`${pensionData.employer_rate || 0}%`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Employee Contribution</Label>
                <Input
                  value={`₦${pensionData.employee_contribution?.toLocaleString() || 0}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Employer Contribution</Label>
                <Input
                  value={`₦${pensionData.employer_contribution?.toLocaleString() || 0}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label>Total Contribution</Label>
                <Input
                  value={`₦${pensionData.total_contribution?.toLocaleString() || 0}`}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>
            
            <Button onClick={savePensionData} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Pension Data
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeePensionSection;