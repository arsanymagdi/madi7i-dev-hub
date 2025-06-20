
import { useState } from "react";
import { Bell, Check, X, Filter, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";

const Notifications = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "mention",
      title: "You were mentioned in #development",
      message: "Alice mentioned you in a discussion about the new API endpoints",
      time: "2 minutes ago",
      read: false,
      avatar: "/placeholder.svg",
      user: "Alice Johnson"
    },
    {
      id: 2,
      type: "project",
      title: "Project deadline approaching",
      message: "E-commerce Platform project is due in 2 days",
      time: "1 hour ago",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      type: "team",
      title: "New team member added",
      message: "David Wilson joined the Frontend Team",
      time: "3 hours ago",
      read: true,
      avatar: "/placeholder.svg",
      user: "David Wilson"
    },
    {
      id: 4,
      type: "system",
      title: "System maintenance scheduled",
      message: "Planned maintenance window: Tonight 11 PM - 2 AM",
      time: "6 hours ago",
      read: true,
      priority: "medium"
    },
    {
      id: 5,
      type: "comment",
      title: "New comment on your code review",
      message: "Bob left feedback on your pull request #142",
      time: "1 day ago",
      read: true,
      avatar: "/placeholder.svg",
      user: "Bob Smith"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "mention": return "💬";
      case "project": return "📁";
      case "team": return "👥";
      case "system": return "⚙️";
      case "comment": return "💭";
      default: return "🔔";
    }
  };

  const getNotificationColor = (type: string, read: boolean) => {
    if (read) return "bg-gray-50";
    switch (type) {
      case "mention": return "bg-blue-50 border-l-4 border-l-blue-500";
      case "project": return "bg-orange-50 border-l-4 border-l-orange-500";
      case "team": return "bg-green-50 border-l-4 border-l-green-500";
      case "system": return "bg-purple-50 border-l-4 border-l-purple-500";
      case "comment": return "bg-yellow-50 border-l-4 border-l-yellow-500";
      default: return "bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const markAsRead = (id: number) => {
    console.log("Marking notification as read:", id);
  };

  const deleteNotification = (id: number) => {
    console.log("Deleting notification:", id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </h1>
            <p className="text-gray-600">Stay updated with your team and projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-4">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-all hover:shadow-md ${getNotificationColor(notification.type, notification.read)}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notification.title}
                            </h3>
                            {notification.priority && (
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {notification.user && (
                                <div className="flex items-center gap-1">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={notification.avatar} alt={notification.user} />
                                    <AvatarFallback className="text-xs">
                                      {notification.user.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-gray-500">{notification.user}</span>
                                </div>
                              )}
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            
                            <div className="flex gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-7 px-2"
                                >
                                  <Check className="w-3 h-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-7 px-2 text-red-600 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-600">
                    {filter === "unread" 
                      ? "You're all caught up! No unread notifications."
                      : "When you have notifications, they'll appear here."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
