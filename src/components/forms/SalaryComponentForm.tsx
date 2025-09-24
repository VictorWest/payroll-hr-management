import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import EmployeePAYESection from '../EmployeePAYESection';
import EmployeePensionSection from '../EmployeePensionSection';
import { useToast } from '@/hooks/use-toast';

interface SalaryComponentFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const SalaryComponentForm: React.FC<SalaryComponentFormProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Salary & Tax information saved successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Salary & Tax Information
            <Button onClick={handleSave} size="sm">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <EmployeePAYESection />
            
            <Separator />
            
            <EmployeePensionSection />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryComponentForm;