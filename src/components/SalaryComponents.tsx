import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalaryComponent {
  name: string;
  percentage: number;
  amount: number;
}

interface SalaryComponentsProps {
  monthlySalary: number;
  components: SalaryComponent[];
  onComponentChange?: (index: number, field: 'percentage' | 'amount', value: number) => void;
  readOnly?: boolean;
}

const SalaryComponents: React.FC<SalaryComponentsProps> = ({
  monthlySalary,
  components,
  onComponentChange,
  readOnly = false
}) => {
  const handlePercentageChange = (index: number, value: string) => {
    const percentage = parseFloat(value) || 0;
    const amount = (monthlySalary * percentage) / 100;
    onComponentChange?.(index, 'percentage', percentage);
    onComponentChange?.(index, 'amount', amount);
  };

  const handleAmountChange = (index: number, value: string) => {
    const amount = parseFloat(value) || 0;
    const percentage = monthlySalary > 0 ? (amount / monthlySalary) * 100 : 0;
    onComponentChange?.(index, 'amount', amount);
    onComponentChange?.(index, 'percentage', percentage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salary Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {components.map((component, index) => (
          <div key={component.name} className="grid grid-cols-3 gap-4 items-end">
            <div>
              <Label className="font-medium">{component.name}</Label>
            </div>
            <div>
              <Label>Percentage (%)</Label>
              <Input
                type="number"
                value={component.percentage.toFixed(2)}
                onChange={(e) => handlePercentageChange(index, e.target.value)}
                readOnly={readOnly}
                className={readOnly ? 'bg-gray-100' : ''}
              />
            </div>
            <div>
              <Label>Amount (₦)</Label>
              <Input
                type="number"
                value={component.amount.toFixed(2)}
                onChange={(e) => handleAmountChange(index, e.target.value)}
                readOnly={readOnly}
                className={readOnly ? 'bg-gray-100' : ''}
              />
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Components:</span>
            <span className="font-bold text-lg">
              ₦{components.reduce((sum, comp) => sum + comp.amount, 0).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">Monthly Salary:</span>
            <span className="font-bold text-lg">₦{monthlySalary.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryComponents;