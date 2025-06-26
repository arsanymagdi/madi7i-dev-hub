
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardSidebar from "@/components/DashboardSidebar";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Team Standup",
      time: "09:00 AM",
      type: "meeting",
      date: new Date().getDate()
    },
    {
      id: 2,
      title: "Code Review",
      time: "02:00 PM",
      type: "review",
      date: new Date().getDate()
    },
    {
      id: 3,
      title: "Project Deadline",
      time: "11:59 PM",
      type: "deadline",
      date: new Date().getDate() + 2
    },
    {
      id: 4,
      title: "Client Meeting",
      time: "10:00 AM",
      type: "meeting",
      date: new Date().getDate() + 5
    }
  ];

  const getMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysCount; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => event.date === day);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-green-100 text-green-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todayEvents = events.filter(event => event.date === new Date().getDate());

  return (
            <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 w-full md:w-auto">
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600">Manage your schedule and deadlines</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Event
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {getMonthYear()}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[80px] p-1 border rounded-lg ${
                        day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                      } ${
                        day === new Date().getDate() && 
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear()
                          ? 'bg-blue-50 border-blue-200'
                          : 'border-gray-200'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-medium mb-1">{day}</div>
                          <div className="space-y-1">
                            {getEventsForDay(day).slice(0, 2).map(event => (
                              <div
                                key={event.id}
                                className="text-xs p-1 rounded truncate bg-blue-100 text-blue-800"
                              >
                                {event.title}
                              </div>
                            ))}
                            {getEventsForDay(day).length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{getEventsForDay(day).length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Events */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todayEvents.length > 0 ? (
                  todayEvents.map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-8 bg-blue-600 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.time}</p>
                      </div>
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No events today</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events.filter(e => e.type === 'deadline').map(event => (
                  <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg border-red-200">
                    <div className="w-2 h-8 bg-red-600 rounded-full" />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {currentDate.getMonth() + 1}/{event.date}/{currentDate.getFullYear()}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </div>
    </div>
  );
};

export default Calendar;
