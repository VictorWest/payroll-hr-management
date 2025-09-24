import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'Open' | 'Closed' | 'On Hold';
  applications: number;
  postedDate: string;
  closingDate: string;
  description: string;
}

const JobVacancies: React.FC = () => {
  const [jobs, setJobs] = useState<JobVacancy[]>([
    {
      id: '1',
      title: 'Software Engineer',
      department: 'IT',
      location: 'Lagos',
      type: 'Full-time',
      status: 'Open',
      applications: 15,
      postedDate: '2024-01-15',
      closingDate: '2024-02-15',
      description: 'We are looking for a skilled software engineer...'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    closingDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobVacancy = {
      id: Date.now().toString(),
      ...formData,
      status: 'Open',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    setFormData({ title: '', department: '', location: '', type: '', closingDate: '', description: '' });
    setIsDialogOpen(false);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Vacancies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Create Job</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Job Vacancy</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
              </div>
              <div>
                <Label htmlFor="type">Job Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="closingDate">Closing Date</Label>
                <Input id="closingDate" type="date" value={formData.closingDate} onChange={(e) => setFormData({...formData, closingDate: e.target.value})} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} />
              </div>
              <Button type="submit" className="w-full">Create Job</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4" />
        <Input placeholder="Search jobs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
      </div>

      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={job.status === 'Open' ? 'default' : job.status === 'Closed' ? 'destructive' : 'secondary'}>
                    {job.status}
                  </Badge>
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-muted-foreground">{job.type}</p>
                </div>
                <div>
                  <p className="font-medium">Applications</p>
                  <p className="text-muted-foreground">{job.applications}</p>
                </div>
                <div>
                  <p className="font-medium">Posted</p>
                  <p className="text-muted-foreground">{job.postedDate}</p>
                </div>
                <div>
                  <p className="font-medium">Closing</p>
                  <p className="text-muted-foreground">{job.closingDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobVacancies;