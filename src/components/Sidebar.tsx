import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, Users, Building, DollarSign, 
  UserCheck, GraduationCap, Calculator, Settings,
  Phone, Wallet, Crown
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, className }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'employers', label: 'Employer Management', icon: Building },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'payroll', label: 'Payroll Management', icon: DollarSign },
    { id: 'hr', label: 'Miemploya HR', icon: UserCheck },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'subscription', label: 'Subscription', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn('pb-12 w-64 bg-white border-r', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-blue-600"><span className="text-blue-600">MiPay</span><span className="text-purple-600">Master</span></h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveView(item.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
            
            <Card className="mx-2 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <Crown className="mr-2 h-4 w-4 text-yellow-600" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Plan:</span>
                    <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs">Premium</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Status:</span>
                    <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">Active</span>
                  </div>
                  <Button size="sm" className="w-full text-xs h-7">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;