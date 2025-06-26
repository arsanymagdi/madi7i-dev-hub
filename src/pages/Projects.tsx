import { useState } from "react";
import { Plus, Search, Filter, FolderOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [projects, setProjects] = useState<any[]>([
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Full-stack React application with payment integration",
      status: "In Progress",
      progress: 75,
      lastUpdated: "2 hours ago",
      technologies: ["React", "Node.js", "MongoDB"],
      members: ["john@example.com", "sarah@example.com"],
    },
    {
      id: 2,
      name: "Mobile App Backend",
      description: "REST API for mobile application",
      status: "Completed",
      progress: 100,
      lastUpdated: "1 day ago",
      technologies: ["Express", "PostgreSQL", "JWT"],
      members: ["alice@example.com"],
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Planning": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddMember = () => {
    if (newEmail.trim() && !memberEmails.includes(newEmail.trim())) {
      setMemberEmails([...memberEmails, newEmail.trim()]);
      setNewEmail("");
    }
  };

  const handleRemoveMember = (email: string) => {
    setMemberEmails(memberEmails.filter(e => e !== email));
  };

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now(),
      name: projectName,
      description: projectDesc,
      status: "Planning",
      progress: 0,
      lastUpdated: "just now",
      technologies: [],
      members: memberEmails
    };
    setProjects([newProject, ...projects]);
    setShowModal(false);
    setProjectName("");
    setProjectDesc("");
    setMemberEmails([]);
  };

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
        <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 w-full md:w-auto">
    <DashboardLayout>
      <div className="space-y-6 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Manage and track your development projects</p>
          </div>
          <Button className="gap-2" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{project.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Updated {project.lastUpdated}
                </p>

                <div className="text-xs">
                  <strong>Members:</strong> {project.members.join(", ")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ➕ Create Project Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Project name"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
              <Textarea
                placeholder="Project description"
                value={projectDesc}
                onChange={e => setProjectDesc(e.target.value)}
              />
              <div>
                <label className="text-sm font-medium">Add Members</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    placeholder="Enter member email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddMember}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {memberEmails.map(email => (
                    <Badge key={email} className="flex items-center gap-1">
                      {email}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveMember(email)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleCreateProject} disabled={!projectName.trim()}>
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
          </div>
    </div>
  );
};

export default Projects;
