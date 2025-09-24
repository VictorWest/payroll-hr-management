import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface WorkExperience {
  id: string;
  companyName: string;
  positionHeld: string;
  startDate: string;
  endDate: string;
}

interface WorkHistoryFormProps {
  formData: any;
  setFormData: (data: any) => void;
}

const WorkHistoryForm: React.FC<WorkHistoryFormProps> = ({ formData, setFormData }) => {
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(formData.workHistory || []);

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      companyName: '',
      positionHeld: '',
      startDate: '',
      endDate: ''
    };
    const updatedHistory = [...workHistory, newExperience];
    setWorkHistory(updatedHistory);
    setFormData({ ...formData, workHistory: updatedHistory });
  };

  const removeWorkExperience = (id: string) => {
    const updatedHistory = workHistory.filter(exp => exp.id !== id);
    setWorkHistory(updatedHistory);
    setFormData({ ...formData, workHistory: updatedHistory });
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    const updatedHistory = workHistory.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setWorkHistory(updatedHistory);
    setFormData({ ...formData, workHistory: updatedHistory });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Work History
          <Button onClick={addWorkExperience} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {workHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No work experience added yet. Click "Add Experience" to get started.
          </p>
        ) : (
          workHistory.map((experience, index) => (
            <div key={experience.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeWorkExperience(experience.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    value={experience.companyName}
                    onChange={(e) => updateWorkExperience(experience.id, 'companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label>Position Held</Label>
                  <Input
                    value={experience.positionHeld}
                    onChange={(e) => updateWorkExperience(experience.id, 'positionHeld', e.target.value)}
                    placeholder="Enter position/role"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => updateWorkExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => updateWorkExperience(experience.id, 'endDate', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty if currently employed
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default WorkHistoryForm;