import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Users, FileText, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HRTemplates from './HRTemplates';

interface JobVacancy {
  id: string;
  title: string;
  department: string;
  description: string;
  status: 'open' | 'closed';
  applicants: number;
  datePosted: string;
  expiryDate: string;
}

const HRJobManagement: React.FC = () => {
  const [jobVacancies, setJobVacancies] = useState<JobVacancy[]>([
    {
      id: '1',
      title: 'Software Developer',
      department: 'IT',
      description: 'Looking for an experienced software developer with React and Node.js skills.',
      status: 'open',
      applicants: 5,
      datePosted: '2024-03-01',
      expiryDate: '2024-04-01'
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    description: '',
    expiryDate: ''
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    position: '',
    phone: ''
  });

  const [showCandidateForm, setShowCandidateForm] = useState(false);

  const handleCreateJob = () => {
    if (newJob.title && newJob.department && newJob.description && newJob.expiryDate) {
      const job: JobVacancy = {
        id: Date.now().toString(),
        title: newJob.title,
        department: newJob.department,
        description: newJob.description,
        status: 'open',
        applicants: 0,
        datePosted: new Date().toISOString().split('T')[0],
        expiryDate: newJob.expiryDate
      };
      setJobVacancies([...jobVacancies, job]);
      setNewJob({ title: '', department: '', description: '', expiryDate: '' });
    }
  };

  const handleAddCandidate = () => {
    if (newCandidate.name && newCandidate.email && newCandidate.position) {
      setJobVacancies(prev => prev.map(job => 
        job.title === newCandidate.position 
          ? { ...job, applicants: job.applicants + 1 }
          : job
      ));
      
      setNewCandidate({ name: '', email: '', position: '', phone: '' });
      setShowCandidateForm(false);
      alert('Candidate added successfully!');
    }
  };

  return (
    <div className="w-full space-y-6 p-4 sm:p-6">
      <Tabs defaultValue="recruitment" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="templates">HR Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recruitment" className="w-full space-y-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Job Vacancies
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-[100px] hover:scale-105 transition-transform">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Job
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Job Vacancy</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Job Title</Label>
                      <Input
                        value={newJob.title}
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                        placeholder="Enter job title"
                      />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input
                        value={newJob.department}
                        onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                        placeholder="Enter department"
                      />
                    </div>
                    <div>
                      <Label>Job Description</Label>
                      <Textarea
                        value={newJob.description}
                        onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                        placeholder="Enter job description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Expiry Date</Label>
                      <Input
                        type="date"
                        value={newJob.expiryDate}
                        onChange={(e) => setNewJob({...newJob, expiryDate: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleCreateJob} className="w-full">
                      Create Job
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobVacancies.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{job.applicants}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{job.description}</TableCell>
                        <TableCell>
                          <Badge className={job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add Candidates to Jobs
              </CardTitle>
              <Button 
                size="sm" 
                className="w-[100px] hover:scale-105 transition-transform"
                onClick={() => setShowCandidateForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </CardHeader>
            {showCandidateForm && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={newCandidate.name}
                      onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                      placeholder="Enter candidate name"
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={newCandidate.email}
                      onChange={(e) => setNewCandidate({...newCandidate, email: e.target.value})}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Position</Label>
                    <Select onValueChange={(value) => setNewCandidate({...newCandidate, position: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobVacancies.filter(job => job.status === 'open').map(job => (
                          <SelectItem key={job.id} value={job.title}>{job.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={newCandidate.phone}
                      onChange={(e) => setNewCandidate({...newCandidate, phone: e.target.value})}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddCandidate}>Add Candidate</Button>
                  <Button variant="outline" onClick={() => setShowCandidateForm(false)}>Cancel</Button>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <HRTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRJobManagement;