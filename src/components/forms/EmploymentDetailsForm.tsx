import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmploymentDetailsFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const EmploymentDetailsForm: React.FC<EmploymentDetailsFormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Employment details saved successfully"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Employment Details
          <Button onClick={handleSave} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              value={formData.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="Enter department"
            />
          </div>
          <div>
            <Label htmlFor="position">Position/Job Title *</Label>
            <Input
              id="position"
              value={formData.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              placeholder="Enter position"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate || ''}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="monthlySalary">Monthly Salary (₦) *</Label>
            <Input
              id="monthlySalary"
              type="number"
              value={formData.monthlySalary || ''}
              onChange={(e) => handleChange('monthlySalary', e.target.value)}
              placeholder="Enter monthly salary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Select value={formData.employmentStatus || ''} onValueChange={(value) => handleChange('employmentStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="probation">Probation</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select value={formData.employmentType || ''} onValueChange={(value) => handleChange('employmentType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="reportingManager">Reporting Manager</Label>
          <Input
            id="reportingManager"
            value={formData.reportingManager || ''}
            onChange={(e) => handleChange('reportingManager', e.target.value)}
            placeholder="Enter reporting manager name"
          />
        </div>
        
        <div>
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            value={formData.jobDescription || ''}
            onChange={(e) => handleChange('jobDescription', e.target.value)}
            placeholder="Enter job description and responsibilities"
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentDetailsForm;