import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface DeductionItem {
  key: string;
  label: string;
  defaultValue: number;
  isPercentage: boolean;
}

const EmployeeStatutoryDeductions: React.FC = () => {
  const [deductions, setDeductions] = useState({
    pension: { enabled: true, value: 8 },
    nhf: { enabled: true, value: 2.5 },
    nhis: { enabled: true, value: 5 },
    lifeAssurance: { enabled: true, value: 10 },
    voluntaryPension: { enabled: true, value: 0 },
    profUnionDues: { enabled: true, value: 0 }
  });

  const handleDeductionChange = (key: string, enabled: boolean, value: number) => {
    setDeductions({ ...deductions, [key]: { enabled, value } });
  };

  const statutoryDeductions: DeductionItem[] = [
    { key: 'pension', label: 'Pension', defaultValue: 8, isPercentage: true },
    { key: 'nhf', label: 'NHF', defaultValue: 2.5, isPercentage: true },
    { key: 'nhis', label: 'NHIS', defaultValue: 5, isPercentage: true }
  ];

  const otherDeductions: DeductionItem[] = [
    { key: 'lifeAssurance', label: 'Life Assurance', defaultValue: 10, isPercentage: true },
    { key: 'voluntaryPension', label: 'Voluntary Pension', defaultValue: 0, isPercentage: false },
    { key: 'profUnionDues', label: 'Prof. & Union Dues', defaultValue: 0, isPercentage: false }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Statutory Deductions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Statutory Deductions</h4>
          {statutoryDeductions.map(({ key, label, isPercentage }) => (
            <div key={key} className="flex items-center gap-4">
              <Checkbox
                checked={deductions[key]?.enabled || false}
                onCheckedChange={(checked) => 
                  handleDeductionChange(key, checked as boolean, deductions[key]?.value || 0)
                }
              />
              <Label className="flex-1">{label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.1"
                  value={deductions[key]?.value || 0}
                  onChange={(e) => 
                    handleDeductionChange(key, deductions[key]?.enabled || false, parseFloat(e.target.value) || 0)
                  }
                  disabled={!deductions[key]?.enabled}
                  className="w-20"
                />
                {isPercentage && <span>%</span>}
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-gray-700">Other Deductions</h4>
          {otherDeductions.map(({ key, label, isPercentage }) => (
            <div key={key} className="flex items-center gap-4">
              <Checkbox
                checked={deductions[key]?.enabled || false}
                onCheckedChange={(checked) => 
                  handleDeductionChange(key, checked as boolean, deductions[key]?.value || 0)
                }
              />
              <Label className="flex-1">{label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step={isPercentage ? "0.1" : "1"}
                  value={deductions[key]?.value || 0}
                  onChange={(e) => 
                    handleDeductionChange(key, deductions[key]?.enabled || false, parseFloat(e.target.value) || 0)
                  }
                  disabled={!deductions[key]?.enabled}
                  className="w-20"
                  placeholder={isPercentage ? "0" : "Amount"}
                />
                {isPercentage && <span>%</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeStatutoryDeductions;