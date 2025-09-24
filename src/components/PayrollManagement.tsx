import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Send, DollarSign, Download, Users, Calculator, CreditCard } from 'lucide-react';
import PayrollPosting from '@/components/PayrollPosting';
import PayrollProcessing from '@/components/PayrollProcessing';
import StaffLoans from '@/components/StaffLoans';
import AttendanceManagement from '@/components/AttendanceManagement';
import StatutoryContribution from '@/components/StatutoryContribution';

interface PayrollRecord {
  id: string;
  employeeName: string;
  basicSalary: number;
  housingAllowance: number;
  transportAllowance: number;
  mealAllowance: number;
  overtimeAllowance: number;
  totalAllowances: number;
  pensionDeduction: number;
  taxDeduction: number;
  loanDeduction: number;
  totalDeductions: number;
  netPay: number;
  status: 'pending' | 'processed' | 'disbursed';
  month: string;
}

const PayrollManagement: React.FC = () => {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      basicSalary: 75000,
      housingAllowance: 25000,
      transportAllowance: 15000,
      mealAllowance: 10000,
      overtimeAllowance: 5000,
      totalAllowances: 55000,
      pensionDeduction: 6000,
      taxDeduction: 12000,
      loanDeduction: 8000,
      totalDeductions: 26000,
      netPay: 104000,
      status: 'processed',
      month: 'March 2024'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      basicSalary: 85000,
      housingAllowance: 30000,
      transportAllowance: 18000,
      mealAllowance: 12000,
      overtimeAllowance: 7000,
      totalAllowances: 67000,
      pensionDeduction: 6800,
      taxDeduction: 15000,
      loanDeduction: 10000,
      totalDeductions: 31800,
      netPay: 120200,
      status: 'pending',
      month: 'March 2024'
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'disbursed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Payroll Management</h1>
        <Button className="w-full sm:w-auto">
          <DollarSign className="mr-2 h-4 w-4" />
          Generate Payroll
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-8">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="posting" className="text-xs sm:text-sm">Posting</TabsTrigger>
          <TabsTrigger value="processing" className="text-xs sm:text-sm">Processing</TabsTrigger>
          <TabsTrigger value="payslips" className="text-xs sm:text-sm">Pay Slips</TabsTrigger>
          <TabsTrigger value="statutory" className="text-xs sm:text-sm">Statutory</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">Reports</TabsTrigger>
          <TabsTrigger value="loans" className="text-xs sm:text-sm">Staff Loans</TabsTrigger>
          <TabsTrigger value="attendance" className="text-xs sm:text-sm">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center justify-between">
                  Total Payroll
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">₦224,200</div>
                <p className="text-xs text-muted-foreground">March 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center justify-between">
                  Employees
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center justify-between">
                  Processed
                  <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Out of 2</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium flex items-center justify-between">
                  Pending
                  <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Awaiting</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posting">
          <PayrollPosting />
        </TabsContent>

        <TabsContent value="processing">
          <PayrollProcessing />
        </TabsContent>

        <TabsContent value="payslips">
          <Card>
            <CardHeader>
              <CardTitle>Pay Slips with Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col sm:flex-row gap-2">
                <Button className="w-full sm:w-auto">Generate All Pay Slips</Button>
                <Button variant="outline" className="w-full sm:w-auto">Generate Individual</Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Housing</TableHead>
                      <TableHead>Transport</TableHead>
                      <TableHead>Meal</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Total Allowances</TableHead>
                      <TableHead>Pension</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Loan</TableHead>
                      <TableHead>Total Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.employeeName}</TableCell>
                        <TableCell>₦{record.basicSalary.toLocaleString()}</TableCell>
                        <TableCell>₦{record.housingAllowance.toLocaleString()}</TableCell>
                        <TableCell>₦{record.transportAllowance.toLocaleString()}</TableCell>
                        <TableCell>₦{record.mealAllowance.toLocaleString()}</TableCell>
                        <TableCell>₦{record.overtimeAllowance.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold text-green-600">₦{record.totalAllowances.toLocaleString()}</TableCell>
                        <TableCell>₦{record.pensionDeduction.toLocaleString()}</TableCell>
                        <TableCell>₦{record.taxDeduction.toLocaleString()}</TableCell>
                        <TableCell>₦{record.loanDeduction.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold text-red-600">₦{record.totalDeductions.toLocaleString()}</TableCell>
                        <TableCell className="font-bold text-blue-600">₦{record.netPay.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" title="View">
                              <FileText className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" title="Download">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" title="Send">
                              <Send className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statutory">
          <StatutoryContribution />
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="monthly-summary" />
                  <label htmlFor="monthly-summary" className="text-sm font-medium">Monthly Payroll Summary</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="employee-payslips" />
                  <label htmlFor="employee-payslips" className="text-sm font-medium">Employee Payslips</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="staff-loan-report" />
                  <label htmlFor="staff-loan-report" className="text-sm font-medium">Staff Loan Report</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="attendance-report" />
                  <label htmlFor="attendance-report" className="text-sm font-medium">Attendance Report</label>
                </div>
                <Button className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected Report
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export to PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export to CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans">
          <StaffLoans />
        </TabsContent>

        <TabsContent value="attendance">
          <AttendanceManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollManagement;