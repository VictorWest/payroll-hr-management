import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Eye, Edit, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Milestone {
  id: string;
  stage: string;
  status: 'Completed' | 'Pending' | 'Skipped';
  date: string | null;
  notes?: string;
}

interface Applicant {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  applicationDate: string;
  currentStage: string;
  milestones: Milestone[];
}

const MILESTONE_STAGES = [
  'Interview',
  'Approval',
  'Rejected',
  'Training / Orientation',
  'Probation',
  'Appointment',
  'Confirmation'
];

const ApplicantsMilestone: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState<string | null>(null);
  
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      jobTitle: 'Software Engineer',
      department: 'IT',
      applicationDate: '2024-01-15',
      currentStage: 'Approval',
      milestones: [
        { id: '1', stage: 'Interview', status: 'Completed', date: '2024-05-02' },
        { id: '2', stage: 'Approval', status: 'Completed', date: '2024-05-04' },
        { id: '3', stage: 'Training / Orientation', status: 'Pending', date: null }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      jobTitle: 'Marketing Manager',
      department: 'Marketing',
      applicationDate: '2024-01-20',
      currentStage: 'Interview',
      milestones: [
        { id: '1', stage: 'Interview', status: 'Pending', date: null }
      ]
    }
  ]);

  const updateMilestone = (applicantId: string, newStage: string) => {
    setApplicants(prev => prev.map(applicant => {
      if (applicant.id === applicantId) {
        const existingStages = applicant.milestones.map(m => m.stage);
        
        if (existingStages.includes(newStage)) {
          toast({ title: 'Error', description: 'This milestone has already been completed', variant: 'destructive' });
          return applicant;
        }

        const newMilestone: Milestone = {
          id: Date.now().toString(),
          stage: newStage,
          status: 'Completed',
          date: new Date().toISOString().split('T')[0]
        };

        return {
          ...applicant,
          currentStage: newStage,
          milestones: [...applicant.milestones, newMilestone]
        };
      }
      return applicant;
    }));
    
    toast({ title: 'Success', description: `Milestone updated to ${newStage}` });
  };

  const getAvailableStages = (applicant: Applicant) => {
    const completedStages = applicant.milestones.map(m => m.stage);
    return MILESTONE_STAGES.filter(stage => !completedStages.includes(stage));
  };

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Skipped':
        return <XCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedApplicantData = applicants.find(a => a.id === selectedApplicant);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Applicants Milestone Tracking</h2>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="w-4 h-4" />
          <Input 
            placeholder="Search applicants..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicants List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredApplicants.map((applicant) => (
                  <div 
                    key={applicant.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedApplicant === applicant.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedApplicant(applicant.id)}
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{applicant.name}</h4>
                      <p className="text-xs text-muted-foreground">{applicant.jobTitle}</p>
                      <p className="text-xs text-muted-foreground">{applicant.department}</p>
                      <Badge variant="outline" className="text-xs">
                        {applicant.currentStage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedApplicantData ? (
                <div className="space-y-6">
                  {/* Applicant Info */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium">{selectedApplicantData.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedApplicantData.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedApplicantData.jobTitle} - {selectedApplicantData.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Applied: {selectedApplicantData.applicationDate}
                    </p>
                  </div>

                  {/* Milestone Table */}
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Milestone Stage</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedApplicantData.milestones.map((milestone) => (
                          <TableRow key={milestone.id}>
                            <TableCell className="font-medium">{milestone.stage}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getMilestoneIcon(milestone.status)}
                                <Badge 
                                  variant={milestone.status === 'Completed' ? 'default' : 
                                          milestone.status === 'Pending' ? 'secondary' : 'outline'}
                                >
                                  {milestone.status}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              {milestone.date || '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Add Next Milestone */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Update to Next Milestone</h4>
                    <div className="flex items-center space-x-4">
                      <Select onValueChange={(value) => updateMilestone(selectedApplicantData.id, value)}>
                        <SelectTrigger className="w-64">
                          <SelectValue placeholder="Select next milestone" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableStages(selectedApplicantData).map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {getAvailableStages(selectedApplicantData).length === 0 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        All milestones completed or no further stages available.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select an applicant to view milestone progress</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsMilestone;