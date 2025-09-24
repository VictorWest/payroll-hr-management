import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Filter, Users, Briefcase, TrendingUp, Calendar } from 'lucide-react';

const RecruitmentReports: React.FC = () => {
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const recruitmentSummary = {
    totalJobs: 25,
    openJobs: 15,
    closedJobs: 8,
    onHoldJobs: 2,
    totalApplications: 342,
    filledPositions: 8,
    unfilledPositions: 17
  };

  const candidatePipelineData = [
    { stage: 'Applied', count: 342 },
    { stage: 'Interviewed', count: 156 },
    { stage: 'Approved', count: 89 },
    { stage: 'Training', count: 45 },
    { stage: 'Probation', count: 23 },
    { stage: 'Appointed', count: 15 },
    { stage: 'Confirmed', count: 12 },
    { stage: 'Rejected', count: 67 }
  ];

  const jobPerformanceData = [
    { job: 'Software Engineer', applicants: 45, timeToFill: 21, hireRatio: 0.22 },
    { job: 'Marketing Manager', applicants: 32, timeToFill: 18, hireRatio: 0.31 },
    { job: 'Sales Executive', applicants: 28, timeToFill: 14, hireRatio: 0.36 },
    { job: 'HR Specialist', applicants: 23, timeToFill: 25, hireRatio: 0.17 },
    { job: 'Accountant', applicants: 19, timeToFill: 16, hireRatio: 0.42 }
  ];

  const applicationSourceData = [
    { source: 'Website', count: 145, percentage: 42 },
    { source: 'Referral', count: 89, percentage: 26 },
    { source: 'Job Portal', count: 76, percentage: 22 },
    { source: 'Walk-in', count: 32, percentage: 10 }
  ];

  const exportReport = (format: string) => {
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recruitment Reports</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('PDF')}>
            <Download className="w-4 h-4 mr-2" />PDF
          </Button>
          <Button variant="outline" onClick={() => exportReport('Excel')}>
            <Download className="w-4 h-4 mr-2" />Excel
          </Button>
          <Button variant="outline" onClick={() => exportReport('CSV')}>
            <Download className="w-4 h-4 mr-2" />CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">From Date</label>
              <Input 
                type="date" 
                value={dateRange.from} 
                onChange={(e) => setDateRange({...dateRange, from: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">To Date</label>
              <Input 
                type="date" 
                value={dateRange.to} 
                onChange={(e) => setDateRange({...dateRange, to: e.target.value})} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentSummary.totalJobs}</div>
                <div className="flex space-x-2 mt-2">
                  <Badge variant="default">Open: {recruitmentSummary.openJobs}</Badge>
                  <Badge variant="secondary">Closed: {recruitmentSummary.closedJobs}</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentSummary.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Average: {Math.round(recruitmentSummary.totalApplications / recruitmentSummary.totalJobs)} per job
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Filled Positions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentSummary.filledPositions}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round((recruitmentSummary.filledPositions / recruitmentSummary.totalJobs) * 100)}% fill rate
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unfilled Positions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recruitmentSummary.unfilledPositions}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Requires attention
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Pipeline Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidatePipelineData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded">
                    <span className="font-medium">{item.stage}</span>
                    <Badge variant="outline">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Job Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Job Title</th>
                      <th className="text-left p-2">Applicants</th>
                      <th className="text-left p-2">Time to Fill (days)</th>
                      <th className="text-left p-2">Hire Ratio</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPerformanceData.map((job, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{job.job}</td>
                        <td className="p-2">{job.applicants}</td>
                        <td className="p-2">{job.timeToFill}</td>
                        <td className="p-2">{Math.round(job.hireRatio * 100)}%</td>
                        <td className="p-2">
                          <Badge variant={job.hireRatio > 0.3 ? 'default' : 'secondary'}>
                            {job.hireRatio > 0.3 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Milestone Progress Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {candidatePipelineData.slice(1, 8).map((milestone, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h4 className="font-medium text-sm">{milestone.stage}</h4>
                        <div className="text-2xl font-bold mt-2">{milestone.count}</div>
                        <p className="text-xs text-muted-foreground mt-1">candidates</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Application Source Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationSourceData.map((source, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{source.source}</h4>
                      <p className="text-sm text-muted-foreground">{source.count} applications</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{source.percentage}%</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruitmentReports;