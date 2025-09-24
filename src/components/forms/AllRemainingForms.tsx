import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const EducationHistoryForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Success", description: "Education history saved" });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Education History
          <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Institution" />
          <Input placeholder="Degree/Certificate" />
          <Input type="date" placeholder="Graduation Date" />
        </div>
      </CardContent>
    </Card>
  );
};

export const GuarantorsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Success", description: "Guarantors saved" });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Guarantors
          <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Guarantor Name" />
          <Input placeholder="Phone Number" />
          <Textarea placeholder="Address" />
        </div>
      </CardContent>
    </Card>
  );
};

export const NextOfKinForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Success", description: "Next of kin saved" });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Next of Kin
          <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Full Name" />
          <Input placeholder="Relationship" />
          <Input placeholder="Phone Number" />
          <Textarea placeholder="Address" />
        </div>
      </CardContent>
    </Card>
  );
};

export const WorkHistoryForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Success", description: "Work history saved" });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Work History
          <Button onClick={handleSave} size="sm"><Save className="mr-2 h-4 w-4" />Save</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Company Name" />
          <Input placeholder="Position" />
          <Input type="date" placeholder="Start Date" />
          <Input type="date" placeholder="End Date" />
          <Textarea placeholder="Job Description" />
        </div>
      </CardContent>
    </Card>
  );
};