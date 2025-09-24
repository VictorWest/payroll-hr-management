import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  UserCheck,
  Calculator,
  Wallet,
  LogOut,
  PiggyBank,
  CreditCard
} from 'lucide-react';

interface RoleBasedSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  className?: string;
}

const RoleBasedSidebar: React.FC<RoleBasedSidebarProps> = ({
  activeView,
  setActiveView,
  className
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'employers',
      label: 'Employer Management',
      icon: Building2,
      roles: ['Super Admin']
    },
    {
      id: 'employees',
      label: 'Employee Management',
      icon: Users,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'payroll',
      label: 'Payroll Management',
      icon: DollarSign,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'pension-deductions',
      label: 'Pension Deductions',
      icon: PiggyBank,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'hr',
      label: 'HR Management',
      icon: UserCheck,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'calculators',
      label: 'Calculators',
      icon: Calculator,
      roles: ['Super Admin', 'HR', 'Accountant']
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: Wallet,
      roles: ['Super Admin']
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: CreditCard,
      roles: ['Super Admin', 'HR', 'Accountant']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    return item.roles.includes(user?.role || '');
  });

  return (
    <div className={cn(
      "w-64 bg-white border-r border-gray-200 flex flex-col h-full",
      "lg:w-64 md:w-56 sm:w-48",
      className
    )}>
      <div className="p-4 sm:p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MP</span>
          </div>
          <div className="hidden sm:block">
            <h2 className="font-bold text-lg text-gray-900"><span className="text-blue-600">MiPay</span>
            <span className="text-purple-600">Master</span></h2>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start text-left h-10 px-3",
                "sm:h-12 sm:px-4",
                activeView === item.id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              onClick={() => setActiveView(item.id)}
            >
              <Icon className="h-4 w-4 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="hidden sm:inline text-sm font-medium">
                {item.label}
              </span>
              <span className="sm:hidden text-xs font-medium">
                {item.label.split(' ')[0]}
              </span>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        {user && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-900 truncate">
              {user.email}
            </div>
            {user.organizationName && (
              <div className="text-xs text-gray-500 truncate">
                {user.organizationName}
              </div>
            )}
          </div>
        )}
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2 sm:mr-3" />
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Exit</span>
        </Button>
      </div>
    </div>
  );
};

export default RoleBasedSidebar;