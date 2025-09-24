import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface HRTemplate {
  id: string;
  name: string;
  category: 'free' | 'premium';
  format: 'pdf' | 'doc';
  description: string;
}

const HRTemplates: React.FC = () => {
  const hrTemplates: HRTemplate[] = [
    { id: '1', name: 'Employment Contract', category: 'free', format: 'pdf', description: 'Standard employment contract template' },
    { id: '2', name: 'Job Description Template', category: 'free', format: 'doc', description: 'Template for creating job descriptions' },
    { id: '3', name: 'Standard Operating Procedures', category: 'premium', format: 'pdf', description: 'Comprehensive SOP manual' },
    { id: '4', name: 'Organizational Manual', category: 'premium', format: 'doc', description: 'Complete organizational structure guide' },
    { id: '5', name: 'Appraisal Training Manual', category: 'premium', format: 'pdf', description: 'Professional appraisal training guide' }
  ];

  const handleDownloadTemplate = (template: HRTemplate) => {
    if (template.category === 'premium') {
      alert('Please contact Miemploya HR for premium templates at premium@miemploya.com');
    } else {
      alert(`Downloading ${template.name} in ${template.format.toUpperCase()} format`);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Free HR Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="grid gap-4">
            {hrTemplates.filter(t => t.category === 'free').map((template) => (
              <div key={template.id} className="flex justify-between items-center p-4 border rounded">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <Badge variant="outline">{template.format.toUpperCase()}</Badge>
                </div>
                <Button onClick={() => handleDownloadTemplate(template)}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Premium HR Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="grid gap-4">
            {hrTemplates.filter(t => t.category === 'premium').map((template) => (
              <div key={template.id} className="flex justify-between items-center p-4 border rounded bg-yellow-50">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <Badge variant="outline">{template.format.toUpperCase()}</Badge>
                  <Badge className="ml-2 bg-yellow-200 text-yellow-800">Premium</Badge>
                </div>
                <Button onClick={() => handleDownloadTemplate(template)}>
                  Contact for Premium
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h4 className="font-medium text-blue-800">Professional & Industrial Standard Templates</h4>
            <p className="text-sm text-blue-600 mt-2">
              For custom professional templates including SOPs, Organizational Manuals, and Appraisal Training materials, 
              contact our HR specialists at premium@miemploya.com for personalized consultation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRTemplates;