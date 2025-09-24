import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import SalaryComponents2025 from './SalaryComponents2025';
import StatutoryDeductions2025 from './StatutoryDeductions2025';
import DetailedBreakdown2025 from './DetailedBreakdown2025';

interface SalaryComponent {
  name: string;
  value: number;
}

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

const PayeCalculator2025NTA: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    employeeName: ''
  });

  const [components, setComponents] = useState<SalaryComponent[]>([
    { name: 'Basic Salary', value: 1400000 },
    { name: 'Housing Allowance', value: 700000 },
    { name: 'Transport Allowance', value: 700000 },
    { name: 'Other Allowances', value: 0 }
  ]);

  const [deductions, setDeductions] = useState<StatutoryDeductions>({
    enablePension: true,
    pensionRate: 8,
    enableNHF: true,
    nhfRate: 2.5,
    enableNHIS: true,
    nhisRate: 5,
    enableLifeAssurance: true,
    lifeAssurance: 1200000,
    enableVoluntaryPension: false,
    voluntaryPension: 0,
    enableProfUnionDues: false,
    profUnionDues: 0,
    enableMortgageInterest: true,
    mortgageInterest: 3000000
  });

  const [results, setResults] = useState<any>(null);
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const gross = components.reduce((sum, comp) => sum + comp.value, 0);
    setGrossMonthlyIncome(gross);
  }, [components]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const handleComponentChange = (index: number, value: number) => {
    const newComponents = [...components];
    newComponents[index].value = value;
    setComponents(newComponents);
  };

  const calculatePAYE = () => {
    setErrorMessage('');
    
    if (grossMonthlyIncome <= 0) {
      setErrorMessage('Please enter valid positive numbers for all amount fields.');
      return;
    }

    const monthlyGross = grossMonthlyIncome;
    const annualGross = monthlyGross * 12;

    const pensionEmoluments = components[0].value + components[1].value + components[2].value;
    const annualPension = deductions.enablePension ? (pensionEmoluments * 12) * (deductions.pensionRate / 100) : 0;
    const annualNHF = deductions.enableNHF ? annualGross * (deductions.nhfRate / 100) : 0;
    const annualNHIS = deductions.enableNHIS ? (components[0].value * 12) * (deductions.nhisRate / 100) : 0;
    const lifeAssurance = deductions.enableLifeAssurance ? deductions.lifeAssurance : 0;
    const voluntaryPension = deductions.enableVoluntaryPension ? deductions.voluntaryPension : 0;
    const profUnionDues = deductions.enableProfUnionDues ? deductions.profUnionDues : 0;
    const mortgageInterest = deductions.enableMortgageInterest ? deductions.mortgageInterest : 0;

    const totalAnnualDeductionsFromGross = annualPension + annualNHF + annualNHIS + lifeAssurance + voluntaryPension + profUnionDues + mortgageInterest;

    const craFixed1PercentComponent = Math.max(200000, 0.01 * annualGross);
    const cra20PercentComponent = 0.20 * annualGross;
    const annualCRA = craFixed1PercentComponent + cra20PercentComponent;

    let taxableIncome = annualGross - (totalAnnualDeductionsFromGross + annualCRA);
    if (taxableIncome < 0) taxableIncome = 0;

    let annualPAYETax = 0;
    let remainingTaxable = taxableIncome;
    const taxBreakdown: any[] = [];

    const taxBands = [
      { limit: 800000, rate: 0.00, label: "First NGN 800,000" },
      { limit: 2200000, rate: 0.15, label: "Next NGN 2,200,000" },
      { limit: 9000000, rate: 0.18, label: "Next NGN 9,000,000" },
      { limit: 13000000, rate: 0.21, label: "Next NGN 13,000,000" },
      { limit: 25000000, rate: 0.23, label: "Next NGN 25,000,000" },
      { limit: Infinity, rate: 0.25, label: "Above NGN 50,000,000" }
    ];

    taxBands.forEach((band) => {
      if (remainingTaxable > 0) {
        const amountInBand = band.limit === Infinity ? remainingTaxable : Math.min(remainingTaxable, band.limit);
        const taxInBand = amountInBand * band.rate;
        annualPAYETax += taxInBand;
        remainingTaxable -= amountInBand;
        
        if (amountInBand > 0) {
          taxBreakdown.push({
            label: band.label,
            rate: band.rate,
            amount: amountInBand,
            tax: taxInBand
          });
        }
      }
    });

    const monthlyPAYETax = annualPAYETax / 12;
    const netMonthlySalary = monthlyGross - (annualPension / 12) - (annualNHF / 12) - (annualNHIS / 12) - (lifeAssurance / 12) - (voluntaryPension / 12) - (profUnionDues / 12) - (mortgageInterest / 12) - monthlyPAYETax;

    setResults({
      monthlyGross,
      annualGross,
      annualPension,
      annualNHF,
      annualNHIS,
      lifeAssurance,
      voluntaryPension,
      profUnionDues,
      mortgageInterest,
      annualCRA,
      craFixed1PercentComponent,
      cra20PercentComponent,
      taxableIncome,
      annualPAYETax,
      monthlyPAYETax,
      netMonthlySalary,
      taxBreakdown,
      pensionEmoluments
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 bg-gray-50 min-h-screen">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gray-800">
            MIPayMaster 2025 (Nigeria Tax Act)
          </CardTitle>
          <p className="text-center text-gray-600 text-sm mt-2">
            Calculate your estimated PAYE based on the new Nigeria Tax Act (NTA) 2025.
            <br />
            <span className="font-semibold text-red-500">
              Note: Full implementation of NTA 2025 tax bands is widely anticipated from Jan 1, 2026.
            </span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName" className="font-medium text-gray-700">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                placeholder="e.g., Acme Corp"
                className="py-3 px-4 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <Label htmlFor="employeeName" className="font-medium text-gray-700">Employee Name</Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                placeholder="e.g., John Doe"
                className="py-3 px-4 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
              />
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Note: Employee search functionality is not available in this client-side calculator.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SalaryComponents2025
        components={components}
        onComponentChange={handleComponentChange}
        grossMonthlyIncome={grossMonthlyIncome}
      />

      <StatutoryDeductions2025
        deductions={deductions}
        onDeductionsChange={setDeductions}
      />

      <Button 
        onClick={calculatePAYE} 
        className="w-full py-4 px-6 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
      >
        <Calculator className="mr-2 h-5 w-5" />
        Calculate PAYE
      </Button>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center">
          {errorMessage}
        </div>
      )}

      {results && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Calculation Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Monthly PAYE Tax</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(results.monthlyPAYETax)}
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Net Monthly Salary</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(results.netMonthlySalary)}
                </p>
              </div>
            </div>
            
            <DetailedBreakdown2025
              results={results}
              formData={formData}
              components={components}
              deductions={deductions}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PayeCalculator2025NTA;