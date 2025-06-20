
import { useState } from "react";
import { Send, Search, Plus, Hash, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("general");

  const channels = [
    { id: "general", name: "general", type: "channel", unread: 0 },
    { id: "development", name: "development", type: "channel", unread: 2 },
    { id: "design", name: "design", type: "channel", unread: 1 },
    { id: "random", name: "random", type: "channel", unread: 0 }
  ];

  const directMessages = [
    { id: "alice", name: "Alice Johnson", online: true, unread: 1 },
    { id: "bob", name: "Bob Smith", online: false, unread: 0 },
    { id: "charlie", name: "Charlie Brown", online: true, unread: 0 }
  ];

  const messages = [
    {
      id: 1,
      user: "Alice Johnson",
      avatar: "/placeholder.svg",
      message: "Hey team! How's the new feature coming along?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      user: "You",
      avatar: "/placeholder.svg",
      message: "Making good progress! Should have it ready by tomorrow.",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      user: "Bob Smith",
      avatar: "/placeholder.svg",
      message: "Great! I'll have the designs ready for review later today.",
      time: "10:35 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-12rem)] flex gap-4">
        {/* Sidebar */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Team Chat</h2>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search conversations..." className="pl-10 h-8" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Channels</h3>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedChannel === channel.id 
                        ? "bg-blue-100 text-blue-900" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Hash className="w-4 h-4" />
                    <span className="flex-1 text-left">{channel.name}</span>
                    {channel.unread > 0 && (
                      <Badge variant="secondary" className="text-xs px-1">
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Direct Messages</h3>
              <div className="space-y-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {dm.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {dm.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
                      )}
                    </div>
                    <span className="flex-1 text-left">{dm.name}</span>
                    {dm.unread > 0 && (
                      <Badge variant="secondary" className="text-xs px-1">
                        {dm.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              <h2 className="font-semibold">{selectedChannel}</h2>
              <Badge variant="outline" className="ml-auto">
                <Users className="w-3 h-3 mr-1" />
                12 members
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={msg.avatar} alt={msg.user} />
                    <AvatarFallback className="text-xs">
                      {msg.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${msg.isOwn ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div
                      className={`inline-block p-3 rounded-lg max-w-md ${
                        msg.isOwn
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`Message #${selectedChannel}`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Chat;
