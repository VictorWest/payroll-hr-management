import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaxBandTable2025: React.FC = () => {
  const taxBands = [
    { range: 'First 800,000', rate: '0%' },
    { range: 'Next 2,200,000 (800,001 - 3,000,000)', rate: '15%' },
    { range: 'Next 9,000,000 (3,000,001 - 12,000,000)', rate: '18%' },
    { range: 'Next 13,000,000 (12,000,001 - 25,000,000)', rate: '21%' },
    { range: 'Next 25,000,000 (25,000,001 - 50,000,000)', rate: '23%' },
    { range: 'Above 50,000,000', rate: '25%' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium text-gray-700">
          Nigeria Tax Act (NTA) 2025 Tax Bands
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Annual Taxable Income (NGN)
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                  Rate (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {taxBands.map((band, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3 text-gray-800">
                    {band.range}
                  </td>
                  <td className="border border-gray-300 p-3 text-gray-800">
                    {band.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxBandTable2025;