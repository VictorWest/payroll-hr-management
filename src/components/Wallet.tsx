import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Wallet as WalletIcon,
  Plus,
  Minus,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Wallet: React.FC = () => {
  const [balance] = useState(125450);
  const [fundAmount, setFundAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 50000,
      description: 'Wallet Funding',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'debit',
      amount: 45000,
      description: 'Payroll Disbursement',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'credit',
      amount: 120450,
      description: 'Initial Deposit',
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: 4,
      type: 'debit',
      amount: 25000,
      description: 'Service Fee',
      date: '2024-01-08',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <WalletIcon className="h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Available Balance</span>
            <WalletIcon className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₦{balance.toLocaleString()}</div>
          <p className="text-green-100 mt-2">Last updated: Today, 2:30 PM</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <Tabs defaultValue="fund" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fund">Fund Wallet</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="fund" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-green-600" />
                <span>Fund Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fund-amount">Amount</Label>
                <Input
                  id="fund-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => setFundAmount('10000')}>₦10,000</Button>
                <Button variant="outline" onClick={() => setFundAmount('50000')}>₦50,000</Button>
                <Button variant="outline" onClick={() => setFundAmount('100000')}>₦100,000</Button>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Fund Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Minus className="h-5 w-5 text-red-600" />
                <span>Withdraw Funds</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Amount</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-600">
                Available balance: ₦{balance.toLocaleString()}
              </div>
              <Button className="w-full" variant="destructive">
                <ArrowDownLeft className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <ArrowUpRight className="h-4 w-4" /> : 
                            <ArrowDownLeft className="h-4 w-4" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                        </span>
                        {getStatusIcon(transaction.status)}
                      </div>
                    </div>
                    {index < transactions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;