import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalaryComponent {
  name: string;
  value: number;
}

interface SalaryComponents2025Props {
  components: SalaryComponent[];
  onComponentChange: (index: number, value: number) => void;
  grossMonthlyIncome: number;
}

const SalaryComponents2025: React.FC<SalaryComponents2025Props> = ({
  components,
  onComponentChange,
  grossMonthlyIncome
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-700">Salary Components (Monthly)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {components.map((component, index) => (
            <div key={component.name} className="space-y-2">
              <Label className="font-medium text-gray-700">{component.name} (NGN)</Label>
              <Input
                type="number"
                value={component.value}
                onChange={(e) => onComponentChange(index, parseFloat(e.target.value) || 0)}
                placeholder={`e.g., ${component.value}`}
                className="py-3 px-4 border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                min="0"
              />
              {component.name === 'Housing Allowance' && (
                <p className="text-sm text-gray-600">Often a percentage of Basic Salary (e.g., 50%).</p>
              )}
              {component.name === 'Transport Allowance' && (
                <p className="text-sm text-gray-600">Often a percentage of Basic Salary (e.g., 25%).</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Label className="font-medium text-gray-700">Gross Monthly Income (₦)</Label>
          <Input
            value={formatCurrency(grossMonthlyIncome)}
            readOnly
            className="bg-gray-100 cursor-not-allowed mt-2 py-3 px-4 border-gray-300 rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComponents2025;