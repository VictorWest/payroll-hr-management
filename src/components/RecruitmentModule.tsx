import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserPlus, Target, BarChart3, Briefcase } from 'lucide-react';
import JobVacancies from '@/components/recruitment/JobVacancies';
import CreateCandidate from '@/components/recruitment/CreateCandidate';
import AddCandidatesToJobs from '@/components/recruitment/AddCandidatesToJobs';
import ApplicantsMilestone from '@/components/recruitment/ApplicantsMilestone';
import RecruitmentReports from '@/components/recruitment/RecruitmentReports';

const RecruitmentModule: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Miemploya HR - Recruitment Module</h1>
      </div>

      <Tabs defaultValue="vacancies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="vacancies" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Job Vacancies</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="candidates" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Create Candidate</span>
            <span className="sm:hidden">Create</span>
          </TabsTrigger>
          <TabsTrigger value="assign" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Assign to Jobs</span>
            <span className="sm:hidden">Assign</span>
          </TabsTrigger>
          <TabsTrigger value="milestones" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Milestones</span>
            <span className="sm:hidden">Track</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Reports</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vacancies" className="space-y-6">
          <JobVacancies />
        </TabsContent>

        <TabsContent value="candidates" className="space-y-6">
          <CreateCandidate />
        </TabsContent>

        <TabsContent value="assign" className="space-y-6">
          <AddCandidatesToJobs />
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <ApplicantsMilestone />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <RecruitmentReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruitmentModule;