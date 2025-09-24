import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NextOfKinFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const NextOfKinForm: React.FC<NextOfKinFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      nextOfKin: {
        ...formData.nextOfKin,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next of Kin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nokFullName">Full Name</Label>
            <Input
              id="nokFullName"
              value={formData.nextOfKin?.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="nokPhoneNumber">Phone Number</Label>
            <Input
              id="nokPhoneNumber"
              value={formData.nextOfKin?.phoneNumber || ''}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+234..."
            />
          </div>
        </div>

        <div>
          <Label htmlFor="nokResidentialAddress">Residential Address</Label>
          <Textarea
            id="nokResidentialAddress"
            value={formData.nextOfKin?.residentialAddress || ''}
            onChange={(e) => handleInputChange('residentialAddress', e.target.value)}
            placeholder="Enter residential address"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nokRelationship">Relationship</Label>
            <Input
              id="nokRelationship"
              value={formData.nextOfKin?.relationship || ''}
              onChange={(e) => handleInputChange('relationship', e.target.value)}
              placeholder="e.g., Spouse, Parent, Sibling"
            />
          </div>
          <div>
            <Label htmlFor="nokEmail">Email</Label>
            <Input
              id="nokEmail"
              type="email"
              value={formData.nextOfKin?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nokPlaceOfWork">Place of Work</Label>
            <Input
              id="nokPlaceOfWork"
              value={formData.nextOfKin?.placeOfWork || ''}
              onChange={(e) => handleInputChange('placeOfWork', e.target.value)}
              placeholder="Company/Organization name"
            />
          </div>
          <div>
            <Label htmlFor="nokWorkAddress">Work Address</Label>
            <Input
              id="nokWorkAddress"
              value={formData.nextOfKin?.workAddress || ''}
              onChange={(e) => handleInputChange('workAddress', e.target.value)}
              placeholder="Work address"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextOfKinForm;