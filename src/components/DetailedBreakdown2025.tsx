import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaxBandTable2025 from './TaxBandTable2025';

interface DetailedBreakdown2025Props {
  results: any;
  formData: {
    companyName: string;
    employeeName: string;
  };
  components: Array<{
    name: string;
    value: number;
  }>;
  deductions: any;
  formatCurrency: (amount: number) => string;
}

const DetailedBreakdown2025: React.FC<DetailedBreakdown2025Props> = ({
  results,
  formData,
  components,
  deductions,
  formatCurrency
}) => {
  const SummaryItem = ({ label, value, isTotal = false }: { label: string; value: string; isTotal?: boolean }) => (
    <div className={`flex justify-between py-2 ${isTotal ? 'border-t-2 border-gray-400 mt-4 pt-4 font-bold text-xl text-blue-700' : 'border-b border-dashed border-gray-200'}`}>
      <span className={isTotal ? 'font-bold' : ''}>{label}:</span>
      <strong>{value}</strong>
    </div>
  );

  const SubItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-1 pl-6 text-sm text-gray-600">
      <span>— {label}:</span>
      <strong>{value}</strong>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Employee & Company Details */}
      <Card>
        <CardHeader>
          <CardTitle>Employee & Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryItem label="Company Name" value={formData.companyName || 'N/A'} />
          <SummaryItem label="Employee Name" value={formData.employeeName || 'N/A'} />
        </CardContent>
      </Card>

      {/* Monthly Salary Components */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Salary Components</CardTitle>
        </CardHeader>
        <CardContent>
          {components.map((comp, index) => (
            <SummaryItem key={index} label={`Monthly ${comp.name}`} value={formatCurrency(comp.value)} />
          ))}
          <SummaryItem label="Total Monthly Gross Salary" value={formatCurrency(results.monthlyGross)} isTotal />
        </CardContent>
      </Card>

      {/* Annual Figures */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Figures</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryItem label="Annual Gross Income" value={formatCurrency(results.annualGross)} />
          
          {deductions.enablePension && (
            <SummaryItem 
              label="Annual Pension Contribution" 
              value={`${formatCurrency(results.annualPension)} (${deductions.pensionRate}% of BHT: ${formatCurrency(results.pensionEmoluments * 12)})`} 
            />
          )}
          
          {deductions.enableNHF && (
            <SummaryItem 
              label="Annual NHF Contribution" 
              value={`${formatCurrency(results.annualNHF)} (${deductions.nhfRate}% of Gross: ${formatCurrency(results.annualGross)})`} 
            />
          )}
          
          {deductions.enableNHIS && (
            <SummaryItem 
              label="Annual NHIS Contribution" 
              value={`${formatCurrency(results.annualNHIS)} (${deductions.nhisRate}% of Basic: ${formatCurrency(components[0].value * 12)})`} 
            />
          )}
          
          {deductions.enableLifeAssurance && (
            <SummaryItem label="Annual Life Assurance Premium" value={formatCurrency(results.lifeAssurance)} />
          )}
          
          {deductions.enableVoluntaryPension && (
            <SummaryItem label="Annual Voluntary Pension" value={formatCurrency(results.voluntaryPension)} />
          )}
          
          {deductions.enableProfUnionDues && (
            <SummaryItem label="Annual Professional & Union Dues" value={formatCurrency(results.profUnionDues)} />
          )}
          
          {deductions.enableMortgageInterest && (
            <SummaryItem label="Annual Mortgage Interest" value={formatCurrency(results.mortgageInterest)} />
          )}
          
          <SummaryItem label="Consolidated Relief Allowance (CRA)" value={formatCurrency(results.annualCRA)} />
          <SubItem label="CRA Fixed/1% Component" value={formatCurrency(results.craFixed1PercentComponent)} />
          <SubItem label="CRA 20% Component" value={formatCurrency(results.cra20PercentComponent)} />
          
          <SummaryItem label="Taxable Income" value={formatCurrency(results.taxableIncome)} />
          <SummaryItem label="Total Annual PAYE Tax" value={formatCurrency(results.annualPAYETax)} isTotal />
        </CardContent>
      </Card>

      {/* Monthly Figures */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Figures (Deductions & Net Pay)</CardTitle>
        </CardHeader>
        <CardContent>
          {deductions.enablePension && (
            <SummaryItem label="Monthly Pension Contribution" value={formatCurrency(results.annualPension / 12)} />
          )}
          
          {deductions.enableNHF && (
            <SummaryItem label="Monthly NHF Contribution" value={formatCurrency(results.annualNHF / 12)} />
          )}
          
          {deductions.enableNHIS && (
            <SummaryItem label="Monthly NHIS Contribution" value={formatCurrency(results.annualNHIS / 12)} />
          )}
          
          {deductions.enableLifeAssurance && (
            <SummaryItem label="Monthly Life Assurance Premium" value={formatCurrency(results.lifeAssurance / 12)} />
          )}
          
          {deductions.enableVoluntaryPension && (
            <SummaryItem label="Monthly Voluntary Pension" value={formatCurrency(results.voluntaryPension / 12)} />
          )}
          
          {deductions.enableProfUnionDues && (
            <SummaryItem label="Monthly Professional & Union Dues" value={formatCurrency(results.profUnionDues / 12)} />
          )}
          
          {deductions.enableMortgageInterest && (
            <SummaryItem label="Monthly Mortgage Interest" value={formatCurrency(results.mortgageInterest / 12)} />
          )}
          
          <SummaryItem label="Monthly PAYE Tax" value={formatCurrency(results.monthlyPAYETax)} isTotal />
          <SummaryItem label="Net Monthly Salary" value={formatCurrency(results.netMonthlySalary)} isTotal />
        </CardContent>
      </Card>

      {/* Tax Calculation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>PAYE Tax Calculation Breakdown (Annual)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {results.taxBreakdown.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm pl-6">
                <span>— {item.label} @ {(item.rate * 100).toFixed(0)}%: {formatCurrency(item.amount)}</span>
                <strong>{formatCurrency(item.tax)}</strong>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Band Table */}
      <TaxBandTable2025 />
    </div>
  );
};

export default DetailedBreakdown2025;