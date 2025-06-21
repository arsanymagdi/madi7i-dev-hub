import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardSidebar from "@/components/DashboardSidebar";
import ProjectWidget from "@/components/widgets/ProjectWidget";
import TeamActivityWidget from "@/components/widgets/TeamActivityWidget";
import DevToolsWidget from "@/components/widgets/DevToolsWidget";
import MetricsWidget from "@/components/widgets/MetricsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  Calendar, 
  MessageSquare, 
  Bell, 
  Zap, 
  Coffee,
  Rocket,
  Star
} from "lucide-react";

import { ref, onValue, push, set } from "firebase/database";
import { database } from "@/lib/firebase";

// Optional: define your expected project structure
type Project = {
  id: string; // Firebase-generated ID
  name: string;
  description: string;
  assignedUsers: string[];
  createdBy: string;
  createdAt: number;
};

const Dashboard = () => {
  const { userData } = useAuth();

  // State for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // State for new project form inputs
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectUsers, setNewProjectUsers] = useState(""); // comma-separated emails

  // Fetch projects from Firebase on mount
  useEffect(() => {
    const projectRef = ref(database, "projects");

    const unsubscribe = onValue(projectRef, (snapshot) => {
      const data = snapshot.val() || {};

const projectsArray: (Project & { id: string })[] = [];

Object.entries(data).forEach(([id, project]) => {
  if (
    project &&
    typeof project === "object" &&
    "name" in project &&
    "description" in project &&
    "assignedUsers" in project &&
    "createdBy" in project &&
    "createdAt" in project
  ) {
    projectsArray.push({
      id,
      ...(project as Project),
    });
  }
});

      setProjects(projectsArray);
      setLoadingProjects(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle new project submission
  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();

    if (!newProjectName.trim()) {
      alert("Project name is required");
      return;
    }

    const projectsRef = ref(database, "projects");
    const newProjectRef = push(projectsRef);

    const assignedUsers = newProjectUsers
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    await set(newProjectRef, {
      name: newProjectName,
      description: newProjectDesc,
      assignedUsers,
      createdBy: userData?.email || "unknown",
      createdAt: Date.now(),
    });

    setNewProjectName("");
    setNewProjectDesc("");
    setNewProjectUsers("");
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 w-full md:w-auto">
        <DashboardLayout>
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, <span className="text-gradient">{userData?.firstName || "Developer"}</span> 👋
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Badge variant="outline" className="gap-2 text-xs">
                  <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Focus Mode</span>
                  <span className="sm:hidden">Focus</span>
                </Badge>
                <Button className="gap-2 text-xs md:text-sm">
                  <Rocket className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Deploy Project</span>
                  <span className="sm:hidden">Deploy</span>
                </Button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {/* Reuse your stat cards here (Calendar, Messages, etc.) */}
              {/* ... */}
            </div>
          </div>

          {/* Active Projects Section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Active Projects</h2>
            {loadingProjects ? (
              <p>Loading projects...</p>
            ) : projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              <ul className="space-y-4 mb-6">
                {projects.map(({ id, name, description, assignedUsers }) => (
                  <li
                    key={id}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
                  >
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-muted-foreground">{description}</p>
                    <p className="mt-2 text-sm">
                      <strong>Assigned Users:</strong>{" "}
                      {assignedUsers?.length
                        ? assignedUsers.join(", ")
                        : "None"}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {/* Add New Project Form */}
            <form onSubmit={handleAddProject} className="space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Project Name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <textarea
                placeholder="Project Description"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                className="textarea textarea-bordered w-full"
              />
              <input
                type="text"
                placeholder="Assign Users (comma-separated emails)"
                value={newProjectUsers}
                onChange={(e) => setNewProjectUsers(e.target.value)}
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">
                Add Project
              </button>
            </form>
          </section>

          {/* Widgets & Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="xl:col-span-2">
              <ProjectWidget />
            </div>
            <div>
              <MetricsWidget />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <TeamActivityWidget />
            <DevToolsWidget />
          </div>

          <Card className="dev-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Star className="w-4 h-4 md:w-5 md:h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Team Chat</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Run Tests</span>
                </Button>
                <Button variant="outline" className="h-16 md:h-20 flex flex-col gap-1 md:gap-2 p-2">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-xs md:text-sm text-center">Deploy</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
