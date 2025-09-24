import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { AllowanceSection } from '@/components/AllowanceSection';
import EmployeeStatutoryDeductions from '@/components/EmployeeStatutoryDeductions';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from '@/components/ui/use-toast';

const EmployerManagement: React.FC = () => {
  const {
    companyInfo,
    updateCompanyInfo,
    defaultAllowances,
    defaultDeductions,
    defaultBonuses,
    addAllowance,
    updateAllowance,
    deleteAllowance,
    addDeduction,
    updateDeduction,
    deleteDeduction,
    addBonus,
    updateBonus,
    deleteBonus
  } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    payrollFrequency: 'Monthly',
    payDay: '',
    employerPension: { enabled: true, value: 10 },
    employerNHIS: { enabled: true, value: 5 },
    employerECS: { enabled: true, value: 1 },
    employerITF: { enabled: true, value: 1 },
    defaultBasicSalary: { enabled: true, value: 60 },
    defaultHousingAllowance: { enabled: true, value: 25 },
    defaultTransportAllowance: { enabled: true, value: 15 },
    payeEnabled: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleContributionChange = (field: string, enabled: boolean, value: number) => {
    setFormData({ ...formData, [field]: { enabled, value } });
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    updateCompanyInfo({ [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCompanyInfo({ logo: e.target?.result as string });
        toast({ title: 'Logo uploaded successfully!' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!companyInfo.name.trim()) {
      toast({ title: 'Error', description: 'Company name is required', variant: 'destructive' });
      return;
    }
    toast({ title: 'Success', description: 'Employer configuration saved successfully!' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex flex-col items-center mb-8">
          {companyInfo.logo ? (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={companyInfo.logo} alt="Company Logo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-white">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{companyInfo.name || 'Employer Management'}</h1>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            Save Configuration
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Company Name *</Label>
                  <Input
                    value={companyInfo.name}
                    onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                    placeholder="Enter company name"
                    className="font-medium"
                  />
                </div>
                <div>
                  <Label>Tax Identification Number (TIN)</Label>
                  <Input
                    value={companyInfo.tin || ''}
                    onChange={(e) => handleCompanyInfoChange('tin', e.target.value)}
                    placeholder="Enter TIN"
                  />
                </div>
                <div>
                  <Label>Company Address</Label>
                  <Textarea
                    value={companyInfo.address || ''}
                    onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                    placeholder="Enter company address"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {companyInfo.logo ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 text-center">Recommended: 200x200px, PNG or JPG</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Processing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label>Payroll Frequency</Label>
                    <Select value={formData.payrollFrequency} onValueChange={(value) => handleInputChange('payrollFrequency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Pay Day</Label>
                    <Input
                      type="date"
                      value={formData.payDay}
                      onChange={(e) => handleInputChange('payDay', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employer Statutory Contributions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'employerPension', label: 'Employer Pension', defaultValue: 10 },
                  { key: 'employerNHIS', label: 'Employer NHIS', defaultValue: 5 },
                  { key: 'employerECS', label: 'Employer ECS', defaultValue: 1 },
                  { key: 'employerITF', label: 'Employer ITF (1% of total payroll)', defaultValue: 1 }
                ].map(({ key, label, defaultValue }) => (
                  <div key={key} className="flex items-center gap-4">
                    <Checkbox
                      checked={formData[key]?.enabled || false}
                      onCheckedChange={(checked) => handleContributionChange(key, checked as boolean, formData[key]?.value || defaultValue)}
                    />
                    <Label className="flex-1">{label}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={formData[key]?.value || defaultValue}
                        onChange={(e) => handleContributionChange(key, formData[key]?.enabled || false, parseFloat(e.target.value))}
                        disabled={!formData[key]?.enabled}
                        className="w-20"
                      />
                      <span>%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PAYE Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={formData.payeEnabled}
                    onCheckedChange={(checked) => handleInputChange('payeEnabled', checked)}
                  />
                  <div className="flex-1">
                    <Label className="text-base font-medium">Enable PAYE</Label>
                    <p className="text-sm text-gray-600 mt-2">
                      Enable the checkbox, then navigate to the Calculator or PAYE Calculator page. 
                      Enter the employee details and calculate the PAYE. Next, go to the PAYE Employee 
                      Management page or the Salary & Tax section, manually input the PAYE amount, and save.
                    </p>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      Note: You do not need to post it on the posting page — the PAYE will automatically 
                      reflect on the employee's payslip each month.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <EmployeeStatutoryDeductions />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <AllowanceSection
            title="Default Company Allowances"
            type="allowance"
            items={defaultAllowances}
            onAdd={addAllowance}
            onUpdate={updateAllowance}
            onDelete={deleteAllowance}
          />
          
          <AllowanceSection
            title="Default Company Deductions"
            type="deduction"
            items={defaultDeductions}
            onAdd={addDeduction}
            onUpdate={updateDeduction}
            onDelete={deleteDeduction}
          />
          
          <AllowanceSection
            title="Default Company Bonuses"
            type="bonus"
            items={defaultBonuses}
            onAdd={addBonus}
            onUpdate={updateBonus}
            onDelete={deleteBonus}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployerManagement;