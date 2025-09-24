import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface StatutoryDeductions {
  includeStatutoryPension: boolean;
  enableNHF: boolean;
  nhfPercentage: number;
  enableNHIS: boolean;
  nhisPercentage: number;
  includeLifeAssurance: boolean;
  lifeAssurancePercentage: number;
  includeVoluntaryPension: boolean;
  voluntaryPensionAmount: number;
  includeProfUnionDues: boolean;
  profUnionDuesPercentage: number;
}

interface StatutorySectionProps {
  deductions: StatutoryDeductions;
  onDeductionsChange: (deductions: StatutoryDeductions) => void;
}

const StatutorySection: React.FC<StatutorySectionProps> = ({ deductions, onDeductionsChange }) => {
  const updateDeduction = (field: keyof StatutoryDeductions, value: any) => {
    onDeductionsChange({ ...deductions, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statutory Deductions (Tax Relief)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="statutoryPension"
            checked={deductions.includeStatutoryPension}
            onCheckedChange={(checked) => updateDeduction('includeStatutoryPension', checked)}
          />
          <Label htmlFor="statutoryPension">Statutory Pension (8% of BHT)</Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="nhf"
            checked={deductions.enableNHF}
            onCheckedChange={(checked) => updateDeduction('enableNHF', checked)}
          />
          <Label htmlFor="nhf">NHF:</Label>
          <Input
            type="number"
            className="w-20"
            value={deductions.nhfPercentage}
            onChange={(e) => updateDeduction('nhfPercentage', parseFloat(e.target.value) || 0)}
            disabled={!deductions.enableNHF}
            min="0"
            max="100"
            step="0.1"
          />
          <span>%</span>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="nhis"
            checked={deductions.enableNHIS}
            onCheckedChange={(checked) => updateDeduction('enableNHIS', checked)}
          />
          <Label htmlFor="nhis">NHIS:</Label>
          <Input
            type="number"
            className="w-20"
            value={deductions.nhisPercentage}
            onChange={(e) => updateDeduction('nhisPercentage', parseFloat(e.target.value) || 0)}
            disabled={!deductions.enableNHIS}
            min="0"
            max="100"
            step="0.1"
          />
          <span>%</span>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="lifeAssurance"
            checked={deductions.includeLifeAssurance}
            onCheckedChange={(checked) => updateDeduction('includeLifeAssurance', checked)}
          />
          <Label htmlFor="lifeAssurance">Life Assurance:</Label>
          <Input
            type="number"
            className="w-20"
            value={deductions.lifeAssurancePercentage}
            onChange={(e) => updateDeduction('lifeAssurancePercentage', parseFloat(e.target.value) || 0)}
            disabled={!deductions.includeLifeAssurance}
            min="0"
            max="100"
            step="0.1"
          />
          <span>%</span>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="voluntaryPension"
            checked={deductions.includeVoluntaryPension}
            onCheckedChange={(checked) => updateDeduction('includeVoluntaryPension', checked)}
          />
          <Label htmlFor="voluntaryPension">Voluntary Pension:</Label>
          <Input
            type="number"
            className="w-32"
            value={deductions.voluntaryPensionAmount}
            onChange={(e) => updateDeduction('voluntaryPensionAmount', parseFloat(e.target.value) || 0)}
            disabled={!deductions.includeVoluntaryPension}
            min="0"
            placeholder="Amount in ₦"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="profUnionDues"
            checked={deductions.includeProfUnionDues}
            onCheckedChange={(checked) => updateDeduction('includeProfUnionDues', checked)}
          />
          <Label htmlFor="profUnionDues">Professional & Union Dues:</Label>
          <Input
            type="number"
            className="w-20"
            value={deductions.profUnionDuesPercentage}
            onChange={(e) => updateDeduction('profUnionDuesPercentage', parseFloat(e.target.value) || 0)}
            disabled={!deductions.includeProfUnionDues}
            min="0"
            max="100"
            step="0.1"
          />
          <span>%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatutorySection;