import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { SearchableInput } from '@/components/SearchableInput';
import { DEFAULT_ALLOWANCES, DEFAULT_BONUSES, DEFAULT_DEDUCTIONS } from '@/data/defaultOptions';

interface AllowanceSectionProps {
  title: string;
  type: 'allowance' | 'deduction' | 'bonus';
  items: any[];
  onAdd: (item: any) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

const getDescriptionText = (type: string) => {
  switch (type) {
    case 'allowance':
      return 'To ensure uniformity, select allowance titles from predefined list. The Title field functions as an intelligent search box.';
    case 'deduction':
      return 'To maintain consistency, select deduction titles from predefined list. Users must select from suggested options only.';
    case 'bonus':
      return 'To ensure consistency, select bonus titles from predefined list. All bonus entries must follow uniform structure.';
    default:
      return '';
  }
};

const getCategoryOptions = (type: string) => {
  if (type === 'allowance') {
    return ['None', 'Gross Salary', 'Basic Salary', 'Transport Allowance', 'Housing Allowance', 'Total Allowance'];
  }
  return ['None', 'Gross Salary', 'Basic Salary', 'Wages per Day', 'Transport Allowance', 'Housing Allowance', 'Total Allowance'];
};

const getDefaultOptions = (type: string) => {
  switch (type) {
    case 'allowance':
      return DEFAULT_ALLOWANCES;
    case 'bonus':
      return DEFAULT_BONUSES;
    case 'deduction':
      return DEFAULT_DEDUCTIONS;
    default:
      return [];
  }
};

export const AllowanceSection: React.FC<AllowanceSectionProps> = ({
  title,
  type,
  items,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [sectionEnabled, setSectionEnabled] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    calculationType: 'percentage' as 'percentage' | 'amount',
    category: 'None',
    value: 0,
    percentage: 0,
    enabled: true
  });

  const categoryOptions = getCategoryOptions(type);
  const defaultOptions = getDefaultOptions(type);

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    
    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd({ ...formData, id: Date.now().toString() });
    }
    
    setFormData({ name: '', calculationType: 'percentage', category: 'None', value: 0, percentage: 0, enabled: true });
    setShowAddForm(false);
  };

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      calculationType: item.calculationType || 'percentage',
      category: item.category || 'None',
      value: item.value,
      percentage: item.percentage || 0,
      enabled: item.enabled
    });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ name: '', calculationType: 'percentage', category: 'None', value: 0, percentage: 0, enabled: true });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleCalculationTypeChange = (value: 'percentage' | 'amount') => {
    setFormData({ 
      ...formData, 
      calculationType: value,
      category: value === 'amount' ? 'None' : formData.category
    });
  };

  const handleItemToggle = (id: string, enabled: boolean) => {
    onUpdate(id, { enabled });
  };

  const handlePercentageChange = (id: string, percentage: number) => {
    onUpdate(id, { percentage });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            checked={sectionEnabled}
            onCheckedChange={(checked) => setSectionEnabled(!!checked)}
          />
          <Label className="text-base font-semibold">Enabled by default</Label>
        </div>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600 mt-1 font-normal">{getDescriptionText(type)}</p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!sectionEnabled}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-4 ${!sectionEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-4 flex-1">
              <Checkbox
                checked={item.enabled}
                onCheckedChange={(checked) => handleItemToggle(item.id, checked as boolean)}
              />
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
                <div className="text-sm text-gray-500">
                  {item.category && item.category !== 'None' && `${item.category} - `}
                  {item.calculationType === 'percentage' ? `${item.value}%` : `₦${item.value.toLocaleString()}`}
                </div>
              </div>
              {item.enabled && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={item.percentage || 0}
                    onChange={(e) => handlePercentageChange(item.id, parseFloat(e.target.value) || 0)}
                    className="w-20"
                    placeholder="%"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(item)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {showAddForm && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Title *</Label>
                <SearchableInput
                  value={formData.name}
                  onChange={(value) => setFormData({ ...formData, name: value })}
                  options={defaultOptions}
                  placeholder={`Search and select ${type} title...`}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Start typing to see matching options from the predefined list
                </p>
              </div>
              
              <div>
                <Label>Calculation Type</Label>
                <RadioGroup
                  value={formData.calculationType}
                  onValueChange={handleCalculationTypeChange}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage (%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amount" id="amount" />
                    <Label htmlFor="amount">Amount (₦)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  disabled={formData.calculationType === 'amount' && formData.category !== 'None'}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => {
                      const isDisabled = formData.calculationType === 'percentage' && option === 'None';
                      return (
                        <SelectItem 
                          key={option} 
                          value={option}
                          disabled={isDisabled}
                        >
                          {option}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                  placeholder={formData.calculationType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                {editingId ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};