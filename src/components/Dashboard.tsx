import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, DollarSign, FileText, Calendar, LogOut, Crown } from 'lucide-react';

interface EditRecord {
  id: string;
  employeeName: string;
  reason: string;
  editedBy: string;
  editedAt: string;
  changes: string;
}

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Employees', value: '156', icon: Users, color: 'text-blue-600' },
    { title: 'Monthly Payroll', value: '₦4,523,000', icon: DollarSign, color: 'text-green-600' },
    { title: 'Pending Reports', value: '8', icon: FileText, color: 'text-orange-600' },
    { title: 'Upcoming Events', value: '12', icon: Calendar, color: 'text-purple-600' },
  ];

  // Sample ROM data that would come from context/state management
  const romRecords: EditRecord[] = [
    {
      id: '1',
      employeeName: 'John Doe',
      reason: 'Updated salary information',
      editedBy: 'HR Admin',
      editedAt: new Date().toISOString(),
      changes: 'Employee details updated'
    }
  ];

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold"><span className="text-blue-600">MiPay</span><span className="text-purple-600">Master</span> Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Payroll processed for March 2024</p>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">New employee John Doe added</p>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm">Performance review completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Records of Modification (ROM)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {romRecords.length > 0 ? (
                romRecords.map((record) => (
                  <div key={record.id} className="p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium">{record.employeeName}</div>
                    <div className="text-xs text-gray-600">Edited by {record.editedBy} on {new Date(record.editedAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Reason: {record.reason}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent modifications</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="mr-2 h-5 w-5 text-yellow-600" />
            Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Plan:</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Premium</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Expires:</span>
              <span className="text-sm text-gray-600">Apr 30, 2024</span>
            </div>
            <Button className="w-full mt-3" size="sm">
              Manage Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;