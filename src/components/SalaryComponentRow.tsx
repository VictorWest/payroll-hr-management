import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalaryComponentRowProps {
  name: string;
  percentage: number;
  amount: number;
  grossSalary: number;
  onPercentageChange: (value: number) => void;
  onAmountChange: (value: number) => void;
  readOnly?: boolean;
}

const SalaryComponentRow: React.FC<SalaryComponentRowProps> = ({
  name,
  percentage,
  amount,
  grossSalary,
  onPercentageChange,
  onAmountChange,
  readOnly = false
}) => {
  const handlePercentageChange = (value: string) => {
    const newPercentage = parseFloat(value) || 0;
    const newAmount = (grossSalary * newPercentage) / 100;
    onPercentageChange(newPercentage);
    onAmountChange(newAmount);
  };

  const handleAmountChange = (value: string) => {
    const newAmount = parseFloat(value) || 0;
    const newPercentage = grossSalary > 0 ? (newAmount / grossSalary) * 100 : 0;
    onAmountChange(newAmount);
    onPercentageChange(newPercentage);
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-end py-2">
      <div>
        <Label className="font-medium">{name}</Label>
      </div>
      <div>
        <Label className="text-sm text-gray-600">Percentage (%)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={percentage.toFixed(2)}
          onChange={(e) => handlePercentageChange(e.target.value)}
          readOnly={readOnly}
          className={readOnly ? 'bg-gray-100' : ''}
        />
      </div>
      <div>
        <Label className="text-sm text-gray-600">Amount (₦)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={amount.toFixed(2)}
          onChange={(e) => handleAmountChange(e.target.value)}
          readOnly={readOnly}
          className={readOnly ? 'bg-gray-100' : ''}
        />
      </div>
    </div>
  );
};

export default SalaryComponentRow;