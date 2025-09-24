import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, FileText, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
}

const CreateCandidate: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    nationality: '',
    maritalStatus: '',
    experience: '',
    education: '',
    skills: ''
  });
  const [credentials, setCredentials] = useState<FileUpload[]>([]);
  const [applicationLetter, setApplicationLetter] = useState<FileUpload | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null, type: 'credentials' | 'letter') => {
    if (!files) return;

    if (type === 'credentials') {
      if (credentials.length + files.length > 5) {
        toast({ title: 'Error', description: 'Maximum 5 credential files allowed', variant: 'destructive' });
        return;
      }
      const newFiles = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: file.size
      }));
      setCredentials(prev => [...prev, ...newFiles]);
    } else {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        toast({ title: 'Error', description: 'Application letter must be PDF format', variant: 'destructive' });
        return;
      }
      setApplicationLetter({
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size
      });
    }
  };

  const removeFile = (id: string, type: 'credentials' | 'letter') => {
    if (type === 'credentials') {
      setCredentials(prev => prev.filter(file => file.id !== id));
    } else {
      setApplicationLetter(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({ title: 'Success', description: 'Candidate created successfully' });
    // Reset form
    setFormData({
      fullName: '', email: '', phone: '', dateOfBirth: '', gender: '', address: '',
      city: '', state: '', nationality: '', maritalStatus: '', experience: '', education: '', skills: ''
    });
    setCredentials([]);
    setApplicationLetter(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create Candidate</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => handleInputChange('dateOfBirth', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} rows={2} />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="experience">Work Experience</Label>
              <Textarea id="experience" value={formData.experience} onChange={(e) => handleInputChange('experience', e.target.value)} rows={3} placeholder="Describe work experience..." />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea id="education" value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} rows={3} placeholder="Educational background..." />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea id="skills" value={formData.skills} onChange={(e) => handleInputChange('skills', e.target.value)} rows={2} placeholder="Key skills and competencies..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Credentials (Max 5 files - PDF, JPG, PNG)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'credentials')}
                  className="hidden"
                  id="credentials-upload"
                />
                <label htmlFor="credentials-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload credentials</p>
                  </div>
                </label>
              </div>
              {credentials.length > 0 && (
                <div className="mt-4 space-y-2">
                  {credentials.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        {file.type.includes('image') ? <Image className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id, 'credentials')}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Application Letter (PDF only)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e.target.files, 'letter')}
                  className="hidden"
                  id="letter-upload"
                />
                <label htmlFor="letter-upload" className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                  <div className="text-center">
                    <FileText className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload application letter</p>
                  </div>
                </label>
              </div>
              {applicationLetter && (
                <div className="mt-4">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{applicationLetter.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(applicationLetter.id, 'letter')}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Create Candidate</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidate;