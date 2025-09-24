import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface CompanyInfo {
  name: string;
  logo?: string;
  address?: string;
  tin?: string;
}

interface AllowanceDeduction {
  id: string;
  name: string;
  type: 'percentage' | 'amount';
  value: number;
  enabled: boolean;
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  defaultAllowances: AllowanceDeduction[];
  defaultDeductions: AllowanceDeduction[];
  defaultBonuses: AllowanceDeduction[];
  addAllowance: (allowance: Omit<AllowanceDeduction, 'id'>) => void;
  updateAllowance: (id: string, updates: Partial<AllowanceDeduction>) => void;
  deleteAllowance: (id: string) => void;
  addDeduction: (deduction: Omit<AllowanceDeduction, 'id'>) => void;
  updateDeduction: (id: string, updates: Partial<AllowanceDeduction>) => void;
  deleteDeduction: (id: string) => void;
  addBonus: (bonus: Omit<AllowanceDeduction, 'id'>) => void;
  updateBonus: (id: string, updates: Partial<AllowanceDeduction>) => void;
  deleteBonus: (id: string) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  companyInfo: { name: '' },
  updateCompanyInfo: () => {},
  defaultAllowances: [],
  defaultDeductions: [],
  defaultBonuses: [],
  addAllowance: () => {},
  updateAllowance: () => {},
  deleteAllowance: () => {},
  addDeduction: () => {},
  updateDeduction: () => {},
  deleteDeduction: () => {},
  addBonus: () => {},
  updateBonus: () => {},
  deleteBonus: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({ name: '' });
  const [defaultAllowances, setDefaultAllowances] = useState<AllowanceDeduction[]>([]);
  const [defaultDeductions, setDefaultDeductions] = useState<AllowanceDeduction[]>([]);
  const [defaultBonuses, setDefaultBonuses] = useState<AllowanceDeduction[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  const addAllowance = (allowance: Omit<AllowanceDeduction, 'id'>) => {
    const newAllowance = { ...allowance, id: uuidv4() };
    setDefaultAllowances(prev => [...prev, newAllowance]);
  };

  const updateAllowance = (id: string, updates: Partial<AllowanceDeduction>) => {
    setDefaultAllowances(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteAllowance = (id: string) => {
    setDefaultAllowances(prev => prev.filter(item => item.id !== id));
  };

  const addDeduction = (deduction: Omit<AllowanceDeduction, 'id'>) => {
    const newDeduction = { ...deduction, id: uuidv4() };
    setDefaultDeductions(prev => [...prev, newDeduction]);
  };

  const updateDeduction = (id: string, updates: Partial<AllowanceDeduction>) => {
    setDefaultDeductions(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteDeduction = (id: string) => {
    setDefaultDeductions(prev => prev.filter(item => item.id !== id));
  };

  const addBonus = (bonus: Omit<AllowanceDeduction, 'id'>) => {
    const newBonus = { ...bonus, id: uuidv4() };
    setDefaultBonuses(prev => [...prev, newBonus]);
  };

  const updateBonus = (id: string, updates: Partial<AllowanceDeduction>) => {
    setDefaultBonuses(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteBonus = (id: string) => {
    setDefaultBonuses(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
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
        deleteBonus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};