import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {courses, currentStudent}  from "@/lib/mock-data";


type RegisterData = {
  courseId: string;
  time: string;
};

type RegisterDialogProps = {
  onRegister: (data: RegisterData) => void;
  enrollments: RegisterData[];
};

export function RegisterDialog({onRegister, enrollments}:RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());
  const fullname = `${currentStudent.firstName} ${currentStudent.lastName}`;
  const program = currentStudent.program;

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    onRegister({
      courseId,
      time,
    });
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
    setTime(getCurrentTime());
  }

  function getCurrentTime() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>
          <UserPlus className="h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ</DialogDescription>
          </DialogHeader>

          <div className="grid min-w-0 gap-4">
            <div className="grid min-w-0 gap-2">
              <Label htmlFor="courseSelect">วิชา</Label>
              <Select value={courseId} onValueChange={(value) => {
                if (value !== null) {
                  setCourseId(value);
                }
              }}>
                <SelectTrigger id="courseSelect" className="w-full min-w-0">
                  <SelectValue  placeholder="เลือกวิชา">
                    {courseId
                      ? `${courseId} - ${
                        courses.find((c) => c.courseId === courseId)?.courseTitle
                        }`
                    : "เลือกวิชา"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courses.filter((c) => !enrollments.some((e) => e.courseId === c.courseId)).map((c) => (
                      <SelectItem key={c.courseId} value={c.courseId}>
                        {c.courseId} - {c.courseTitle}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">เวลา</Label>
              <Input type="time" id="time" className="bg-amber" value={time} onChange={(t) => setTime(t.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">ชื่อ นศ.</Label>
              <Input id="fullName" value={fullname} readOnly/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">โปรแกรม</Label>
              <Input id="program" value={program} readOnly />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId}>ยืนยันการลงทะเบียน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
