import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SavedPAYEData {
  id: string;
  employee_name: string;
  company: string;
  gross_monthly_income: number;
  monthly_paye: number;
  monthly_net_pay: number;
  created_at: string;
}

interface SavedPensionData {
  id: string;
  employee_name: string;
  monthly_salary: number;
  employee_contribution: number;
  employer_contribution: number;
  total_contribution: number;
  created_at: string;
}

interface SavedDataViewerProps {
  type: 'paye' | 'pension';
  onClose: () => void;
}

const SavedDataViewer: React.FC<SavedDataViewerProps> = ({ type, onClose }) => {
  const [payeData, setPayeData] = useState<SavedPAYEData[]>([]);
  const [pensionData, setPensionData] = useState<SavedPensionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (type === 'paye') {
        const { data, error } = await supabase
          .from('saved_paye_calculations')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPayeData(data || []);
      } else {
        const { data, error } = await supabase
          .from('saved_pension_calculations')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setPensionData(data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch saved data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const table = type === 'paye' ? 'saved_paye_calculations' : 'saved_pension_calculations';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Record deleted successfully"
      });
      
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete record",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            Saved {type === 'paye' ? 'PAYE' : 'Pension'} Calculations
          </CardTitle>
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Name</TableHead>
                {type === 'paye' ? (
                  <>
                    <TableHead>Company</TableHead>
                    <TableHead>Gross Income</TableHead>
                    <TableHead>PAYE</TableHead>
                    <TableHead>Net Pay</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Monthly Salary</TableHead>
                    <TableHead>Employee Contribution</TableHead>
                    <TableHead>Employer Contribution</TableHead>
                    <TableHead>Total</TableHead>
                  </>
                )}
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(type === 'paye' ? payeData : pensionData).map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.employee_name}</TableCell>
                  {type === 'paye' ? (
                    <>
                      <TableCell>{(record as SavedPAYEData).company}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPAYEData).gross_monthly_income)}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPAYEData).monthly_paye)}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPAYEData).monthly_net_pay)}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{formatCurrency((record as SavedPensionData).monthly_salary)}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPensionData).employee_contribution)}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPensionData).employer_contribution)}</TableCell>
                      <TableCell>{formatCurrency((record as SavedPensionData).total_contribution)}</TableCell>
                    </>
                  )}
                  <TableCell>{new Date(record.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteRecord(record.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedDataViewer;