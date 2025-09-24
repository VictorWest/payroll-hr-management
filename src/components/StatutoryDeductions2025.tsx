import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface StatutoryDeductions {
  enablePension: boolean;
  pensionRate: number;
  enableNHF: boolean;
  nhfRate: number;
  enableNHIS: boolean;
  nhisRate: number;
  enableLifeAssurance: boolean;
  lifeAssurance: number;
  enableVoluntaryPension: boolean;
  voluntaryPension: number;
  enableProfUnionDues: boolean;
  profUnionDues: number;
  enableMortgageInterest: boolean;
  mortgageInterest: number;
}

interface StatutoryDeductions2025Props {
  deductions: StatutoryDeductions;
  onDeductionsChange: (deductions: StatutoryDeductions) => void;
}

const StatutoryDeductions2025: React.FC<StatutoryDeductions2025Props> = ({
  deductions,
  onDeductionsChange
}) => {
  const updateDeduction = (field: keyof StatutoryDeductions, value: any) => {
    onDeductionsChange({ ...deductions, [field]: value });
  };

  const DeductionRow = ({ 
    id, 
    label, 
    enabled, 
    onEnabledChange, 
    inputType = 'percentage',
    inputValue, 
    onInputChange, 
    note 
  }: {
    id: string;
    label: string;
    enabled: boolean;
    onEnabledChange: (checked: boolean) => void;
    inputType?: 'percentage' | 'amount';
    inputValue: number;
    onInputChange: (value: number) => void;
    note?: string;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <Checkbox
          id={id}
          checked={enabled}
          onCheckedChange={onEnabledChange}
        />
        <Label htmlFor={id} className="font-medium text-gray-700">{label}</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={inputValue}
          onChange={(e) => onInputChange(parseFloat(e.target.value) || 0)}
          disabled={!enabled}
          placeholder={inputType === 'percentage' ? 'Rate %' : 'Amount (NGN)'}
          className="flex-grow py-3 px-4 border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 disabled:bg-gray-100"
          min="0"
          max={inputType === 'percentage' ? "100" : undefined}
        />
        {inputType === 'percentage' && <span className="text-gray-600">%</span>}
      </div>
      {note && (
        <p className="text-sm text-gray-600 leading-relaxed">{note}</p>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-700">Statutory Deductions (Tax Relief)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DeductionRow
            id="enablePension"
            label="Statutory Pension (8% of BHT)"
            enabled={deductions.enablePension}
            onEnabledChange={(checked) => updateDeduction('enablePension', checked)}
            inputValue={deductions.pensionRate}
            onInputChange={(value) => updateDeduction('pensionRate', value)}
            note="BHT = Basic + Housing + Transport."
          />
          
          <DeductionRow
            id="enableNHF"
            label="NHF"
            enabled={deductions.enableNHF}
            onEnabledChange={(checked) => updateDeduction('enableNHF', checked)}
            inputValue={deductions.nhfRate}
            onInputChange={(value) => updateDeduction('nhfRate', value)}
            note="2.5% of gross income. Optional for private sector."
          />
          
          <DeductionRow
            id="enableNHIS"
            label="NHIS"
            enabled={deductions.enableNHIS}
            onEnabledChange={(checked) => updateDeduction('enableNHIS', checked)}
            inputValue={deductions.nhisRate}
            onInputChange={(value) => updateDeduction('nhisRate', value)}
            note="Typically 5% of basic salary."
          />
          
          <DeductionRow
            id="enableLifeAssurance"
            label="Life Assurance"
            enabled={deductions.enableLifeAssurance}
            onEnabledChange={(checked) => updateDeduction('enableLifeAssurance', checked)}
            inputType="amount"
            inputValue={deductions.lifeAssurance}
            onInputChange={(value) => updateDeduction('lifeAssurance', value)}
            note="Approved premiums are deductible."
          />
          
          <DeductionRow
            id="enableVoluntaryPension"
            label="Voluntary Pension"
            enabled={deductions.enableVoluntaryPension}
            onEnabledChange={(checked) => updateDeduction('enableVoluntaryPension', checked)}
            inputType="amount"
            inputValue={deductions.voluntaryPension}
            onInputChange={(value) => updateDeduction('voluntaryPension', value)}
            note="Taxable if withdrawn within 5 years."
          />
          
          <DeductionRow
            id="enableProfUnionDues"
            label="Professional & Union Dues"
            enabled={deductions.enableProfUnionDues}
            onEnabledChange={(checked) => updateDeduction('enableProfUnionDues', checked)}
            inputType="amount"
            inputValue={deductions.profUnionDues}
            onInputChange={(value) => updateDeduction('profUnionDues', value)}
            note="Deductible if wholly, exclusively, necessarily incurred."
          />
          
          <DeductionRow
            id="enableMortgageInterest"
            label="Mortgage Interest"
            enabled={deductions.enableMortgageInterest}
            onEnabledChange={(checked) => updateDeduction('enableMortgageInterest', checked)}
            inputType="amount"
            inputValue={deductions.mortgageInterest}
            onInputChange={(value) => updateDeduction('mortgageInterest', value)}
            note="Interest on loans for owner-occupied residence."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatutoryDeductions2025;