import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Save, Upload, Printer, Download, Image as ImageIcon } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EmploymentDetailsForm from './forms/EmploymentDetailsForm';
import BankDetailsForm from './forms/BankDetailsForm';
import SalaryComponentForm from './forms/SalaryComponentForm';
import { EducationHistoryForm, GuarantorsForm, NextOfKinForm, WorkHistoryForm } from './forms/AllRemainingForms';

const EmployeeRegistration: React.FC = () => {
  const { companyInfo } = useAppContext();
  const [currentTab, setCurrentTab] = useState('personal');
  const [employeeImage, setEmployeeImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    companyName: companyInfo.name,
    fullName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    stateOfOrigin: '',
    maritalStatus: '',
    numberOfChildren: '',
    phoneNumber: '',
    residentialAddress: '',
    department: '',
    position: '',
    startDate: '',
    monthlySalary: '',
    employmentStatus: '',
    jobDescription: '',
    employmentType: '',
    reportingManager: '',
    accountName: '',
    bankName: '',
    accountNumber: '',
    pensionPin: '',
    pensionCommencementDate: '',
    accountChangeReason: '',
    salaryComponents: {},
    deductions: {},
    education: {},
    guarantors: [],
    nextOfKin: {},
    workHistory: []
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { id: 'employment', label: 'Employment', component: EmploymentDetailsForm },
    { id: 'bank', label: 'Bank Details', component: BankDetailsForm },
    { id: 'salary', label: 'Salary & Tax', component: SalaryComponentForm },
    { id: 'education', label: 'Education', component: EducationHistoryForm },
    { id: 'guarantors', label: 'Guarantors', component: GuarantorsForm },
    { id: 'nextofkin', label: 'Next of Kin', component: NextOfKinForm },
    { id: 'workhistory', label: 'Work History', component: WorkHistoryForm }
  ];

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab);
  const isFirstTab = currentTabIndex === 0;
  const isLastTab = currentTabIndex === tabs.length - 1;

  const handleNext = () => {
    if (!isLastTab) {
      setCurrentTab(tabs[currentTabIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstTab) {
      setCurrentTab(tabs[currentTabIndex - 1].id);
    }
  };

  const handleSave = () => {
    console.log('Saving employee data:', formData);
    alert('Employee registered successfully!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmployeeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const CurrentComponent = tabs[currentTabIndex].component;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {employeeImage ? (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={employeeImage} alt="Employee" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-white">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="sm"
            className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mt-4">
          {companyInfo.name || 'Employee Registration'}
        </h1>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            <CurrentComponent formData={formData} setFormData={setFormData} />
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={isFirstTab}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {!isLastTab ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save Employee
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;