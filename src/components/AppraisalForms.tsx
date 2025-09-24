import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AppraisalForm {
  id: string;
  title: string;
  category: string;
  employees: string[];
  status: 'draft' | 'active' | 'completed';
  createdDate: string;
}

const AppraisalForms: React.FC = () => {
  const [appraisalForms, setAppraisalForms] = useState<AppraisalForm[]>([]);
  const [newForm, setNewForm] = useState({
    title: '',
    category: '',
    employees: []
  });

  const handleCreateForm = () => {
    if (newForm.title && newForm.category) {
      const form: AppraisalForm = {
        id: Date.now().toString(),
        title: newForm.title,
        category: newForm.category,
        employees: [],
        status: 'draft',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setAppraisalForms([...appraisalForms, form]);
      setNewForm({ title: '', category: '', employees: [] });
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Appraisal Forms
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Form
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Appraisal Form</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Form Title</Label>
                  <Input
                    value={newForm.title}
                    onChange={(e) => setNewForm({...newForm, title: e.target.value})}
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newForm.category} onValueChange={(value) => setNewForm({...newForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance Review</SelectItem>
                      <SelectItem value="annual">Annual Appraisal</SelectItem>
                      <SelectItem value="quarterly">Quarterly Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleCreateForm} className="w-full">
                  Create Form
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="w-full">
          {appraisalForms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No appraisal forms created yet.</p>
              <p className="text-sm">Create your first form using the button above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appraisalForms.map((form) => (
                <Card key={form.id} className="w-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{form.title}</h3>
                        <p className="text-sm text-gray-600">Category: {form.category}</p>
                        <p className="text-sm text-gray-600">Created: {form.createdDate}</p>
                      </div>
                      <Badge className={form.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {form.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppraisalForms;