import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data";
import { useState } from "react";


type RegisterData = {
  courseId: string;
  time: string;
};

export default function Enrollent() {
  const [enrollments, setEnrollments] = useState<RegisterData[]>([]);
  const fullName = `${currentStudent.firstName} ${currentStudent.lastName}`;

  const handleRegister = (data: RegisterData) => {
    setEnrollments((prev) => [
      ...prev,
      data,
    ]);
  };

  // ตอนกดถังขยะ
  const handleCancel = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter((e) => e.courseId !== courseId)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">{fullName} ({currentStudent.studentId})</p>
        </div>
        <RegisterDialog onRegister={handleRegister} enrollments={enrollments}/>
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find((e) => e.courseId === course.courseId)
          return (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={enrollment?.time}
            onCancel={handleCancel}
          />
          );
        })}
      </div>
    </div>
  );
}