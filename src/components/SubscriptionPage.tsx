import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Building, Crown, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  maxEmployees: number;
}

const SubscriptionPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 15000,
      period: 'month',
      description: 'Perfect for small businesses just getting started',
      maxEmployees: 10,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-500',
      features: [
        'Up to 10 employees',
        'Basic payroll processing',
        'Employee records management',
        'Basic attendance tracking',
        'Email support',
        'Monthly reports'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 35000,
      period: 'month',
      description: 'Ideal for growing businesses with advanced needs',
      maxEmployees: 50,
      popular: true,
      icon: <Building className="h-6 w-6" />,
      color: 'bg-green-500',
      features: [
        'Up to 50 employees',
        'Advanced payroll processing',
        'Full HR management suite',
        'Advanced attendance & leave management',
        'Performance evaluation tools',
        'Priority email & phone support',
        'Custom reports & analytics',
        'Tax calculations & filing'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 75000,
      period: 'month',
      description: 'Comprehensive solution for large organizations',
      maxEmployees: 200,
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-purple-500',
      features: [
        'Up to 200 employees',
        'Complete payroll & HR suite',
        'Multi-location management',
        'Advanced reporting & analytics',
        'API integrations',
        'Dedicated account manager',
        '24/7 priority support',
        'Custom workflows',
        'Compliance management'
      ]
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      price: 150000,
      period: 'month',
      description: 'No limits solution for enterprise corporations',
      maxEmployees: 999999,
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-orange-500',
      features: [
        'Unlimited employees',
        'All Enterprise features',
        'White-label solution',
        'Custom integrations',
        'On-premise deployment option',
        'Dedicated infrastructure',
        'Custom training & onboarding',
        'SLA guarantees'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 8000,
      period: 'month',
      description: 'Essential features for micro businesses',
      maxEmployees: 5,
      icon: <Star className="h-6 w-6" />,
      color: 'bg-gray-500',
      features: [
        'Up to 5 employees',
        'Basic payroll only',
        'Simple employee records',
        'Basic reports',
        'Email support only'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 120000,
      period: 'month',
      description: 'Premium features for established enterprises',
      maxEmployees: 500,
      icon: <Crown className="h-6 w-6" />,
      color: 'bg-indigo-500',
      features: [
        'Up to 500 employees',
        'All Professional features',
        'Advanced analytics dashboard',
        'Multi-currency support',
        'Advanced security features',
        'Custom branding',
        'Dedicated support team',
        'Training & consultation'
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowConfirmation(true);
  };

  const handleConfirmSubscription = () => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    alert(`Successfully subscribed to ${plan?.name} plan!`);
    setShowConfirmation(false);
    setSelectedPlan(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subscription Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your business needs. All plans include core HR and payroll features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Up to {plan.maxEmployees === 999999 ? 'Unlimited' : plan.maxEmployees} employees
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full ${plan.popular ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Subscription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedPlan && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {subscriptionPlans.find(p => p.id === selectedPlan)?.name} Plan
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {formatPrice(subscriptionPlans.find(p => p.id === selectedPlan)?.price || 0)}/month
                  </p>
                  <p className="text-gray-600 mb-4">
                    {subscriptionPlans.find(p => p.id === selectedPlan)?.description}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleConfirmSubscription} className="bg-green-600 hover:bg-green-700">
                      Confirm & Subscribe
                    </Button>
                    <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubscriptionPage;