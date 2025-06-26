
import { useState } from "react";
import { Plus, Search, Users, Mail, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const teams = [
    {
      id: 1,
      name: "Frontend Team",
      description: "Responsible for UI/UX development",
      members: [
        { name: "Alice Johnson", role: "Lead Developer", avatar: "/placeholder.svg" },
        { name: "Bob Smith", role: "UI Designer", avatar: "/placeholder.svg" },
        { name: "Charlie Brown", role: "Developer", avatar: "/placeholder.svg" }
      ],
      projects: 5,
      status: "Active"
    },
    {
      id: 2,
      name: "Backend Team",
      description: "API development and database management",
      members: [
        { name: "Diana Prince", role: "Senior Developer", avatar: "/placeholder.svg" },
        { name: "Ethan Hunt", role: "DevOps Engineer", avatar: "/placeholder.svg" }
      ],
      projects: 3,
      status: "Active"
    },
    {
      id: 3,
      name: "QA Team",
      description: "Quality assurance and testing",
      members: [
        { name: "Fiona Green", role: "QA Lead", avatar: "/placeholder.svg" },
        { name: "George Wilson", role: "Test Engineer", avatar: "/placeholder.svg" }
      ],
      projects: 8,
      status: "Active"
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
            <p className="text-gray-600">Manage your development teams and collaborate</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Team
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{team.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{team.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium">{team.members.length}</span>
                </div>
                
                <div className="flex -space-x-2">
                  {team.members.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-medium">+{team.members.length - 4}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {team.members.slice(0, 2).map((member, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{member.name}</p>
                        <p className="text-gray-500 text-xs">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-600">{team.projects} active projects</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Mail className="w-3 h-3" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
    </div>
    </div>
  );
};

export default Teams;
