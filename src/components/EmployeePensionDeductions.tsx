import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Filter, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PensionDeduction {
  id: string;
  employeeName: string;
  pensionBody: string;
  pensionPin: string;
  month: string;
  year: string;
  deductionAmount: number;
  accumulatedDeduction: number;
  dateOfCommencement: string;
}

const EmployeePensionDeductions: React.FC = () => {
  const [pensionDeductions] = useState<PensionDeduction[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      pensionBody: 'Stanbic IBTC Pension',
      pensionPin: 'PEN123456789',
      month: 'March',
      year: '2024',
      deductionAmount: 25000,
      accumulatedDeduction: 300000,
      dateOfCommencement: '2022-01-01'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      pensionBody: 'ARM Pension Managers',
      pensionPin: 'PEN987654321',
      month: 'March',
      year: '2024',
      deductionAmount: 30000,
      accumulatedDeduction: 450000,
      dateOfCommencement: '2021-06-01'
    }
  ]);

  const [filters, setFilters] = useState({
    employee: '',
    fromDate: '',
    toDate: '',
    pensionBody: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredDeductions = pensionDeductions.filter(deduction => {
    const matchesEmployee = !filters.employee || deduction.employeeName.toLowerCase().includes(filters.employee.toLowerCase());
    const matchesPensionBody = !filters.pensionBody || deduction.pensionBody.toLowerCase().includes(filters.pensionBody.toLowerCase());
    const matchesDateRange = (!filters.fromDate || deduction.dateOfCommencement >= filters.fromDate) && (!filters.toDate || deduction.dateOfCommencement <= filters.toDate);
    return matchesEmployee && matchesPensionBody && matchesDateRange;
  });

  const exportToCSV = () => {
    const headers = ['Employee', 'Pension Body', 'Pension PIN', 'Month', 'Year', 'Deduction Amount', 'Accumulated Deduction'];
    const csvContent = [
      headers.join(','),
      ...filteredDeductions.map(deduction => [
        deduction.employeeName,
        deduction.pensionBody,
        deduction.pensionPin,
        deduction.month,
        deduction.year,
        deduction.deductionAmount,
        deduction.accumulatedDeduction
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pension-deductions.csv';
    a.click();
  };

  const printReport = () => {
    const printContent = `
      <html>
        <head><title>Pension Deductions Report</title></head>
        <body>
          <h1>Employee Pension Deductions Report</h1>
          <table border="1" style="width:100%; border-collapse: collapse;">
            <tr>
              <th>Employee</th><th>Pension Body</th><th>PIN</th><th>Month</th><th>Year</th><th>Amount</th><th>Accumulated</th>
            </tr>
            ${filteredDeductions.map(d => `
              <tr>
                <td>${d.employeeName}</td><td>${d.pensionBody}</td><td>${d.pensionPin}</td>
                <td>${d.month}</td><td>${d.year}</td><td>₦${d.deductionAmount.toLocaleString()}</td>
                <td>₦${d.accumulatedDeduction.toLocaleString()}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Employee Pension Deductions</h2>
        <div className="flex gap-2">
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Pension Deductions</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Employee Name</Label>
                  <Input placeholder="Search employee..." value={filters.employee} onChange={(e) => setFilters({...filters, employee: e.target.value})} />
                </div>
                <div>
                  <Label>Pension Body</Label>
                  <Input placeholder="Search pension body..." value={filters.pensionBody} onChange={(e) => setFilters({...filters, pensionBody: e.target.value})} />
                </div>
                <div>
                  <Label>From Date</Label>
                  <Input type="date" value={filters.fromDate} onChange={(e) => setFilters({...filters, fromDate: e.target.value})} />
                </div>
                <div>
                  <Label>To Date</Label>
                  <Input type="date" value={filters.toDate} onChange={(e) => setFilters({...filters, toDate: e.target.value})} />
                </div>
                <Button onClick={() => setShowFilters(false)} className="w-full">Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={printReport} size="sm" variant="outline">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button onClick={exportToCSV} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pension Deductions Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Employees</h3>
              <p className="text-2xl font-bold text-blue-600">{pensionDeductions.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Monthly Deductions</h3>
              <p className="text-2xl font-bold text-green-600">₦{pensionDeductions.reduce((sum, d) => sum + d.deductionAmount, 0).toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">Total Accumulated</h3>
              <p className="text-2xl font-bold text-purple-600">₦{pensionDeductions.reduce((sum, d) => sum + d.accumulatedDeduction, 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Pension Body</TableHead>
                  <TableHead>Pension PIN</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Deduction Amount</TableHead>
                  <TableHead>Accumulated Deduction</TableHead>
                  <TableHead>Commencement Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeductions.map((deduction) => (
                  <TableRow key={deduction.id}>
                    <TableCell className="font-medium">{deduction.employeeName}</TableCell>
                    <TableCell>{deduction.pensionBody}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{deduction.pensionPin}</Badge>
                    </TableCell>
                    <TableCell>{deduction.month}</TableCell>
                    <TableCell>{deduction.year}</TableCell>
                    <TableCell className="font-semibold">₦{deduction.deductionAmount.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold text-green-600">₦{deduction.accumulatedDeduction.toLocaleString()}</TableCell>
                    <TableCell>{deduction.dateOfCommencement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDeductions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pension deduction records found matching the current filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePensionDeductions;