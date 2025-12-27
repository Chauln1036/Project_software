import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
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
import { Star, TrendingUp, Award, Target } from "lucide-react";
import { PerformanceReview, User } from "../types";

interface PerformanceManagementProps {
  user: User;
}

export default function PerformanceManagement({
  user,
}: PerformanceManagementProps) {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [selectedReview, setSelectedReview] =
    useState<PerformanceReview | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const myReviews = reviews.filter((r) => r.employeeId === user.id);
  const averageRating =
    myReviews.length > 0
      ? myReviews.reduce((acc, r) => acc + r.overallRating, 0) /
        myReviews.length
      : 0;

  const openReviewDialog = (review: PerformanceReview) => {
    setSelectedReview(review);
    setDialogOpen(true);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-blue-600";
    if (rating >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Good";
    if (rating >= 2.5) return "Satisfactory";
    return "Needs Improvement";
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Performance & Appraisal</h2>
        <p className="text-gray-600">Track employee performance and KPIs</p>
      </div>

      {/* Employee Performance Summary */}
      {user.role === "employee" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p
                    className={`text-3xl mt-2 ${getRatingColor(averageRating)}`}
                  >
                    {averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {getRatingLabel(averageRating)}
                  </p>
                </div>
                <Award className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-3xl mt-2">{myReviews.length}</p>
                </div>
                <Star className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Performance Trend</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <p className="text-2xl">+12%</p>
                  </div>
                </div>
                <Target className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Manager/HR Stats */}
      {user.role && ["admin", "hr", "manager"].includes(user.role) && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-3xl mt-2">{reviews.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-3xl mt-2 text-blue-600">4.5</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Top Performers</p>
                <p className="text-3xl mt-2 text-green-600">3</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-3xl mt-2 text-yellow-600">5</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance Reviews List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {user.role === "employee"
                ? "My Performance Reviews"
                : "Performance Reviews"}
            </CardTitle>
            {user.role && ["admin", "hr", "manager"].includes(user.role) && (
              <Button>Add Review</Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Review Period</TableHead>
                <TableHead>Review Date</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(user.role === "employee" ? myReviews : reviews).map(
                (review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p>{review.employeeName}</p>
                        <p className="text-sm text-gray-500">Department</p>
                      </div>
                    </TableCell>
                    <TableCell>{review.reviewPeriod}</TableCell>
                    <TableCell>
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{review.reviewerName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {renderStars(review.overallRating)}
                        <span className={getRatingColor(review.overallRating)}>
                          {review.overallRating.toFixed(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          review.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewDialog(review)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* My KPIs - Employee View */}
      {user.role === "employee" && myReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Latest KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myReviews[0].kpis.map((kpi, index) => {
                const percentage = (kpi.achieved / kpi.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p>{kpi.name}</p>
                        <p className="text-sm text-gray-600">
                          Target: {kpi.target} | Achieved: {kpi.achieved}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStars(kpi.rating)}
                        <span className={getRatingColor(kpi.rating)}>
                          {kpi.rating}
                        </span>
                      </div>
                    </div>
                    <Progress value={percentage} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Performance Review Details</DialogTitle>
            <DialogDescription>
              Review for {selectedReview?.employeeName} -{" "}
              {selectedReview?.reviewPeriod}
            </DialogDescription>
          </DialogHeader>

          {selectedReview && (
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Overall Rating</p>
                    <div className="flex items-center gap-3 mt-2">
                      {renderStars(selectedReview.overallRating)}
                      <span
                        className={`text-2xl ${getRatingColor(
                          selectedReview.overallRating
                        )}`}
                      >
                        {selectedReview.overallRating.toFixed(1)}
                      </span>
                      <Badge className="ml-2">
                        {getRatingLabel(selectedReview.overallRating)}
                      </Badge>
                    </div>
                  </div>
                  <Award className="w-16 h-16 text-yellow-500" />
                </div>
              </div>

              {/* Review Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Review Period</p>
                  <p>{selectedReview.reviewPeriod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Review Date</p>
                  <p>
                    {new Date(selectedReview.reviewDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reviewer</p>
                  <p>{selectedReview.reviewerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant={
                      selectedReview.status === "completed"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedReview.status}
                  </Badge>
                </div>
              </div>

              {/* KPIs */}
              <div>
                <h3 className="mb-4">Key Performance Indicators</h3>
                <div className="space-y-4">
                  {selectedReview.kpis.map((kpi, index) => {
                    const percentage = (kpi.achieved / kpi.target) * 100;
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p>{kpi.name}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Target: {kpi.target} | Achieved: {kpi.achieved} (
                              {percentage.toFixed(0)}%)
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {renderStars(kpi.rating)}
                            <span className={getRatingColor(kpi.rating)}>
                              {kpi.rating}
                            </span>
                          </div>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h3 className="mb-2">Feedback & Comments</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedReview.feedback}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
