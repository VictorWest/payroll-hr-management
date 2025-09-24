import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalInfoFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Personal information saved successfully"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Personal Information
          <Button onClick={handleSave} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="stateOfOrigin">State of Origin</Label>
            <Input
              id="stateOfOrigin"
              value={formData.stateOfOrigin || ''}
              onChange={(e) => handleChange('stateOfOrigin', e.target.value)}
              placeholder="Enter state of origin"
            />
          </div>
          <div>
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select value={formData.maritalStatus || ''} onValueChange={(value) => handleChange('maritalStatus', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numberOfChildren">Number of Children</Label>
            <Input
              id="numberOfChildren"
              type="number"
              value={formData.numberOfChildren || ''}
              onChange={(e) => handleChange('numberOfChildren', e.target.value)}
              placeholder="Enter number of children"
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="residentialAddress">Residential Address</Label>
          <Textarea
            id="residentialAddress"
            value={formData.residentialAddress || ''}
            onChange={(e) => handleChange('residentialAddress', e.target.value)}
            placeholder="Enter residential address"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;