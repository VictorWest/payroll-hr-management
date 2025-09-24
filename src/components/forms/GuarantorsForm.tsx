import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Upload } from 'lucide-react';

interface Guarantor {
  id: string;
  fullName: string;
  phoneNumber: string;
  residentialAddress: string;
  relationship: string;
  email: string;
  placeOfWork: string;
  workAddress: string;
}

interface GuarantorsFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const GuarantorsForm: React.FC<GuarantorsFormProps> = ({ formData, setFormData }) => {
  const [guarantors, setGuarantors] = useState<Guarantor[]>(formData.guarantors || []);

  const addGuarantor = () => {
    const newGuarantor: Guarantor = {
      id: Date.now().toString(),
      fullName: '',
      phoneNumber: '',
      residentialAddress: '',
      relationship: '',
      email: '',
      placeOfWork: '',
      workAddress: ''
    };
    const updatedGuarantors = [...guarantors, newGuarantor];
    setGuarantors(updatedGuarantors);
    setFormData({ ...formData, guarantors: updatedGuarantors });
  };

  const removeGuarantor = (id: string) => {
    const updatedGuarantors = guarantors.filter(g => g.id !== id);
    setGuarantors(updatedGuarantors);
    setFormData({ ...formData, guarantors: updatedGuarantors });
  };

  const updateGuarantor = (id: string, field: string, value: string) => {
    const updatedGuarantors = guarantors.map(g => 
      g.id === id ? { ...g, [field]: value } : g
    );
    setGuarantors(updatedGuarantors);
    setFormData({ ...formData, guarantors: updatedGuarantors });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Guarantors
          <Button onClick={addGuarantor} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Guarantor
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {guarantors.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No guarantors added yet. Click "Add Guarantor" to get started.
          </p>
        ) : (
          guarantors.map((guarantor, index) => (
            <div key={guarantor.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Guarantor {index + 1}</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeGuarantor(guarantor.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={guarantor.fullName}
                    onChange={(e) => updateGuarantor(guarantor.id, 'fullName', e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={guarantor.phoneNumber}
                    onChange={(e) => updateGuarantor(guarantor.id, 'phoneNumber', e.target.value)}
                    placeholder="+234..."
                  />
                </div>
              </div>

              <div>
                <Label>Residential Address</Label>
                <Textarea
                  value={guarantor.residentialAddress}
                  onChange={(e) => updateGuarantor(guarantor.id, 'residentialAddress', e.target.value)}
                  placeholder="Enter residential address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Relationship</Label>
                  <Input
                    value={guarantor.relationship}
                    onChange={(e) => updateGuarantor(guarantor.id, 'relationship', e.target.value)}
                    placeholder="e.g., Friend, Colleague"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={guarantor.email}
                    onChange={(e) => updateGuarantor(guarantor.id, 'email', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Place of Work</Label>
                  <Input
                    value={guarantor.placeOfWork}
                    onChange={(e) => updateGuarantor(guarantor.id, 'placeOfWork', e.target.value)}
                    placeholder="Company/Organization name"
                  />
                </div>
                <div>
                  <Label>Work Address</Label>
                  <Input
                    value={guarantor.workAddress}
                    onChange={(e) => updateGuarantor(guarantor.id, 'workAddress', e.target.value)}
                    placeholder="Work address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Documents</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload ID
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Guarantor Form
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default GuarantorsForm;