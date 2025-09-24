import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Target, TrendingUp } from 'lucide-react';
import AppraisalForms from './AppraisalForms';
import AppraisalInterview from './AppraisalInterview';

interface Employee {
  id: string;
  name: string;
  department: string;
  title: string;
}

interface MetricCategory {
  id: string;
  name: string;
  metrics: string[];
}

const PerformanceEvaluation: React.FC = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'department' | 'title'>('department');
  const [selectedCategory, setSelectedCategory] = useState('');

  const employees: Employee[] = [
    { id: '1', name: 'John Doe', department: 'IT', title: 'Software Developer' },
    { id: '2', name: 'Jane Smith', department: 'HR', title: 'HR Manager' },
    { id: '3', name: 'Mike Johnson', department: 'Sales', title: 'Sales Representative' },
    { id: '4', name: 'Sarah Wilson', department: 'IT', title: 'Project Manager' }
  ];

  const metricCategories: MetricCategory[] = [
    {
      id: 'work-quality',
      name: 'Work Quality & Quantity Metrics',
      metrics: [
        'Task Completion Rate',
        'Errors Made',
        'Units Produced',
        'Number of Sales',
        'Handling Time and Resolution Rates',
        'Number of Calls/Emails Handled',
        'Customer Issue Resolution',
        'Conversion Rate'
      ]
    },
    {
      id: 'efficiency',
      name: 'Efficiency Metrics',
      metrics: [
        'Task Completion Time',
        'Cost Per Task',
        'Absenteeism Rate',
        'Overtime Per Employee',
        'Task Prioritization'
      ]
    },
    {
      id: 'performance-appraisal',
      name: 'Performance Appraisal & Feedback Metrics',
      metrics: [
        'Management by Objectives (MBO)',
        'Manager Appraisals',
        '360-Degree and 180-Degree Feedback'
      ]
    }
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEmployeeSelection = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const handleCreateAppraisal = () => {
    if (selectedEmployees.length > 0 && selectedCategory) {
      console.log('Creating appraisal for:', selectedEmployees, 'Category:', selectedCategory);
      setSelectedEmployees([]);
      setSelectedCategory('');
    }
  };

  const selectedCategoryData = metricCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Performance Evaluation</h1>
        <Button onClick={handleCreateAppraisal} disabled={!selectedEmployees.length || !selectedCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Create Appraisal Form
        </Button>
      </div>

      <Tabs defaultValue="setup" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="setup">Setup Evaluation</TabsTrigger>
          <TabsTrigger value="appraisal-forms">Appraisal Forms</TabsTrigger>
          <TabsTrigger value="appraisal-interviews">Appraisal Interview</TabsTrigger>
          <TabsTrigger value="categories">Metric Categories</TabsTrigger>
          <TabsTrigger value="evaluations">Active Evaluations</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="w-full space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search & Select Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Search Employees</Label>
                  <Input
                    placeholder="Search by name, department, or title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Filter By</Label>
                  <Select value={filterBy} onValueChange={(value) => setFilterBy(value as 'department' | 'title')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="title">Job Title</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-medium">Select Employees for Evaluation</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {filteredEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={employee.id}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) => handleEmployeeSelection(employee.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={employee.id} className="font-medium cursor-pointer">
                          {employee.name}
                        </Label>
                        <p className="text-sm text-gray-500">{employee.department} - {employee.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedEmployees.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Selected Employees ({selectedEmployees.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployees.map((empId) => {
                        const emp = employees.find(e => e.id === empId);
                        return emp ? (
                          <Badge key={empId} variant="secondary">{emp.name}</Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Select Evaluation Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Choose Performance Metric Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {metricCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedCategoryData && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-3">{selectedCategoryData.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedCategoryData.metrics.map((metric, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appraisal-forms" className="w-full">
          <AppraisalForms />
        </TabsContent>

        <TabsContent value="appraisal-interviews" className="w-full">
          <AppraisalInterview />
        </TabsContent>

        <TabsContent value="categories" className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricCategories.map((category) => (
              <Card key={category.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.metrics.slice(0, 5).map((metric, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{metric}</span>
                      </div>
                    ))}
                    {category.metrics.length > 5 && (
                      <p className="text-sm text-gray-500 mt-2">
                        +{category.metrics.length - 5} more metrics
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evaluations" className="w-full space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Active Performance Evaluations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No active evaluations yet.</p>
                <p className="text-sm">Create your first evaluation using the Setup tab.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceEvaluation;