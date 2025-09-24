import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, Download, Printer } from 'lucide-react';

interface StatutoryContribution {
  id: string;
  month: string;
  year: string;
  employerPension: number;
  employerNHF: number;
  employerNSITF: number;
  employerITF: number;
  totalContribution: number;
  status: 'Posted' | 'Pending' | 'Verified';
  postedDate: string;
  postedBy: string;
}

const StatutoryContribution: React.FC = () => {
  const [contributions, setContributions] = useState<StatutoryContribution[]>([
    {
      id: '1',
      month: 'January',
      year: '2024',
      employerPension: 125000,
      employerNHF: 45000,
      employerNSITF: 12000,
      employerITF: 8000,
      totalContribution: 190000,
      status: 'Posted',
      postedDate: '2024-01-31',
      postedBy: 'HR Admin'
    },
    {
      id: '2',
      month: 'February',
      year: '2024',
      employerPension: 130000,
      employerNHF: 47000,
      employerNSITF: 13000,
      employerITF: 9000,
      totalContribution: 199000,
      status: 'Posted',
      postedDate: '2024-02-29',
      postedBy: 'HR Admin'
    },
    {
      id: '3',
      month: 'March',
      year: '2024',
      employerPension: 128000,
      employerNHF: 46000,
      employerNSITF: 12500,
      employerITF: 8500,
      totalContribution: 195000,
      status: 'Pending',
      postedDate: '2024-03-15',
      postedBy: 'HR Admin'
    }
  ]);

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = ['2024', '2023', '2022'];

  const filteredContributions = contributions.filter(contrib => {
    const yearMatch = contrib.year === selectedYear;
    const monthMatch = selectedMonth === 'All' || contrib.month === selectedMonth;
    return yearMatch && monthMatch;
  });

  const totalYearlyContribution = filteredContributions.reduce((sum, contrib) => sum + contrib.totalContribution, 0);
  const totalPension = filteredContributions.reduce((sum, contrib) => sum + contrib.employerPension, 0);
  const totalNHF = filteredContributions.reduce((sum, contrib) => sum + contrib.employerNHF, 0);
  const totalNSITF = filteredContributions.reduce((sum, contrib) => sum + contrib.employerNSITF, 0);
  const totalITF = filteredContributions.reduce((sum, contrib) => sum + contrib.employerITF, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Posted': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Verified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['Month', 'Year', 'Pension', 'NHF', 'NSITF', 'ITF', 'Total', 'Status', 'Posted Date', 'Posted By'];
    const csvContent = [
      headers.join(','),
      ...filteredContributions.map(contrib => [
        contrib.month, contrib.year, contrib.employerPension, contrib.employerNHF,
        contrib.employerNSITF, contrib.employerITF, contrib.totalContribution,
        contrib.status, contrib.postedDate, contrib.postedBy
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statutory-contributions-${selectedYear}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Statutory Contribution</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.print()} size="sm" variant="outline">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button onClick={exportToCSV} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pension</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₦{totalPension.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total NHF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₦{totalNHF.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total NSITF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">₦{totalNSITF.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total ITF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₦{totalITF.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Employer Statutory Contributions
            <div className="flex gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Pension (₦)</TableHead>
                <TableHead>NHF (₦)</TableHead>
                <TableHead>NSITF (₦)</TableHead>
                <TableHead>ITF (₦)</TableHead>
                <TableHead>Total (₦)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead>Posted By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell className="font-medium">{contribution.month}</TableCell>
                  <TableCell>{contribution.year}</TableCell>
                  <TableCell>₦{contribution.employerPension.toLocaleString()}</TableCell>
                  <TableCell>₦{contribution.employerNHF.toLocaleString()}</TableCell>
                  <TableCell>₦{contribution.employerNSITF.toLocaleString()}</TableCell>
                  <TableCell>₦{contribution.employerITF.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">₦{contribution.totalContribution.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contribution.status)}>
                      {contribution.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(contribution.postedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{contribution.postedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredContributions.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Contributions for {selectedMonth === 'All' ? selectedYear : `${selectedMonth} ${selectedYear}`}:</span>
                <span className="text-xl font-bold text-green-600">₦{totalYearlyContribution.toLocaleString()}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatutoryContribution;