import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import EmployeeManagement from './EmployeeManagement';
import EmployerManagement from './EmployerManagement';
import PayrollManagement from './PayrollManagement';
import HRJobManagement from './HRJobManagement';
import PerformanceEvaluation from './PerformanceEvaluation';
import Calculators from './Calculators';
import Wallet from './Wallet';
import ContactMiemployaForm from './ContactMiemployaForm';

const AppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <div className="w-full p-6"><Dashboard /></div>;
      case 'employees':
        return <div className="w-full p-6"><EmployeeManagement /></div>;
      case 'employers':
        return <div className="w-full p-6"><EmployerManagement /></div>;
      case 'payroll':
        return <div className="w-full p-6"><PayrollManagement /></div>;
      case 'hr':
        return <div className="w-full p-6"><HRJobManagement /></div>;
      case 'performance':
        return <div className="w-full p-6"><PerformanceEvaluation /></div>;
      case 'calculators':
        return <div className="w-full p-6"><Calculators /></div>;
      case 'wallet':
        return <div className="w-full p-6"><Wallet /></div>;
      case 'subscription':
        return (
          <div className="w-full p-6">
            <h1 className="text-3xl font-bold mb-4">Subscription</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Monthly', 'Quarterly', 'Yearly'].map((plan) => (
                <div key={plan} className="bg-white p-6 rounded-lg shadow border">
                  <h3 className="text-xl font-semibold mb-4">{plan} Plan</h3>
                  <p className="text-3xl font-bold mb-4">₦{plan === 'Monthly' ? '15,000' : plan === 'Quarterly' ? '40,000' : '150,000'}</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="w-full p-6">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <p className="text-gray-600">Settings module coming soon...</p>
            </div>
          </div>
        );
      default:
        return <div className="w-full p-6"><Dashboard /></div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-auto w-full">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;