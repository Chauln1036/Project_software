import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, Calendar, Award } from "lucide-react";
import { useState } from "react";

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("monthly");

  // Mock data for now - replace with API calls later
  const employees: any[] = [];
  const projects: any[] = [];
  const performanceReviews: any[] = [];

  // Department-wise employee distribution
  const departmentData = [
    "Engineering",
    "HR",
    "Marketing",
    "Finance",
    "Operations",
  ].map((dept) => ({
    name: dept,
    employees: employees.filter((e: any) => e.department === dept).length,
    avgSalary: Math.round(
      employees
        .filter((e: any) => e.department === dept)
        .reduce((acc: number, e: any) => acc + (e.salary || 0), 0) /
        (employees.filter((e: any) => e.department === dept).length || 1)
    ),
  }));

  // Project status distribution
  const projectStatusData = [
    {
      name: "In Progress",
      value: projects.filter((p: any) => p.status === "in-progress").length,
      color: "#3b82f6",
    },
    {
      name: "Completed",
      value: projects.filter((p: any) => p.status === "completed").length,
      color: "#10b981",
    },
    {
      name: "Planning",
      value: projects.filter((p: any) => p.status === "planning").length,
      color: "#f59e0b",
    },
    {
      name: "On Hold",
      value: projects.filter((p: any) => p.status === "on-hold").length,
      color: "#ef4444",
    },
  ];

  // Attendance trend (mock data for last 7 days)
  const attendanceTrendData = [
    { date: "Mon", present: 48, absent: 2, leave: 0 },
    { date: "Tue", present: 47, absent: 3, leave: 0 },
    { date: "Wed", present: 49, absent: 1, leave: 0 },
    { date: "Thu", present: 46, absent: 2, leave: 2 },
    { date: "Fri", present: 48, absent: 1, leave: 1 },
    { date: "Sat", present: 25, absent: 25, leave: 0 },
    { date: "Sun", present: 0, absent: 0, leave: 0 },
  ];

  // Performance distribution
  const performanceData = [
    { range: "4.5-5.0", count: 2, label: "Excellent" },
    { range: "4.0-4.4", count: 3, label: "Good" },
    { range: "3.5-3.9", count: 4, label: "Average" },
    { range: "3.0-3.4", count: 1, label: "Below Average" },
  ];

  // Monthly salary expenses by department
  const salaryExpensesData = departmentData.map((dept) => ({
    department: dept.name,
    totalExpense: dept.employees * dept.avgSalary,
  }));

  // Employee growth trend
  const employeeGrowthData = [
    { month: "Jan", employees: 42 },
    { month: "Feb", employees: 45 },
    { month: "Mar", employees: 46 },
    { month: "Apr", employees: 48 },
    { month: "May", employees: 49 },
    { month: "Jun", employees: 50 },
  ];

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Projects",
      value: projects.filter((p: any) => p.status === "in-progress").length,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Attendance",
      value: "96%",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Avg Performance",
      value: "4.3",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Reports & Analytics</h2>
          <p className="text-gray-600">
            Comprehensive business insights and metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-3xl mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Department Analytics */}
        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Distribution by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="employees" fill="#3b82f6" name="Employees" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Salary by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="avgSalary" fill="#10b981" name="Avg Salary" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Expenses by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salaryExpensesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="totalExpense"
                      fill="#8b5cf6"
                      name="Total Expense"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employee Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={employeeGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="employees"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Employees"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Project Analytics */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Completion Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 4).map((project: any) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{project.name}</p>
                        <span className="text-sm text-gray-600">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projects}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="budget" fill="#f59e0b" name="Budget" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-gray-600">Total Projects</span>
                    <span className="text-2xl">{projects.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-gray-600">In Progress</span>
                    <span className="text-2xl text-blue-600">
                      {
                        projects.filter((p: any) => p.status === "in-progress")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-gray-600">Completed</span>
                    <span className="text-2xl text-green-600">
                      {
                        projects.filter((p: any) => p.status === "completed")
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-gray-600">Total Budget</span>
                    <span className="text-2xl text-purple-600">
                      $
                      {projects
                        .reduce(
                          (acc: number, p: any) => acc + (p.budget || 0),
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Attendance Analytics */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10b981" name="Present" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                    <Bar dataKey="leave" fill="#f59e0b" name="On Leave" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <span className="text-gray-700">
                      Average Attendance Rate
                    </span>
                    <span className="text-2xl text-green-600">96%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">On Time Check-ins</span>
                    <span className="text-xl">94%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">Late Check-ins</span>
                    <span className="text-xl text-orange-600">6%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">Average Hours/Day</span>
                    <span className="text-xl">8.2h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Engineering", "HR", "Marketing", "Finance"].map(
                    (dept, idx) => {
                      const rate = [98, 95, 97, 94][idx];
                      return (
                        <div key={dept} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{dept}</span>
                            <span className="text-sm text-gray-600">
                              {rate}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Analytics */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8b5cf6" name="Employees" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                    <span className="text-gray-700">Average Rating</span>
                    <span className="text-2xl text-blue-600">4.3/5.0</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">Top Performers</span>
                    <span className="text-xl text-green-600">18%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">Reviews Completed</span>
                    <span className="text-xl">{performanceReviews.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="text-gray-600">Improvement Rate</span>
                    <span className="text-xl text-green-600">+12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceReviews
                    .sort((a: any, b: any) => b.overallRating - a.overallRating)
                    .map((review: any, idx: number) => (
                      <div
                        key={review.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                            <span className="text-white">#{idx + 1}</span>
                          </div>
                          <div>
                            <p>{review.employeeName}</p>
                            <p className="text-sm text-gray-600">
                              {review.reviewPeriod}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl text-green-600">
                            {review.overallRating.toFixed(1)}
                          </p>
                          <p className="text-xs text-gray-600">Rating</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
