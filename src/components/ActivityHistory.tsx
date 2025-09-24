import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Edit } from 'lucide-react';

interface ActivityRecord {
  id: string;
  period: string;
  employee: string;
  type: string;
  item: string;
  amount: number;
  date: string;
  status: 'active' | 'deleted' | 'edited';
  deletedBy?: string;
  deleteReason?: string;
  deleteDate?: string;
  editHistory?: { previousValue: string; newValue: string; editDate: string; editBy: string }[];
}

const ActivityHistory: React.FC = () => {
  const [deleteReason, setDeleteReason] = useState('');
  const [activities, setActivities] = useState<ActivityRecord[]>([
    {
      id: '1',
      period: 'March 2024',
      employee: 'John Doe',
      type: 'Deduction',
      item: 'Tax',
      amount: 5000,
      date: '2024-03-15',
      status: 'active'
    },
    {
      id: '2',
      period: 'March 2024',
      employee: 'Jane Smith',
      type: 'Bonus',
      item: 'Performance Bonus',
      amount: 10000,
      date: '2024-03-10',
      status: 'deleted',
      deletedBy: 'Admin User',
      deleteReason: 'Error in Value',
      deleteDate: '2024-03-16 10:30 AM'
    }
  ]);

  const deleteReasons = ['Error in Value', 'Error in %', 'Error in Name'];

  const handleDelete = (activityId: string) => {
    if (!deleteReason) return;
    
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;
    
    const daysDiff = Math.floor((new Date().getTime() - new Date(activity.date).getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff > 30) {
      alert('Activities older than 30 days cannot be deleted.');
      return;
    }
    
    setActivities(activities.map(a => 
      a.id === activityId 
        ? { ...a, status: 'deleted', deletedBy: 'Current User', deleteReason, deleteDate: new Date().toLocaleString() }
        : a
    ));
    setDeleteReason('');
  };

  const canDelete = (activity: ActivityRecord) => {
    const daysDiff = Math.floor((new Date().getTime() - new Date(activity.date).getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 30 && activity.status === 'active';
  };

  return (
    <Card>
      <CardHeader><CardTitle>Activities History</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Period</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} className={activity.status === 'deleted' ? 'bg-red-50' : ''}>
                <TableCell>{activity.period}</TableCell>
                <TableCell>{activity.employee}</TableCell>
                <TableCell>
                  <Badge variant={activity.type === 'Deduction' ? 'destructive' : 'default'}>
                    {activity.type}
                  </Badge>
                </TableCell>
                <TableCell>{activity.item}</TableCell>
                <TableCell>₦{activity.amount.toLocaleString()}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  {activity.status === 'deleted' ? (
                    <div className="text-xs text-red-600">
                      <div>DELETED</div>
                      <div>By: {activity.deletedBy}</div>
                      <div>Reason: {activity.deleteReason}</div>
                      <div>Date: {activity.deleteDate}</div>
                    </div>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {activity.status === 'active' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                      {canDelete(activity) && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                              <AlertDialogDescription>Please select a reason for deletion:</AlertDialogDescription>
                            </AlertDialogHeader>
                            <RadioGroup value={deleteReason} onValueChange={setDeleteReason}>
                              {deleteReasons.map(reason => (
                                <div key={reason} className="flex items-center space-x-2">
                                  <RadioGroupItem value={reason} id={reason} />
                                  <Label htmlFor={reason}>{reason}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(activity.id)} disabled={!deleteReason}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;