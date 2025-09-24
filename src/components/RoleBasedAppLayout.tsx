import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RoleBasedSidebar from './RoleBasedSidebar';
import Dashboard from './Dashboard';
import EmployerManagement from './EmployerManagement';
import EmployeeManagement from './EmployeeManagement';
import PayrollManagement from './PayrollManagement';
import HRManagement from './HRManagement';
import Calculators from './Calculators';
import Wallet from './Wallet';
import EmployeePensionDeductions from './EmployeePensionDeductions';
import SubscriptionPage from './SubscriptionPage';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const RoleBasedAppLayout: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employers':
        return user?.role === 'Super Admin' ? <EmployerManagement /> : <Dashboard />;
      case 'employees':
        return ['Super Admin', 'HR', 'Accountant'].includes(user?.role || '') ? <EmployeeManagement /> : <Dashboard />;
      case 'payroll':
        return <PayrollManagement />;
      case 'pension-deductions':
        return <EmployeePensionDeductions />;
      case 'hr':
        return <HRManagement />;
      case 'calculators':
        return <Calculators />;
      case 'subscription':
        return ['Super Admin', 'HR', 'Accountant'].includes(user?.role || '') ? <SubscriptionPage /> : <Dashboard />;
      case 'wallet':
        return user?.role === 'Super Admin' ? <Wallet /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <RoleBasedSidebar
          activeView={activeView}
          setActiveView={(view) => {
            setActiveView(view);
            setSidebarOpen(false);
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-lg sm:text-xl font-semibold capitalize">
                {activeView.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim()}
              </h1>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <div className="text-xs sm:text-sm text-gray-600">
                  {user.role}
                </div>
                {user.organizationName && (
                  <div className="hidden sm:block text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {user.organizationName}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default RoleBasedAppLayout;