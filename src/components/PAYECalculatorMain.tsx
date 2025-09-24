import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import EmployeeSearchInput from './EmployeeSearchInput';
import SavedDataViewer from './SavedDataViewer';
import PAYECalculatorRest from './PAYECalculatorRest';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SalaryComponent {
  name: string;
  percentage: number;
  value: number;
}

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

interface TaxBand {
  range: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

interface CalculationResult {
  grossMonthly: number;
  annualGross: number;
  totalDeductions: number;
  annualCRA: number;
  taxableIncome: number;
  monthlyPAYE: number;
  monthlyNetPay: number;
  breakdown: {
    statutoryPension: number;
    nhf: number;
    nhis: number;
    lifeAssurance: number;
    voluntaryPension: number;
    profUnionDues: number;
  };
  taxBands: TaxBand[];
  craBreakdown: {
    fixed: number;
    percentage: number;
  };
}

const PAYECalculatorMain: React.FC = () => {
  const [formData, setFormData] = useState({
    company: '',
    employeeName: '',
    department: '',
    position: '',
    grossMonthlyIncome: '',
    basicMonthlySalary: ''
  });

  const [components, setComponents] = useState<SalaryComponent[]>([
    { name: 'Basic Salary', percentage: 0, value: 0 },
    { name: 'Housing Allowance', percentage: 0, value: 0 },
    { name: 'Transport Allowance', percentage: 0, value: 0 }
  ]);

  const [deductions, setDeductions] = useState<StatutoryDeductions>({
    includeStatutoryPension: true,
    enableNHF: false,
    nhfPercentage: 2.5,
    enableNHIS: false,
    nhisPercentage: 5,
    includeLifeAssurance: false,
    lifeAssurancePercentage: 0,
    includeVoluntaryPension: false,
    voluntaryPensionAmount: 0,
    includeProfUnionDues: false,
    profUnionDuesPercentage: 0
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState('');
  const [showSavedData, setShowSavedData] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const savePAYECalculation = async () => {
    if (!result || !formData.employeeName) {
      toast({
        title: "Error",
        description: "Please calculate PAYE and enter employee name first",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_paye_calculations')
        .insert({
          employee_name: formData.employeeName,
          company: formData.company,
          department: formData.department,
          position: formData.position,
          gross_monthly_income: result.grossMonthly,
          basic_monthly_salary: parseFloat(formData.basicMonthlySalary) || result.grossMonthly,
          monthly_paye: result.monthlyPAYE,
          monthly_net_pay: result.monthlyNetPay,
          calculation_data: {
            components,
            deductions,
            result
          }
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "PAYE calculation saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save PAYE calculation",
        variant: "destructive"
      });
    }
  };

  const calculatePAYE = () => {
    setError('');
    
    const grossMonthly = parseFloat(formData.grossMonthlyIncome);
    const basicMonthly = parseFloat(formData.basicMonthlySalary) || grossMonthly;
    
    if (!grossMonthly || grossMonthly <= 0) {
      setError('Please enter a valid gross monthly income');
      return;
    }
    
    const totalPercentage = components.reduce((sum, comp) => sum + comp.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.1) {
      setError(`Total component percentage is ${totalPercentage.toFixed(1)}%. It must be exactly 100%.`);
      return;
    }
    
    const annualGross = grossMonthly * 12;
    const basicSalary = components.find(c => c.name === 'Basic Salary')?.value || 0;
    const housingAllowance = components.find(c => c.name === 'Housing Allowance')?.value || 0;
    const transportAllowance = components.find(c => c.name === 'Transport Allowance')?.value || 0;
    
    const pensionableEmolument = basicSalary + housingAllowance + transportAllowance;
    const statutoryPension = deductions.includeStatutoryPension ? pensionableEmolument * 0.08 : 0;
    const nhf = deductions.enableNHF ? grossMonthly * (deductions.nhfPercentage / 100) : 0;
    const nhis = deductions.enableNHIS ? basicMonthly * (deductions.nhisPercentage / 100) : 0;
    const lifeAssurance = deductions.includeLifeAssurance ? 
      Math.min(grossMonthly * (deductions.lifeAssurancePercentage / 100), annualGross * 0.10 / 12) : 0;
    const voluntaryPension = deductions.includeVoluntaryPension ? deductions.voluntaryPensionAmount : 0;
    const profUnionDues = deductions.includeProfUnionDues ? 
      grossMonthly * (deductions.profUnionDuesPercentage / 100) : 0;
    
    const totalMonthlyDeductions = statutoryPension + nhf + nhis + lifeAssurance + voluntaryPension + profUnionDues;
    const totalAnnualDeductions = totalMonthlyDeductions * 12;
    
    const craFixed = 200000;
    const cra20Percent = 0.20 * annualGross;
    const totalAnnualCRA = craFixed + cra20Percent;
    
    const annualTaxableIncome = Math.max(0, annualGross - totalAnnualDeductions - totalAnnualCRA);
    
    let annualPAYE = 0;
    let remainingTaxable = annualTaxableIncome;
    const taxBands: TaxBand[] = [];
    
    const bands = [
      { limit: 300000, rate: 0.07, name: 'First ₦300,000' },
      { limit: 300000, rate: 0.11, name: 'Next ₦300,000' },
      { limit: 500000, rate: 0.15, name: 'Next ₦500,000' },
      { limit: 500000, rate: 0.19, name: 'Next ₦500,000' },
      { limit: 1600000, rate: 0.21, name: 'Next ₦1,600,000' },
      { limit: Infinity, rate: 0.24, name: 'Above ₦3,200,000' }
    ];
    
    for (const band of bands) {
      if (remainingTaxable <= 0) break;
      const taxableInBand = Math.min(remainingTaxable, band.limit);
      const taxFromBand = taxableInBand * band.rate;
      if (taxableInBand > 0) {
        annualPAYE += taxFromBand;
        taxBands.push({
          range: band.name,
          rate: band.rate,
          taxableAmount: taxableInBand,
          taxAmount: taxFromBand
        });
      }
      remainingTaxable -= taxableInBand;
    }
    
    const monthlyPAYE = annualPAYE / 12;
    const monthlyNetPay = grossMonthly - totalMonthlyDeductions - monthlyPAYE;
    
    setResult({
      grossMonthly,
      annualGross,
      totalDeductions: totalAnnualDeductions,
      annualCRA: totalAnnualCRA,
      taxableIncome: annualTaxableIncome,
      monthlyPAYE,
      monthlyNetPay,
      breakdown: {
        statutoryPension,
        nhf,
        nhis,
        lifeAssurance,
        voluntaryPension,
        profUnionDues
      },
      taxBands,
      craBreakdown: {
        fixed: craFixed,
        percentage: cra20Percent
      }
    });
  };

  const clearAll = () => {
    setFormData({
      company: '',
      employeeName: '',
      department: '',
      position: '',
      grossMonthlyIncome: '',
      basicMonthlySalary: ''
    });
    setComponents([
      { name: 'Basic Salary', percentage: 0, value: 0 },
      { name: 'Housing Allowance', percentage: 0, value: 0 },
      { name: 'Transport Allowance', percentage: 0, value: 0 }
    ]);
    setResult(null);
    setError('');
  };

  if (showSavedData) {
    return <SavedDataViewer type="paye" onClose={() => setShowSavedData(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            <span className="text-blue-600">MiPay</span>
            <span className="text-purple-600">Master</span> - PAYE Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="e.g., Acme Corp"
              />
            </div>
            <div>
              <EmployeeSearchInput
                value={formData.employeeName}
                onChange={(value) => setFormData({...formData, employeeName: value})}
                placeholder="Search and select employee"
                label="Employee Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gross Monthly Income (₦)</Label>
              <Input
                type="number"
                value={formData.grossMonthlyIncome}
                onChange={(e) => {
                  setFormData({...formData, grossMonthlyIncome: e.target.value});
                  const grossIncome = parseFloat(e.target.value) || 0;
                  const updatedComponents = components.map(comp => ({
                    ...comp,
                    value: grossIncome * (comp.percentage / 100)
                  }));
                  setComponents(updatedComponents);
                }}
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <Label>Basic Monthly Salary (₦)</Label>
              <Input
                type="number"
                value={formData.basicMonthlySalary}
                onChange={(e) => setFormData({...formData, basicMonthlySalary: e.target.value})}
                placeholder="e.g., 200000"
              />
            </div>
          </div>

          <PAYECalculatorRest
            formData={formData}
            setFormData={setFormData}
            components={components}
            setComponents={setComponents}
            deductions={deductions}
            setDeductions={setDeductions}
            result={result}
            error={error}
            calculatePAYE={calculatePAYE}
            clearAll={clearAll}
            savePAYECalculation={savePAYECalculation}
            setShowSavedData={setShowSavedData}
            formatCurrency={formatCurrency}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PAYECalculatorMain;