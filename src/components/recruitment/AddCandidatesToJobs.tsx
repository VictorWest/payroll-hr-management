import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  status: 'Available' | 'Assigned' | 'Interviewed';
}

interface Job {
  id: string;
  title: string;
  department: string;
  requirements: string[];
  status: 'Open' | 'Closed';
}

const AddCandidatesToJobs: React.FC = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  
  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234-123-456-789',
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: '3 years',
      status: 'Available'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234-987-654-321',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '5 years',
      status: 'Available'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+234-555-123-456',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      experience: '4 years',
      status: 'Assigned'
    }
  ]);

  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Frontend Developer',
      department: 'IT',
      requirements: ['JavaScript', 'React', 'CSS'],
      status: 'Open'
    },
    {
      id: '2',
      title: 'Backend Developer',
      department: 'IT',
      requirements: ['Python', 'Django', 'API Development'],
      status: 'Open'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      department: 'IT',
      requirements: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      status: 'Open'
    }
  ]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    candidate.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(candidateSearch.toLowerCase()))
  );

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    job.department.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const assignCandidateToJob = (candidateId: string) => {
    if (!selectedJob) {
      toast({ title: 'Error', description: 'Please select a job first', variant: 'destructive' });
      return;
    }
    
    const candidate = candidates.find(c => c.id === candidateId);
    const job = jobs.find(j => j.id === selectedJob);
    
    if (candidate && job) {
      toast({ 
        title: 'Success', 
        description: `${candidate.name} assigned to ${job.title}` 
      });
    }
  };

  const checkEligibility = (candidate: Candidate, job: Job) => {
    const matchingSkills = candidate.skills.filter(skill => 
      job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    );
    return matchingSkills.length > 0 ? matchingSkills : [];
  };

  const selectedJobDetails = jobs.find(job => job.id === selectedJob);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Add Candidates to Jobs</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Job Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input 
                placeholder="Search jobs..." 
                value={jobSearch} 
                onChange={(e) => setJobSearch(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedJob === job.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedJob(job.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                    <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">Requirements:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {job.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedJobDetails ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg">{selectedJobDetails.title}</h4>
                  <p className="text-muted-foreground">{selectedJobDetails.department}</p>
                </div>
                <div>
                  <Label>Requirements</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJobDetails.requirements.map((req, index) => (
                      <Badge key={index} variant="secondary">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge variant={selectedJobDetails.status === 'Open' ? 'default' : 'secondary'}>
                  {selectedJobDetails.status}
                </Badge>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Select a job to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Available Candidates</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input 
                placeholder="Search candidates..." 
                value={candidateSearch} 
                onChange={(e) => setCandidateSearch(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredCandidates.map((candidate) => {
              const eligibleSkills = selectedJobDetails ? checkEligibility(candidate, selectedJobDetails) : [];
              const isEligible = eligibleSkills.length > 0;
              
              return (
                <div key={candidate.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <Badge 
                          variant={candidate.status === 'Available' ? 'default' : 
                                  candidate.status === 'Assigned' ? 'secondary' : 'outline'}
                        >
                          {candidate.status}
                        </Badge>
                        {selectedJobDetails && (
                          <Badge variant={isEligible ? 'default' : 'destructive'}>
                            {isEligible ? 'Eligible' : 'Not Eligible'}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        <p className="text-sm text-muted-foreground">{candidate.phone}</p>
                        <p className="text-sm text-muted-foreground">Experience: {candidate.experience}</p>
                      </div>
                      <div className="mt-3">
                        <Label className="text-xs">Skills</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {candidate.skills.map((skill, index) => {
                            const isMatching = selectedJobDetails && 
                              selectedJobDetails.requirements.some(req => 
                                req.toLowerCase().includes(skill.toLowerCase())
                              );
                            return (
                              <Badge 
                                key={index} 
                                variant={isMatching ? 'default' : 'outline'}
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      {selectedJobDetails && eligibleSkills.length > 0 && (
                        <div className="mt-2">
                          <Label className="text-xs text-green-600">Matching Skills</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {eligibleSkills.map((skill, index) => (
                              <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <Button 
                        onClick={() => assignCandidateToJob(candidate.id)}
                        disabled={candidate.status !== 'Available' || !selectedJob}
                        size="sm"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCandidatesToJobs;