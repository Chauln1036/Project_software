import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Plus, Users, Calendar, DollarSign, Clock } from "lucide-react";
import { Project, Task } from "../types";

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees] = useState<any[]>([]); // TODO: Replace with proper Employee type
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    name: "",
    description: "",
    status: "planning",
    progress: 0,
    startDate: "",
    endDate: "",
    managerId: "",
    teamMembers: [],
    budget: 0,
  });

  const [taskForm, setTaskForm] = useState<Partial<Task>>({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    status: "todo",
    priority: "medium",
    dueDate: "",
    hoursLogged: 0,
    estimatedHours: 0,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "planning":
        return "bg-yellow-500";
      case "on-hold":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "in-progress": "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      planning: "bg-yellow-100 text-yellow-700",
      "on-hold": "bg-red-100 text-red-700",
      todo: "bg-gray-100 text-gray-700",
      review: "bg-purple-100 text-purple-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const openAddProjectDialog = () => {
    setProjectForm({
      name: "",
      description: "",
      status: "planning",
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      managerId: "",
      teamMembers: [],
      budget: 0,
    });
    setDialogOpen(true);
  };

  const openAddTaskDialog = (projectId?: string) => {
    setTaskForm({
      title: "",
      description: "",
      projectId: projectId || "",
      assignedTo: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      hoursLogged: 0,
      estimatedHours: 0,
    });
    setTaskDialogOpen(true);
  };

  const handleSaveProject = () => {
    const newProject: Project = {
      id: `proj${String(projects.length + 1).padStart(3, "0")}`,
      name: projectForm.name || "",
      description: projectForm.description || "",
      status: projectForm.status || "planning",
      progress: projectForm.progress || 0,
      startDate: projectForm.startDate || "",
      endDate: projectForm.endDate || "",
      managerId: projectForm.managerId || "",
      teamMembers: projectForm.teamMembers || [],
      budget: projectForm.budget || 0,
    };
    setProjects([...projects, newProject]);
    setDialogOpen(false);
  };

  const handleSaveTask = () => {
    const newTask: Task = {
      id: `task${String(tasks.length + 1).padStart(3, "0")}`,
      title: taskForm.title || "",
      description: taskForm.description || "",
      projectId: taskForm.projectId || "",
      assignedTo: taskForm.assignedTo || "",
      status: taskForm.status || "todo",
      priority: taskForm.priority || "medium",
      dueDate: taskForm.dueDate || "",
      hoursLogged: taskForm.hoursLogged || 0,
      estimatedHours: taskForm.estimatedHours || 0,
    };
    setTasks([...tasks, newTask]);
    setTaskDialogOpen(false);
  };

  const getProjectTasks = (projectId: string) => {
    return tasks.filter((t) => t.projectId === projectId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Project Management</h2>
          <p className="text-gray-600">Manage projects and track progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => openAddTaskDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button onClick={openAddProjectDialog}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="tasks">All Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project) => {
              const projectTasks = getProjectTasks(project.id);
              const manager = employees.find(
                (e: any) => e.id === project.managerId
              );

              return (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {project.name}
                          <Badge className={getStatusBadge(project.status)}>
                            {project.status}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <p className="text-xs">Start Date</p>
                          <p>
                            {new Date(project.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <p className="text-xs">End Date</p>
                          <p>
                            {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <div>
                          <p className="text-xs">Team Size</p>
                          <p>{project.teamMembers.length} members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <div>
                          <p className="text-xs">Budget</p>
                          <p>${project.budget?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {manager && (
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-600">Project Manager</p>
                        <p className="text-sm">{manager.name}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm text-gray-600">
                        {projectTasks.length} tasks
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAddTaskDialog(project.id)}
                      >
                        Add Task
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {tasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              const assignee = employees.find(
                (e: any) => e.id === task.assignedTo
              );
              const progressPercent =
                task.estimatedHours > 0
                  ? Math.round((task.hoursLogged / task.estimatedHours) * 100)
                  : 0;

              return (
                <Card key={task.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(
                          task.status
                        )}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p>{task.title}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {task.description}
                            </p>
                          </div>
                          <Badge className={getStatusBadge(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
                          {project && (
                            <span className="flex items-center gap-1">
                              📁 {project.name}
                            </span>
                          )}
                          {assignee && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {assignee.name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.hoursLogged}/{task.estimatedHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <Badge className={getStatusBadge(task.status)}>
                            {task.status}
                          </Badge>
                        </div>

                        {task.estimatedHours > 0 && (
                          <div className="mt-3">
                            <Progress value={progressPercent} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Project Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project to track</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={projectForm.description}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={projectForm.startDate}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={projectForm.endDate}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, endDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={projectForm.budget}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      budget: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Project Manager *</Label>
                <Select
                  value={projectForm.managerId}
                  onValueChange={(value: string) =>
                    setProjectForm({ ...projectForm, managerId: value })
                  }
                >
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees
                      .filter(
                        (e: any) =>
                          e.position &&
                          (e.position.includes("Manager") ||
                            e.position.includes("Lead"))
                      )
                      .map((emp: any) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a task to a project</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Task Title *</Label>
              <Input
                id="taskTitle"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taskDesc">Description</Label>
              <Textarea
                id="taskDesc"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project">Project *</Label>
                <Select
                  value={taskForm.projectId}
                  onValueChange={(value: string) =>
                    setTaskForm({ ...taskForm, projectId: value })
                  }
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((proj) => (
                      <SelectItem key={proj.id} value={proj.id}>
                        {proj.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignee">Assign To *</Label>
                <Select
                  value={taskForm.assignedTo}
                  onValueChange={(value: string) =>
                    setTaskForm({ ...taskForm, assignedTo: value })
                  }
                >
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp: any) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={taskForm.priority}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setTaskForm({ ...taskForm, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  type="number"
                  value={taskForm.estimatedHours}
                  onChange={(e) =>
                    setTaskForm({
                      ...taskForm,
                      estimatedHours: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
