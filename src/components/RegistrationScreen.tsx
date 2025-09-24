import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

type UserRole = 'Super Admin' | 'HR' | 'Accountant';

interface RegistrationData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: UserRole;
  organizationName?: string;
  location?: string;
  pin?: string;
}

interface RegistrationScreenProps {
  onRegister: (data: RegistrationData) => void;
  onNavigateToLogin: () => void;
}

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
  'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  onRegister,
  onNavigateToLogin
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'HR'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
        return;
      }

      if (formData.role === 'Super Admin') {
        if (!formData.organizationName || !formData.location || !formData.pin) {
          toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
          return;
        }
        if (formData.pin.length !== 8 || !/^\d{8}$/.test(formData.pin)) {
          toast({ title: 'Error', description: 'PIN must be exactly 8 digits', variant: 'destructive' });
          return;
        }
      }

      let organizationId = null;

      // Step 1: Handle organization creation/validation FIRST
      if (formData.role === 'Super Admin') {
        // Check if PIN already exists first
        const { data: existingOrg } = await supabase
          .from('organizations')
          .select('id')
          .eq('pin', formData.pin)
          .single();

        if (existingOrg) {
          toast({ 
            title: 'Error', 
            description: 'This PIN is already in use. Please choose a different PIN.', 
            variant: 'destructive' 
          });
          return;
        }

        // Create organization
        const { data: newOrg, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: formData.organizationName,
            location: formData.location,
            pin: formData.pin
          })
          .select('id')
          .single();

        if (orgError) {
          console.error('Organization creation error:', orgError);
          if (orgError.code === '23505') {
            toast({ 
              title: 'Error', 
              description: 'This PIN is already in use. Please choose a different PIN.', 
              variant: 'destructive' 
            });
          } else {
            toast({ 
              title: 'Error', 
              description: orgError.message || 'Failed to create organization', 
              variant: 'destructive' 
            });
          }
          return;
        }
        organizationId = newOrg.id;
      } else if (formData.role === 'HR' || formData.role === 'Accountant') {
        if (!formData.organizationName || !formData.pin) {
          toast({ title: 'Error', description: 'Please enter organization name and PIN', variant: 'destructive' });
          return;
        }
        
        // Check if organization exists
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('id')
          .eq('name', formData.organizationName)
          .eq('pin', formData.pin)
          .single();

        if (orgError || !orgData) {
          toast({ title: 'Error', description: 'Organization does not exist', variant: 'destructive' });
          return;
        }
        organizationId = orgData.id;
      }

      // Step 2: Create auth user AFTER organization is handled
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast({ title: 'Error', description: authError.message, variant: 'destructive' });
        return;
      }

      // Step 3: Create user profile LAST with organization reference
      if (authData.user) {
        const { error: userError } = await supabase
          .from('user_profiles')
          .insert({
            auth_id: authData.user.id,
            email: formData.email,
            phone_number: formData.phoneNumber,
            role: formData.role,
            organization_id: organizationId
          });

        if (userError) {
          console.error('User profile error:', userError);
          toast({ title: 'Error', description: 'Failed to create user profile', variant: 'destructive' });
          return;
        }

        toast({ title: 'Success', description: 'Account created successfully!' });
        
        // Call onRegister to trigger navigation to dashboard
        onRegister(formData);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({ title: 'Error', description: 'Registration failed', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2"><span className="text-blue-600">MiPay</span>
          <span className="text-purple-600">Master</span></div>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                required
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(value: UserRole) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Accountant">Accountant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.role === 'Super Admin' && (
              <>
                <div>
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName || ''}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label>Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pin">8-Digit PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    maxLength={8}
                    value={formData.pin || ''}
                    onChange={(e) => setFormData({...formData, pin: e.target.value})}
                    placeholder="Choose a unique 8-digit PIN"
                    required
                  />
                </div>
              </>
            )}

            {(formData.role === 'HR' || formData.role === 'Accountant') && (
              <>
                <div>
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName || ''}
                    onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    placeholder="Enter existing organization name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pin">8-Digit PIN</Label>
                  <Input
                    id="pin"
                    type="password"
                    maxLength={8}
                    value={formData.pin || ''}
                    onChange={(e) => setFormData({...formData, pin: e.target.value})}
                    placeholder="Enter organization PIN"
                    required
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <span className="text-sm">Already have an account? </span>
            <button
              onClick={onNavigateToLogin}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationScreen;