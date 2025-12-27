import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Clock,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  LogIn,
  LogOut as LogOutIcon,
} from "lucide-react";
import { Attendance } from "../types";
import { User } from "../types";

interface AttendanceManagementProps {
  user: User;
}

export default function AttendanceManagement({
  user,
}: AttendanceManagementProps) {
  const [attendanceRecords] = useState<Attendance[]>([]);
  const [employees] = useState<any[]>([]); // TODO: Replace with proper Employee type
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterEmployee, setFilterEmployee] = useState("all");
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const todayAttendance = attendanceRecords.filter((a) => a.date === today);
  const presentCount = todayAttendance.filter(
    (a) => a.status === "present"
  ).length;
  const absentCount = employees.length - presentCount;

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesEmployee =
      filterEmployee === "all" || record.employeeId === filterEmployee;
    const recordDate = new Date(record.date).toDateString();
    const selectedDateStr = selectedDate.toDateString();
    return matchesEmployee && recordDate === selectedDateStr;
  });

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setCheckInTime(timeString);
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    setCheckOutTime(timeString);
    setCheckedIn(false);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      present: "bg-green-100 text-green-700",
      absent: "bg-red-100 text-red-700",
      leave: "bg-yellow-100 text-yellow-700",
      holiday: "bg-blue-100 text-blue-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "absent":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Attendance Management</h2>
        <p className="text-gray-600">
          Track employee attendance and working hours
        </p>
      </div>

      {/* Employee Check-in/out */}
      {user.role === "employee" && (
        <Card>
          <CardHeader>
            <CardTitle>My Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Today's Status</p>
                <div className="flex items-center gap-4">
                  {checkInTime && (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-4 h-4 text-green-600" />
                      <span>Check-in: {checkInTime}</span>
                    </div>
                  )}
                  {checkOutTime && (
                    <div className="flex items-center gap-2">
                      <LogOutIcon className="w-4 h-4 text-red-600" />
                      <span>Check-out: {checkOutTime}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!checkedIn && !checkInTime ? (
                  <Button onClick={handleCheckIn}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Check In
                  </Button>
                ) : checkedIn && !checkOutTime ? (
                  <Button variant="destructive" onClick={handleCheckOut}>
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Check Out
                  </Button>
                ) : (
                  <Badge className="bg-green-100 text-green-700">
                    Checked Out for Today
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {user.role && ["admin", "hr", "manager"].includes(user.role) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-3xl mt-2">{employees.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Present Today</p>
                  <p className="text-3xl mt-2">{presentCount}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Absent Today</p>
                  <p className="text-3xl mt-2">{absentCount}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-3xl mt-2">
                    {employees.length > 0
                      ? Math.round((presentCount / employees.length) * 100)
                      : 0}
                    %
                  </p>
                </div>
                <CalendarIcon className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date: Date | undefined) =>
                date && setSelectedDate(date)
              }
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Attendance Records</CardTitle>
              {user.role && ["admin", "hr", "manager"].includes(user.role) && (
                <Select
                  value={filterEmployee}
                  onValueChange={setFilterEmployee}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Employees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    {employees.map((emp: any) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Showing records for {selectedDate.toLocaleDateString()}
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => {
                    const employee = employees.find(
                      (e: any) => e.id === record.employeeId
                    );
                    return (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div>
                            <p>{employee?.name}</p>
                            <p className="text-sm text-gray-500">
                              {employee?.department}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{record.checkIn || "-"}</TableCell>
                        <TableCell>{record.checkOut || "-"}</TableCell>
                        <TableCell>
                          {record.hoursWorked ? `${record.hoursWorked}h` : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(record.status)}
                              {record.status}
                            </span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-500 py-8"
                    >
                      No attendance records for selected date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      {user.role === "employee" && (
        <Card>
          <CardHeader>
            <CardTitle>My Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl">20</p>
                <p className="text-sm text-gray-600 mt-1">Days Present</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl">2</p>
                <p className="text-sm text-gray-600 mt-1">Days Absent</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl">160h</p>
                <p className="text-sm text-gray-600 mt-1">Total Hours</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl">91%</p>
                <p className="text-sm text-gray-600 mt-1">Attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
