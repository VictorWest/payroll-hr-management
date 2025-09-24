import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Employee {
  id: string;
  name: string;
}

interface EmployeeSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEmployeeSelect?: (employee: Employee) => void;
  placeholder?: string;
  label?: string;
}

const EmployeeSearchInput: React.FC<EmployeeSearchInputProps> = ({
  value,
  onChange,
  onEmployeeSelect,
  placeholder = "Search employee...",
  label = "Employee Name"
}) => {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock employee data - in real app, this would come from API
  const mockEmployees: Employee[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Wilson' },
    { id: '5', name: 'David Brown' }
  ];

  useEffect(() => {
    if (searchTerm) {
      const filtered = mockEmployees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmployees(filtered);
    } else {
      setEmployees(mockEmployees);
    }
  }, [searchTerm]);

  const handleSelect = (employee: Employee) => {
    onChange(employee.name);
    onEmployeeSelect?.(employee);
    setOpen(false);
  };

  return (
    <div>
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search employee..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>No employee found.</CommandEmpty>
              <CommandGroup>
                {employees.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    value={employee.name}
                    onSelect={() => handleSelect(employee)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === employee.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {employee.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmployeeSearchInput;