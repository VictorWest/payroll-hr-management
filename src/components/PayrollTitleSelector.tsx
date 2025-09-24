import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, Users } from 'lucide-react';

interface PayrollTitle {
  id: string;
  serialNumber: string;
  name: string;
  month: string;
  year: string;
  employeeCount: number;
  totalAmount: number;
  status: 'posted' | 'draft';
  createdDate: string;
}

interface PayrollTitleSelectorProps {
  onGenerate: (selectedTitles: PayrollTitle[]) => void;
  onCancel: () => void;
}

const PayrollTitleSelector: React.FC<PayrollTitleSelectorProps> = ({ onGenerate, onCancel }) => {
  const [selectedTitles, setSelectedTitles] = useState<string[]>([]);
  
  // Mock data for demonstration
  const [payrollTitles] = useState<PayrollTitle[]>([
    {
      id: '1',
      serialNumber: 'PR-2024-001',
      name: 'January 2024 Payroll',
      month: 'January',
      year: '2024',
      employeeCount: 45,
      totalAmount: 2500000,
      status: 'posted',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      serialNumber: 'PR-2024-002',
      name: 'February 2024 Payroll',
      month: 'February',
      year: '2024',
      employeeCount: 47,
      totalAmount: 2650000,
      status: 'posted',
      createdDate: '2024-02-15'
    },
    {
      id: '3',
      serialNumber: 'PR-2024-003',
      name: 'March 2024 Payroll',
      month: 'March',
      year: '2024',
      employeeCount: 48,
      totalAmount: 2700000,
      status: 'posted',
      createdDate: '2024-03-15'
    }
  ]);

  const handleTitleToggle = (titleId: string, checked: boolean) => {
    if (checked) {
      setSelectedTitles([...selectedTitles, titleId]);
    } else {
      setSelectedTitles(selectedTitles.filter(id => id !== titleId));
    }
  };

  const handleSelectAll = () => {
    if (selectedTitles.length === payrollTitles.length) {
      setSelectedTitles([]);
    } else {
      setSelectedTitles(payrollTitles.map(title => title.id));
    }
  };

  const handleGenerate = () => {
    const selected = payrollTitles.filter(title => selectedTitles.includes(title.id));
    onGenerate(selected);
  };

  const selectedPayrollTitles = payrollTitles.filter(title => selectedTitles.includes(title.id));
  const totalSelectedAmount = selectedPayrollTitles.reduce((sum, title) => sum + title.totalAmount, 0);
  const totalSelectedEmployees = selectedPayrollTitles.reduce((sum, title) => sum + title.employeeCount, 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Select Payroll Titles to Generate
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose from the posted payroll titles below to generate payroll reports or proceed with disbursement.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Section */}
        {selectedTitles.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Selection Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Selected Titles:</span>
                <p className="font-semibold">{selectedTitles.length}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Employees:</span>
                <p className="font-semibold">{totalSelectedEmployees}</p>
              </div>
              <div>
                <span className="text-gray-600">Total Amount:</span>
                <p className="font-semibold">₦{totalSelectedAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Select All Option */}
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectedTitles.length === payrollTitles.length}
              onCheckedChange={handleSelectAll}
            />
            <Label className="font-medium">Select All Payroll Titles</Label>
          </div>
          <Badge variant="secondary">
            {payrollTitles.length} titles available
          </Badge>
        </div>

        {/* Payroll Titles List */}
        <div className="space-y-3">
          {payrollTitles.map((title) => (
            <div key={title.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedTitles.includes(title.id)}
                  onCheckedChange={(checked) => handleTitleToggle(title.id, checked as boolean)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{title.serialNumber}</span>
                    <Badge variant={title.status === 'posted' ? 'default' : 'secondary'}>
                      {title.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{title.name}</p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(title.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span>{title.employeeCount} employees</span>
                </div>
                <p className="font-semibold text-green-600">
                  ₦{title.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {payrollTitles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No posted payroll titles found for this month.</p>
            <p className="text-sm">Create and post payroll titles first to generate reports.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerate}
            disabled={selectedTitles.length === 0}
            className="bg-green-600 hover:bg-green-700"
          >
            Generate Payroll ({selectedTitles.length} selected)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollTitleSelector;