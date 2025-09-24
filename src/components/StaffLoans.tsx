import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, Plus, Search } from 'lucide-react';
import LoanRequestForm from './LoanRequestForm';

const StaffLoans: React.FC = () => {
  const [adjustmentResults, setAdjustmentResults] = useState<{[key: string]: {status: 'pending' | 'accepted' | 'declined', data: any}}>({});
  const [adjustingLoan, setAdjustingLoan] = useState<string | null>(null);
  const [adjustmentData, setAdjustmentData] = useState({ approvedAmount: '', approvedDeduction: '', duration: '' });
  const [showLoanRequestForm, setShowLoanRequestForm] = useState(false);
  const [loanRequests, setLoanRequests] = useState<any[]>([]);

  const pendingLoans = [
    { id: '1', employee: 'John Doe', amount: 500000, duration: 12, deduction: 45000, purpose: 'Medical', date: '2024-01-15', status: 'pending' },
    { id: '2', employee: 'Jane Smith', amount: 300000, duration: 8, deduction: 40000, purpose: 'Education', date: '2024-01-20', status: 'adjusted' }
  ];

  const handleLoanAction = (id: string, action: string) => {
    if (action === 'adjust') {
      setAdjustingLoan(id);
    } else if (action === 'save-adjust') {
      setAdjustmentResults({ ...adjustmentResults, [id]: { status: 'pending', data: adjustmentData } });
      setAdjustingLoan(null);
    }
  };

  const handleAdjustmentResponse = (loanId: string, response: 'accepted' | 'declined') => {
    setAdjustmentResults({ ...adjustmentResults, [loanId]: { ...adjustmentResults[loanId], status: response } });
  };

  const handleLoanRequestSubmit = (data: any) => {
    const newRequest = {
      id: Date.now().toString(),
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setLoanRequests([...loanRequests, newRequest]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Staff Loans</h2>
        </div>
        <Button onClick={() => setShowLoanRequestForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Loan Request
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="requests">Loan Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Loan Approvals (Super Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingLoans.map(loan => (
                    <React.Fragment key={loan.id}>
                      <TableRow>
                        <TableCell>{loan.employee}</TableCell>
                        <TableCell>₦{loan.amount.toLocaleString()}</TableCell>
                        <TableCell>{loan.duration} months</TableCell>
                        <TableCell>{loan.purpose}</TableCell>
                        <TableCell>
                          {adjustingLoan === loan.id ? (
                            <div className="space-y-2">
                              <Input placeholder="Approved Amount" size="sm" value={adjustmentData.approvedAmount} onChange={(e) => setAdjustmentData({...adjustmentData, approvedAmount: e.target.value})} />
                              <Input placeholder="Approved Deduction" size="sm" value={adjustmentData.approvedDeduction} onChange={(e) => setAdjustmentData({...adjustmentData, approvedDeduction: e.target.value})} />
                              <Input placeholder="Duration" size="sm" value={adjustmentData.duration} onChange={(e) => setAdjustmentData({...adjustmentData, duration: e.target.value})} />
                              <div className="flex gap-1">
                                <Button size="sm" onClick={() => handleLoanAction(loan.id, 'save-adjust')}>Save</Button>
                                <Button size="sm" variant="outline" onClick={() => setAdjustingLoan(null)}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <Button size="sm" className="bg-green-600" onClick={() => handleLoanAction(loan.id, 'approve')}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={() => handleLoanAction(loan.id, 'reject')}>Reject</Button>
                              <Button size="sm" variant="outline" onClick={() => handleLoanAction(loan.id, 'adjust')}>Adjust</Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                      {adjustmentResults[loan.id] && (
                        <TableRow className="bg-gray-50">
                          <TableCell colSpan={5}>
                            <div className="p-4 border rounded">
                              <h4 className="font-semibold mb-2">Adjustment Result</h4>
                              <div className="grid grid-cols-3 gap-4 mb-3">
                                <div><strong>Approved Amount:</strong> ₦{adjustmentResults[loan.id].data.approvedAmount}</div>
                                <div><strong>Approved Deduction:</strong> ₦{adjustmentResults[loan.id].data.approvedDeduction}</div>
                                <div><strong>Duration:</strong> {adjustmentResults[loan.id].data.duration} months</div>
                              </div>
                              {adjustmentResults[loan.id].status === 'pending' ? (
                                <div className="flex gap-2">
                                  <Button size="sm" className="bg-green-600" onClick={() => handleAdjustmentResponse(loan.id, 'accepted')}>Accept</Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleAdjustmentResponse(loan.id, 'declined')}>Decline</Button>
                                </div>
                              ) : (
                                <Badge variant={adjustmentResults[loan.id].status === 'accepted' ? 'default' : 'destructive'}>
                                  {adjustmentResults[loan.id].status === 'accepted' ? 'Accepted' : 'Declined'}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Loan Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {loanRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No loan requests submitted yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Monthly Deduction</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanRequests.map(request => (
                      <TableRow key={request.id}>
                        <TableCell>{request.employee}</TableCell>
                        <TableCell>₦{parseInt(request.requestAmount).toLocaleString()}</TableCell>
                        <TableCell>{request.loanDuration} months</TableCell>
                        <TableCell>₦{parseInt(request.monthDeduction).toLocaleString()}</TableCell>
                        <TableCell>{request.purpose}</TableCell>
                        <TableCell>{request.dateOfApplication}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{request.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <LoanRequestForm 
        open={showLoanRequestForm} 
        onOpenChange={setShowLoanRequestForm}
        onSubmit={handleLoanRequestSubmit}
      />
    </div>
  );
};

export default StaffLoans;