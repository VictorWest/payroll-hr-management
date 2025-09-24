import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DEFAULT_ALLOWANCES } from '@/data/defaultOptions';

interface AddAllowanceRowProps {
  id: string;
  title: string;
  percentage: number;
  amount: number;
  grossSalary: number;
  existingTitles: string[];
  onTitleChange: (value: string) => void;
  onPercentageChange: (value: number) => void;
  onAmountChange: (value: number) => void;
  onRemove: () => void;
}

const AddAllowanceRow: React.FC<AddAllowanceRowProps> = ({
  title,
  percentage,
  amount,
  grossSalary,
  existingTitles,
  onTitleChange,
  onPercentageChange,
  onAmountChange,
  onRemove
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleTitleInput = (value: string) => {
    onTitleChange(value);
    
    if (value.length > 0) {
      const filtered = DEFAULT_ALLOWANCES.filter(allowance => 
        allowance.toLowerCase().includes(value.toLowerCase()) &&
        !existingTitles.includes(allowance)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    onTitleChange(suggestion);
    setShowSuggestions(false);
  };

  const handlePercentageChange = (value: string) => {
    const newPercentage = parseFloat(value) || 0;
    const newAmount = (grossSalary * newPercentage) / 100;
    onPercentageChange(newPercentage);
    onAmountChange(newAmount);
  };

  const handleAmountChange = (value: string) => {
    const newAmount = parseFloat(value) || 0;
    const newPercentage = grossSalary > 0 ? (newAmount / grossSalary) * 100 : 0;
    onAmountChange(newAmount);
    onPercentageChange(newPercentage);
  };

  return (
    <div className="grid grid-cols-5 gap-4 items-end py-2 border-b border-gray-200">
      <div className="relative">
        <Label className="text-sm text-gray-600">Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => handleTitleInput(e.target.value)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search allowance..."
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <Label className="text-sm text-gray-600">Percentage (%)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          max="100"
          value={percentage.toFixed(2)}
          onChange={(e) => handlePercentageChange(e.target.value)}
        />
      </div>
      <div>
        <Label className="text-sm text-gray-600">Amount (₦)</Label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={amount.toFixed(2)}
          onChange={(e) => handleAmountChange(e.target.value)}
        />
      </div>
      <div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={onRemove}
          className="mt-6"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AddAllowanceRow;