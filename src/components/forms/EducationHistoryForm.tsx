import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface EducationHistoryFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const EducationHistoryForm: React.FC<EducationHistoryFormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [field]: value
      }
    });
  };

  const qualifications = [
    'O Level',
    'ND (National Diploma)',
    'HND (Higher National Diploma)',
    'BA (Bachelor of Arts)',
    'BSc (Bachelor of Science)',
    'MA (Master of Arts)',
    'MSc (Master of Science)',
    'PhD (Doctor of Philosophy)',
    'Others'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="highestQualification">Highest Qualification</Label>
            <Select 
              value={formData.education?.highestQualification || ''} 
              onValueChange={(value) => handleInputChange('highestQualification', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select qualification" />
              </SelectTrigger>
              <SelectContent>
                {qualifications.map(qual => (
                  <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="institutionAttended">Institution Attended</Label>
            <Input
              id="institutionAttended"
              value={formData.education?.institutionAttended || ''}
              onChange={(e) => handleInputChange('institutionAttended', e.target.value)}
              placeholder="e.g., University of Lagos"
            />
          </div>
        </div>

        <div>
          <Label>Upload Credentials</Label>
          <Button variant="outline" className="w-full justify-start">
            <Upload className="mr-2 h-4 w-4" />
            Choose File
          </Button>
          <p className="text-sm text-gray-500 mt-1">
            Upload certificates, transcripts, or other educational documents
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationHistoryForm;