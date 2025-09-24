import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BankDetailsFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    toast({ title: "Success", description: "Bank details saved successfully" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Bank Details
          <Button onClick={handleSave} size="sm">
            <Save className="mr-2 h-4 w-4" />Save
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Account Name</Label>
            <Input value={formData.accountName || ''} onChange={(e) => handleChange('accountName', e.target.value)} placeholder="Enter account name" />
          </div>
          <div>
            <Label>Bank Name</Label>
            <Input value={formData.bankName || ''} onChange={(e) => handleChange('bankName', e.target.value)} placeholder="Enter bank name" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Account Number</Label>
            <Input value={formData.accountNumber || ''} onChange={(e) => handleChange('accountNumber', e.target.value)} placeholder="Enter account number" />
          </div>
          <div>
            <Label>Pension PIN</Label>
            <Input value={formData.pensionPin || ''} onChange={(e) => handleChange('pensionPin', e.target.value)} placeholder="Enter pension PIN" />
          </div>
        </div>
        {formData.pensionPin && (
          <div>
            <Label>Pension Commencement Date</Label>
            <Input type="date" value={formData.pensionCommencementDate || ''} onChange={(e) => handleChange('pensionCommencementDate', e.target.value)} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankDetailsForm;