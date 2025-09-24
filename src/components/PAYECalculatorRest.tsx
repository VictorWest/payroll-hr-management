import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, RotateCcw, Save, Eye } from 'lucide-react';
import StatutorySection from './StatutorySection';
import PDFExportButton from './PDFExportButton';
import DetailedBreakdown from './DetailedBreakdown';

interface PAYECalculatorRestProps {
  formData: any;
  setFormData: (data: any) => void;
  components: any[];
  setComponents: (components: any[]) => void;
  deductions: any;
  setDeductions: (deductions: any) => void;
  result: any;
  error: string;
  calculatePAYE: () => void;
  clearAll: () => void;
  savePAYECalculation: () => void;
  setShowSavedData: (show: boolean) => void;
  formatCurrency: (amount: number) => string;
}

const PAYECalculatorRest: React.FC<PAYECalculatorRestProps> = ({
  formData,
  setFormData,
  components,
  setComponents,
  deductions,
  setDeductions,
  result,
  error,
  calculatePAYE,
  clearAll,
  savePAYECalculation,
  setShowSavedData,
  formatCurrency
}) => {
  return (
    <>
      <div>
        <Label className="text-base font-semibold">Salary Components</Label>
        <div className="space-y-3 mt-2">
          {components.map((comp, index) => (
            <div key={index} className="flex items-center gap-4">
              <Label className="w-32">{comp.name}:</Label>
              <Input
                type="number"
                className="w-24"
                value={comp.percentage}
                onChange={(e) => {
                  const newComponents = [...components];
                  newComponents[index].percentage = parseFloat(e.target.value) || 0;
                  const grossIncome = parseFloat(formData.grossMonthlyIncome) || 0;
                  newComponents[index].value = grossIncome * (newComponents[index].percentage / 100);
                  setComponents(newComponents);
                }}
                min="0"
                max="100"
                step="0.1"
              />
              <span>%</span>
              <div className="bg-gray-100 px-3 py-2 rounded text-sm min-w-[120px]">
                {formatCurrency(comp.value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <StatutorySection 
        deductions={deductions} 
        onDeductionsChange={setDeductions} 
      />

      <div className="flex gap-4">
        <Button onClick={calculatePAYE} className="flex-1">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate PAYE
        </Button>
        <Button onClick={clearAll} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      {result && (
        <div className="flex gap-4">
          <Button onClick={savePAYECalculation} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Calculation
          </Button>
          <Button onClick={() => setShowSavedData(true)} variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Saved Data
          </Button>
        </div>
      )}

      {result && (
        <>
          <DetailedBreakdown 
            result={result} 
            formData={formData} 
            formatCurrency={formatCurrency} 
          />
          
          <div className="flex justify-center gap-4 no-print">
            <PDFExportButton 
              elementId="paye-results" 
              filename="PAYE_Report" 
              employeeName={formData.employeeName} 
            />
          </div>
        </>
      )}
    </>
  );
};

export default PAYECalculatorRest;