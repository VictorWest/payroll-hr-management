import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Search, Printer } from 'lucide-react';
import EmployeeRegistration from './EmployeeRegistration';
import EmployeeEditDialog from './EmployeeEditDialog';
import EmployeeSalaryTax from './EmployeeSalaryTax';
import EmployeePAYESection from './EmployeePAYESection';
import EmployeePensionSection from './EmployeePensionSection';

interface Employee {
  id: string;
  fullName: string;
  email: string;
  position: string;
  department: string;
  monthlySalary: number;
  employmentStatus: 'Active' | 'Inactive' | 'Terminated' | 'On Leave' | 'Probation';
  startDate: string;
  phoneNumber: string;
}

interface EditRecord {
  id: string;
  employeeName: string;
  reason: string;
  editedBy: string;
  editedAt: string;
  changes: string;
}

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      fullName: 'Adebayo Johnson',
      email: 'adebayo.johnson@company.com',
      position: 'Software Engineer',
      department: 'Information Technology',
      monthlySalary: 450000,
      employmentStatus: 'Active',
      startDate: '2023-01-15',
      phoneNumber: '+2348012345678'
    },
    {
      id: '2',
      fullName: 'Fatima Abubakar',
      email: 'fatima.abubakar@company.com',
      position: 'HR Manager',
      department: 'Human Resources',
      monthlySalary: 380000,
      employmentStatus: 'Active',
      startDate: '2022-08-10',
      phoneNumber: '+2348023456789'
    },
    {
      id: '3',
      fullName: 'Chidi Okafor',
      email: 'chidi.okafor@company.com',
      position: 'Finance Director',
      department: 'Finance',
      monthlySalary: 520000,
      employmentStatus: 'Active',
      startDate: '2021-03-22',
      phoneNumber: '+2348034567890'
    }
  ]);

  const [editRecords, setEditRecords] = useState<EditRecord[]>([]);
  const [activeTab, setActiveTab] = useState('register');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEmployeeEdit = (employee: Employee, editRecord: EditRecord) => {
    setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    setEditRecords([...editRecords, editRecord]);
  };

  const openEditDialog = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Probation': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Button onClick={() => setActiveTab('register')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="register">Employee Registration</TabsTrigger>
          <TabsTrigger value="list">Employee Register</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="salary">Salary Components</TabsTrigger>
          <TabsTrigger value="paye">PAYE Tax</TabsTrigger>
          <TabsTrigger value="pension">Pension</TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <EmployeeRegistration />
        </TabsContent>

        <TabsContent value="salary">
          <EmployeeSalaryTax />
        </TabsContent>

        <TabsContent value="paye">
          <EmployeePAYESection />
        </TabsContent>

        <TabsContent value="pension">
          <EmployeePensionSection />
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Employee Register
                <div className="flex gap-2">
                  <Button onClick={() => window.print()} size="sm" variant="outline">
                    <Printer className="h-4 w-4 mr-1" />
                    Print
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Salary (₦)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.fullName}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>₦{employee.monthlySalary.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employee.employmentStatus)}>
                          {employee.employmentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedEmployee(employee); setActiveTab('profile'); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openEditDialog(employee)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {editRecords.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Records of Modification (ROM)</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    {editRecords.map((record) => (
                      <div key={record.id} className="text-sm text-gray-600 mb-2">
                        <strong>{record.employeeName}</strong> edited by {record.editedBy} on {new Date(record.editedAt).toLocaleString()}
                        <br />Reason: {record.reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          {selectedEmployee ? (
            <Card>
              <CardHeader>
                <CardTitle>Employee Profile - {selectedEmployee.fullName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                      <p className="text-lg">{selectedEmployee.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p>{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone Number</Label>
                      <p>{selectedEmployee.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Position</Label>
                      <p className="text-lg">{selectedEmployee.position}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Department</Label>
                      <p>{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Monthly Salary</Label>
                      <p className="text-lg font-semibold text-green-600">₦{selectedEmployee.monthlySalary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Select an employee from the register to view their profile</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <EmployeeEditDialog
        employee={editingEmployee}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEmployeeEdit}
      />
    </div>
  );
};

export default EmployeeManagement;