import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Target, BookOpen, Bell } from 'lucide-react';
import RecruitmentModule from '@/components/RecruitmentModule';
import PerformanceEvaluation from '@/components/PerformanceEvaluation';
import TrainingManagement from '@/components/TrainingManagement';

const HRManagement: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Miemploya HR Management</h1>
      </div>

      <Tabs defaultValue="recruitment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="recruitment" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Recruitment</span>
            <span className="sm:hidden">Jobs</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Target className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Performance</span>
            <span className="sm:hidden">Perf</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Training</span>
            <span className="sm:hidden">Train</span>
          </TabsTrigger>
          <TabsTrigger value="reminders" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Reminders</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recruitment" className="space-y-6">
          <RecruitmentModule />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceEvaluation />
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <TrainingManagement />
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                HR Reminders & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600">Urgent Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                          <h5 className="font-medium text-red-800">Contract Expiry</h5>
                          <p className="text-sm text-red-600">3 employees' contracts expire this month</p>
                          <span className="text-xs text-red-500">Due: April 30, 2024</span>
                        </div>
                        <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                          <h5 className="font-medium text-orange-800">Performance Reviews</h5>
                          <p className="text-sm text-orange-600">Quarterly reviews pending for 8 employees</p>
                          <span className="text-xs text-orange-500">Due: April 15, 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-600">Upcoming Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <h5 className="font-medium text-blue-800">Team Building Event</h5>
                          <p className="text-sm text-blue-600">Annual company retreat planning</p>
                          <span className="text-xs text-blue-500">Date: May 20, 2024</span>
                        </div>
                        <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                          <h5 className="font-medium text-green-800">New Hire Orientation</h5>
                          <p className="text-sm text-green-600">Onboarding session for 4 new employees</p>
                          <span className="text-xs text-green-500">Date: April 10, 2024</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance & Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Employee Files</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Complete Files</span>
                            <span className="text-green-600">18/20</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Missing Documents</span>
                            <span className="text-red-600">2</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Training Records</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Up to Date</span>
                            <span className="text-green-600">16/20</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Needs Update</span>
                            <span className="text-yellow-600">4</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Certifications</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Valid</span>
                            <span className="text-green-600">15/20</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Expiring Soon</span>
                            <span className="text-orange-600">5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRManagement;