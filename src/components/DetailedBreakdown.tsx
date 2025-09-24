import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaxBand {
  range: string;
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

interface DetailedBreakdownProps {
  result: {
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
    taxBands?: TaxBand[];
    craBreakdown?: {
      fixed: number;
      percentage: number;
    };
  };
  formData: {
    company: string;
    employeeName: string;
    department: string;
    position: string;
  };
  formatCurrency: (amount: number) => string;
}

const DetailedBreakdown: React.FC<DetailedBreakdownProps> = ({ result, formData, formatCurrency }) => {
  return (
    <Card className="bg-blue-50" id="paye-results">
      <CardHeader>
        <CardTitle className="text-blue-800">PAYE Calculation Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Employee Information */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Company Name</p>
            <p className="font-semibold">{formData.company || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Employee Name</p>
            <p className="font-semibold">{formData.employeeName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-semibold">{formData.department || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Position</p>
            <p className="font-semibold">{formData.position || 'N/A'}</p>
          </div>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Monthly PAYE Tax</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(result.monthlyPAYE)}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Monthly Net Pay</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(result.monthlyNetPay)}
            </p>
          </div>
        </div>

        {/* Annual Summary */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-lg">Annual Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Annual Gross Income:</span>
              <span className="font-semibold">{formatCurrency(result.annualGross)}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual Statutory Deductions:</span>
              <span className="font-semibold">{formatCurrency(result.totalDeductions)}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual CRA:</span>
              <span className="font-semibold">{formatCurrency(result.annualCRA)}</span>
            </div>
            <div className="flex justify-between">
              <span>Annual Taxable Income:</span>
              <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
            </div>
          </div>
        </div>

        {/* CRA Breakdown */}
        {result.craBreakdown && (
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">CRA Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Fixed Amount:</span>
                <span>{formatCurrency(result.craBreakdown.fixed)}</span>
              </div>
              <div className="flex justify-between">
                <span>20% of Gross Income:</span>
                <span>{formatCurrency(result.craBreakdown.percentage)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total CRA:</span>
                <span>{formatCurrency(result.annualCRA)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Deductions Breakdown */}
        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Monthly Deductions Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Statutory Pension (8% of BHT):</span>
              <span>{formatCurrency(result.breakdown.statutoryPension)}</span>
            </div>
            <div className="flex justify-between">
              <span>NHF:</span>
              <span>{formatCurrency(result.breakdown.nhf)}</span>
            </div>
            <div className="flex justify-between">
              <span>NHIS:</span>
              <span>{formatCurrency(result.breakdown.nhis)}</span>
            </div>
            <div className="flex justify-between">
              <span>Life Assurance:</span>
              <span>{formatCurrency(result.breakdown.lifeAssurance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Voluntary Pension:</span>
              <span>{formatCurrency(result.breakdown.voluntaryPension)}</span>
            </div>
            <div className="flex justify-between">
              <span>Professional & Union Dues:</span>
              <span>{formatCurrency(result.breakdown.profUnionDues)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Monthly Deductions:</span>
              <span>{formatCurrency(result.totalDeductions / 12)}</span>
            </div>
          </div>
        </div>

        {/* Tax Bands Applied */}
        {result.taxBands && result.taxBands.length > 0 && (
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Tax Bands Applied</h4>
            <div className="space-y-2 text-sm">
              {result.taxBands.map((band, index) => (
                <div key={index} className="flex justify-between">
                  <span>{band.range} @ {(band.rate * 100).toFixed(0)}%:</span>
                  <span>{formatCurrency(band.taxAmount)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Annual PAYE:</span>
                <span>{formatCurrency(result.monthlyPAYE * 12)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Final Calculation */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Final Monthly Calculation</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Gross Monthly Income:</span>
              <span>{formatCurrency(result.grossMonthly)}</span>
            </div>
            <div className="flex justify-between">
              <span>Less: Total Monthly Deductions:</span>
              <span>({formatCurrency(result.totalDeductions / 12)})</span>
            </div>
            <div className="flex justify-between">
              <span>Less: Monthly PAYE Tax:</span>
              <span>({formatCurrency(result.monthlyPAYE)})</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Net Monthly Pay:</span>
              <span className="text-green-600">{formatCurrency(result.monthlyNetPay)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedBreakdown;