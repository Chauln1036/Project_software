import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { LeaveRequest, User } from "../types";

interface LeaveManagementProps {
  user: User;
}

export default function LeaveManagement({ user }: LeaveManagementProps) {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const [leaveForm, setLeaveForm] = useState({
    type: "vacation" as "sick" | "vacation" | "personal" | "other",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const myLeaveBalance = {
    vacation: 15,
    sick: 10,
    personal: 5,
    used: 8,
  };

  const filteredRequests = leaveRequests.filter((req) => {
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    const matchesUser =
      user.role === "employee" ? req.employeeId === user.id : true;
    return matchesStatus && matchesUser;
  });

  const pendingCount = leaveRequests.filter(
    (r) => r.status === "pending"
  ).length;
  const approvedCount = leaveRequests.filter(
    (r) => r.status === "approved"
  ).length;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle2 className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getLeaveTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      sick: "bg-red-50 text-red-700",
      vacation: "bg-blue-50 text-blue-700",
      personal: "bg-purple-50 text-purple-700",
      other: "bg-gray-50 text-gray-700",
    };
    return colors[type] || "bg-gray-50 text-gray-700";
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmitLeave = () => {
    const days = calculateDays(leaveForm.startDate, leaveForm.endDate);
    const newRequest: LeaveRequest = {
      id: `leave${String(leaveRequests.length + 1).padStart(3, "0")}`,
      employeeId: user.id,
      employeeName: user.name,
      type: leaveForm.type,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      days,
      reason: leaveForm.reason,
      status: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setDialogOpen(false);
    setLeaveForm({
      type: "vacation",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const handleApproveReject = (id: string, status: "approved" | "rejected") => {
    setLeaveRequests(
      leaveRequests.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Leave Management</h2>
          <p className="text-gray-600">Apply for leave and track requests</p>
        </div>
        {user.role && ["employee", "manager"].includes(user.role) && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Apply for Leave
          </Button>
        )}
      </div>

      {/* Leave Balance - For Employees */}
      {user.role === "employee" && (
        <Card>
          <CardHeader>
            <CardTitle>My Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Vacation Days</p>
                <p className="text-2xl mt-1">{myLeaveBalance.vacation}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Sick Leave</p>
                <p className="text-2xl mt-1">{myLeaveBalance.sick}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600">Personal Days</p>
                <p className="text-2xl mt-1">{myLeaveBalance.personal}</p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-sm text-blue-600">Days Used</p>
                <p className="text-2xl mt-1 text-blue-700">
                  {myLeaveBalance.used}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats for HR/Manager */}
      {user.role && ["admin", "hr", "manager"].includes(user.role) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-3xl mt-2">{leaveRequests.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Approval</p>
                  <p className="text-3xl mt-2">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-3xl mt-2">{approvedCount}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {user.role === "employee"
                ? "My Leave Requests"
                : "Leave Requests"}
            </CardTitle>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {user.role &&
                  ["admin", "hr", "manager"].includes(user.role) && (
                    <TableHead>Employee</TableHead>
                  )}
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                {user.role &&
                  ["admin", "hr", "manager"].includes(user.role) && (
                    <TableHead>Actions</TableHead>
                  )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  {user.role &&
                    ["admin", "hr", "manager"].includes(user.role) && (
                      <TableCell>
                        <p>{request.employeeName}</p>
                      </TableCell>
                    )}
                  <TableCell>
                    <Badge className={getLeaveTypeColor(request.type)}>
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(request.startDate).toLocaleDateString()}</p>
                      <p className="text-gray-500">
                        to {new Date(request.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{request.days} days</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {request.reason}
                  </TableCell>
                  <TableCell>
                    {new Date(request.appliedOn).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(request.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </Badge>
                  </TableCell>
                  {user.role &&
                    ["admin", "hr", "manager"].includes(user.role) && (
                      <TableCell>
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleApproveReject(request.id, "approved")
                              }
                              className="text-green-600 hover:text-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleApproveReject(request.id, "rejected")
                              }
                              className="text-red-600 hover:text-red-700"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Apply Leave Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription>Submit a new leave request</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type *</Label>
              <Select
                value={leaveForm.type}
                onValueChange={(
                  value: "sick" | "vacation" | "personal" | "other"
                ) => setLeaveForm({ ...leaveForm, type: value })}
              >
                <SelectTrigger id="leaveType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) =>
                    setLeaveForm({ ...leaveForm, endDate: e.target.value })
                  }
                />
              </div>
            </div>
            {leaveForm.startDate && leaveForm.endDate && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Total Days:{" "}
                  {calculateDays(leaveForm.startDate, leaveForm.endDate)}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                value={leaveForm.reason}
                onChange={(e) =>
                  setLeaveForm({ ...leaveForm, reason: e.target.value })
                }
                placeholder="Please provide a reason for your leave..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitLeave}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
