import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, BookOpen, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  startDate: Date;
  endDate: Date;
}

interface TrainingEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  participants: number;
}

const TrainingManagement: React.FC = () => {
  const [programs, setPrograms] = useState<TrainingProgram[]>([
    {
      id: '1',
      title: 'New Employee Orientation',
      description: 'Comprehensive onboarding program',
      duration: '2 weeks',
      status: 'Active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [events, setEvents] = useState<TrainingEvent[]>([
    {
      id: '1',
      title: 'Safety Training',
      date: new Date(2024, 3, 15),
      time: '09:00',
      type: 'Workshop',
      participants: 12
    }
  ]);

  const [showProgramForm, setShowProgramForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Training Management</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => setShowProgramForm(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Program
          </Button>
          <Button onClick={() => setShowEventForm(true)} variant="outline" className="w-full sm:w-auto">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Training Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {programs.map((program) => (
              <div key={program.id} className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="flex-1">
                    <h4 className="font-medium">{program.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <span className="text-sm text-blue-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {program.duration}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded text-xs ${
                        program.status === 'Active' ? 'bg-green-100 text-green-800' :
                        program.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {program.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Training Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-blue-50 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div className="flex-1">
                    <h5 className="font-medium">{event.title}</h5>
                    <p className="text-sm text-gray-600">{event.type}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {format(event.date, 'MMM dd')}
                      </span>
                      <span className="text-xs text-gray-600">{event.time}</span>
                      <span className="text-xs text-gray-600">{event.participants} participants</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {showProgramForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Training Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" placeholder="Enter program title" />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 2 weeks" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Program description" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Create Program</Button>
              <Button variant="outline" onClick={() => setShowProgramForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showEventForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Training Event</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input id="eventTitle" placeholder="Enter event title" />
              </div>
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="training">Training Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="w-full sm:w-auto">Schedule Event</Button>
              <Button variant="outline" onClick={() => setShowEventForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingManagement;