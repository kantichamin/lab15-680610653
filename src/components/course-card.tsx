import type { Course, Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onCancel?: (courseId: string) => void;
};

export function CourseCard({ course, student, enrolledAt, onCancel }: CourseCardProps) {
  
  const registeredAt = new Date().toLocaleString("th-TH", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour12: false,
});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        <CardAction>
          {enrolledAt && enrolledAt.trim() !== "" ? (
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-700 dark:bg-purple-500/20 dark:text-purple-400">
               ลงทะเบียนแล้ว
            </Badge>
          ) : (
            <Badge variant="secondary" className=" bg-purple-500/20 text-purple-700 dark:bg-amber-500/20 dark:text-amber-400">
               เปิดรับ
             </Badge>
          )}
      </CardAction>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        {enrolledAt ? (
    <>
      <div className="text-xs text-muted-foreground">
        <p>
          ชื่อ นศ.: {student.firstName} {student.lastName}
        </p>

        <p>โปรแกรม: {student.program}</p>

        <p>ลงทะเบียนเมื่อ: {registeredAt} {enrolledAt}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-red-400 hover:text-red-500"
        onClick={() => onCancel?.(course.courseId)}
      >
        <Trash2 />
      </Button>
    </>
  ) : null}
      </CardContent>
    </Card>
  );
}