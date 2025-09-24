import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Download, Send, FileText, DollarSign, Filter } from 'lucide-react';
import PayrollTitleSelector from '@/components/PayrollTitleSelector';
import PayrollColumnFilter from '@/components/PayrollColumnFilter';

interface PayrollContainer {
  id: string;
  title: string;
  month: string;
  year: string;
  employeeCount: number;
  totalAmount: number;
  status: 'posted' | 'draft';
}

const PayrollProcessing: React.FC = () => {
  const [processingMode, setProcessingMode] = useState<'disbursement' | 'report' | null>(null);
  const [showTitleSelector, setShowTitleSelector] = useState(false);
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState<string | null>(null);
  const [walletBalance] = useState(150000);
  const [expectedDisbursement] = useState(180000);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  
  const [postedPayrolls] = useState<PayrollContainer[]>([
    {
      id: '1',
      title: 'January 2025 Payroll',
      month: 'January',
      year: '2025',
      employeeCount: 45,
      totalAmount: 2500000,
      status: 'posted'
    },
    {
      id: '2',
      title: 'February 2025 Payroll',
      month: 'February',
      year: '2025',
      employeeCount: 48,
      totalAmount: 2750000,
      status: 'posted'
    }
  ]);

  const handleCsvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    }
  };

  const handleGeneratePayroll = () => {
    setShowTitleSelector(true);
  };

  const handleTitleSelection = (selectedTitles: any[]) => {
    console.log('Selected titles for payroll generation:', selectedTitles);
    setShowTitleSelector(false);
  };

  const handleFilterPayroll = (payrollId: string) => {
    setSelectedPayrollId(payrollId);
    setShowColumnFilter(true);
  };

  const handleApplyColumnFilter = (selectedColumns: string[]) => {
    console.log('Generating filtered payroll report with columns:', selectedColumns);
    console.log('For payroll ID:', selectedPayrollId);
    setShowColumnFilter(false);
    setSelectedPayrollId(null);
  };

  const handleDisbursement = () => {
    if (walletBalance < expectedDisbursement) {
      alert('Insufficient wallet balance. Please deposit funds to proceed.');
      return;
    }
    console.log('Processing disbursement to Mipaymaster...');
  };

  if (showColumnFilter) {
    return (
      <div className="space-y-6">
        <PayrollColumnFilter
          onApplyFilter={handleApplyColumnFilter}
          onClose={() => {
            setShowColumnFilter(false);
            setSelectedPayrollId(null);
          }}
        />
      </div>
    );
  }

  if (showTitleSelector) {
    return (
      <div className="space-y-6">
        <PayrollTitleSelector
          onGenerate={handleTitleSelection}
          onCancel={() => setShowTitleSelector(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Payroll</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGeneratePayroll}
            className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-6 h-6 mr-2" />
            Generate Payroll
          </Button>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Select from posted payroll titles to generate payroll reports
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posted Payrolls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postedPayrolls.map((payroll) => (
              <div key={payroll.id} className="p-4 border rounded-lg bg-white shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{payroll.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Employees: {payroll.employeeCount}</span>
                      <span>Total: ₦{payroll.totalAmount.toLocaleString()}</span>
                      <Badge variant="secondary">{payroll.status}</Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleFilterPayroll(payroll.id)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter Columns
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Processing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={processingMode === 'disbursement' ? 'default' : 'outline'}
              onClick={() => setProcessingMode('disbursement')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Send className="w-6 h-6 mb-2" />
              <span>Proceed to Disbursement</span>
            </Button>
            <Button
              variant={processingMode === 'report' ? 'default' : 'outline'}
              onClick={() => setProcessingMode('report')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <FileText className="w-6 h-6 mb-2" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {processingMode === 'disbursement' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Payroll Disbursement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Wallet Balance</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">₦{walletBalance.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Expected Disbursement</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">₦{expectedDisbursement.toLocaleString()}</p>
              </div>
            </div>

            {walletBalance < expectedDisbursement && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient wallet balance! You need an additional ₦{(expectedDisbursement - walletBalance).toLocaleString()} to complete this disbursement.
                  <Button variant="link" className="p-0 h-auto ml-2">Deposit Now</Button>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label>Upload Payroll CSV File</Label>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="mt-1"
                />
                {csvFile && (
                  <div className="mt-2 p-2 bg-green-50 rounded border">
                    <p className="text-sm text-green-700">File uploaded: {csvFile.name}</p>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={handleDisbursement}
                disabled={!csvFile || walletBalance < expectedDisbursement}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send to Mipaymaster for Disbursement
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PayrollProcessing;