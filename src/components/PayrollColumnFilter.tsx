import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, X } from 'lucide-react';

interface PayrollColumnFilterProps {
  onApplyFilter: (selectedColumns: string[]) => void;
  onClose: () => void;
}

const PayrollColumnFilter: React.FC<PayrollColumnFilterProps> = ({ onApplyFilter, onClose }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'S/N', 'Basic Salary', 'Total Allowances', 'Gross Salary', 'Total Deductions', 'Total Bonuses', 'Net Salary'
  ]);

  const defaultColumns = [
    'S/N', 'Basic Salary', 'Total Allowances', 'Gross Salary', 'Total Deductions', 'Total Bonuses', 'Net Salary'
  ];

  const allowanceColumns = [
    'Basic Salary', 'Housing Allowance (HRA)', 'Transport Allowance', 'Medical Allowance',
    'Meal / Feeding Allowance', 'Utility Allowance', 'Clothing / Wardrobe Allowance',
    'Leave Allowance (10% of annual basic)', 'Entertainment Allowance', 'Responsibility Allowance',
    'Punctuality or Attendance Allowance (if monthly)', 'Internet / Data Allowance',
    'Fuel / Transport Card Allowance', 'Hazard Allowance', 'Technical/Skill Allowance',
    'Domestic Staff Allowance', 'Shift Allowance', 'Professional Development Allowance',
    'Remote Work Allowance', 'Field Allowance', 'Vehicle Maintenance Allowance',
    'Risk Allowance', 'Hardship Allowance', 'Family Support Allowance',
    'Special Duty Allowance (if recurring)', 'Child Education Allowance', 'Confidentiality Allowance'
  ];

  const statutoryColumns = [
    'PENSION', 'NHIS', 'NHF', 'LIFE ASSURANCE', 'VOLUNTORY PENSION', 'PROF. & UNION DUES', 'PAYE'
  ];

  const deductionColumns = [
    'Shortage deductions', 'Loan Repayment', 'Unpaid Backlog Loan Repayment', 'Salary Advance Recovery',
    'Staff Welfare Deductions', 'Training Fees Recovery', 'Staff Uniform', 'Working Tools Deductions',
    'Lateness', 'Absenteeism Deductions', 'Damage to Company Property', 'Lost Company Items Recovery',
    'Unapproved Expenses Recovery', 'Misconduct Fines', 'Disciplinary Charges',
    'Health Maintenance Organization (HMO) Premiums', 'Court-Ordered Garnishments',
    'Insurance Premiums', 'Mortgage Deductions', 'Vehicle or Asset Financing Repayment',
    'Leave Without Pay (LWOP)', 'Excess Leave Taken', 'Training Bond Recovery',
    'Company Vehicle Usage Charges', 'Phone Bill Reimbursement Deductions',
    'Accommodation Rent Deduction', 'Utilities (Power, Water, Gas)',
    'Furniture Loan or Lease Repayment', 'Laptop or Gadget Recovery',
    'Company Meal or Feeding Charges', 'Internet or Wi-Fi Charges',
    'Official Attire/Uniform Deduction', 'Fuel/Transport Card Repayment',
    'Advance Recovery', 'Unretired Expense Claims', 'Unpaid Tax Backlog Deduction',
    'Expatriate Work Permit Reimbursement', 'Visa, Flight Ticket, Relocation Reimbursement',
    'Special HR Disciplinary Fines', 'Staff Benevolent Fund', 'End-of-Year Party Contribution',
    'Thrift Savings', 'Esusu Deductions', 'CSR or Fundraising Deductions',
    'Voluntary Religious Contributions', 'Cooperative Society Contributions',
    'Christmas Contribution', 'Ramadan Contribution', 'Birthday Contribution', 'Others'
  ];

  const bonusColumns = [
    'Performance Bonus', 'Sales Commission', 'Productivity Bonus', 'Attendance Bonus',
    'Service Charge Bonus', 'Tips', 'Unpaid Backlog Tip', 'Unpaid Backlog Bonus',
    'Unpaid Backlog Commission', 'Appraisal Bonus', 'Overtime Pay', 'Night Shift Allowance',
    'Weekend or Holiday Bonus', 'Incentive Bonus', 'Recognition Bonus',
    'Professional Certification Bonus', 'Call-Out Bonus', 'Supervisory Bonus',
    'Relief Bonus', 'Employee of The Month', 'Employee of the Year', 'Holiday Bonus',
    '13th Month Bonus', 'Quarterly Bonus', 'Retention Bonus', 'Joining Bonus',
    'Referral Commission', 'Referral Bonus', 'Project Completion Bonus', 'Sign-On Bonus',
    'Loyalty/Anniversary Bonus', 'Reallocation/Resettlement Allowance', 'Expat Allowance',
    'Death Benefit Pay'
  ];

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  const handleSelectAll = (columns: string[]) => {
    const newSelected = [...new Set([...selectedColumns, ...columns])];
    setSelectedColumns(newSelected);
  };

  const handleDeselectAll = (columns: string[]) => {
    setSelectedColumns(prev => prev.filter(col => !columns.includes(col)));
  };

  const renderColumnSection = (title: string, columns: string[]) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSelectAll(columns)}
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeselectAll(columns)}
          >
            Deselect All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
        {columns.map((column) => (
          <div key={column} className="flex items-center space-x-2">
            <Checkbox
              id={column}
              checked={selectedColumns.includes(column)}
              onCheckedChange={() => handleColumnToggle(column)}
            />
            <Label htmlFor={column} className="text-sm">{column}</Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Select Payroll Report Columns
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="default" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="allowances">Allowances</TabsTrigger>
            <TabsTrigger value="statutory">Statutory</TabsTrigger>
            <TabsTrigger value="deductions">Deductions</TabsTrigger>
            <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="default" className="mt-4">
            {renderColumnSection('Default Selection', defaultColumns)}
          </TabsContent>
          
          <TabsContent value="allowances" className="mt-4">
            {renderColumnSection('Allowances Selection', allowanceColumns)}
          </TabsContent>
          
          <TabsContent value="statutory" className="mt-4">
            {renderColumnSection('Statutory Deductions', statutoryColumns)}
          </TabsContent>
          
          <TabsContent value="deductions" className="mt-4">
            {renderColumnSection('Deductions Selection', deductionColumns)}
          </TabsContent>
          
          <TabsContent value="bonuses" className="mt-4">
            {renderColumnSection('Bonuses Selection', bonusColumns)}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium mb-2">Selected Columns ({selectedColumns.length}):</p>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {selectedColumns.map((column) => (
              <span key={column} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                {column}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onApplyFilter(selectedColumns)}>
            Apply Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollColumnFilter;