import { useEffect, useState } from 'react';
import { Calendar, User as UserIcon, CheckCircle2, Circle, Save } from 'lucide-react';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { AttendanceStatus } from '../../models/Attendance';
import type { User } from '../../models/User';
import { Button } from '../../components/ui';
import { Input } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { Badge } from '../../components/ui';
import { Alert, AlertDescription } from '../../components/ui';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui';
import { Checkbox } from '../../components/ui';
import { Avatar, AvatarFallback } from '../../components/ui';
import { DataTable } from '../../components/data-visualization/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

type StudentWithAttendance = {
  id: string;
  name: string;
  grade: number;
  assignedTeacherId?: string;
  tempAssignedTeacherId?: string;
  tempAssignedUntil?: Date;
  attendance?: AttendanceStatus;
  teacherName: string;
};

export default function AttendancePage() {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuthStore();
  const {
    attendances,
    isLoading,
    error,
    fetchAttendances,
    createAttendance,
    updateAttendance,
    clearError
  } = useAttendanceStore();
  const { students, fetchStudents } = useStudentStore();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedAttendances, setSelectedAttendances] = useState<Set<string>>(new Set());
  const [teachers, setTeachers] = useState<User[]>([]);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 선생님 목록 가져오기
  useEffect(() => {
    const fetchTeachers = async () => {
      if (user?.churchId) {
        try {
          const teacherList = await userService.getTeachersByChurch(user.churchId);
          setTeachers(teacherList);
        } catch (error) {
          console.error('선생님 목록 가져오기 실패:', error);
        }
      }
    };
    fetchTeachers();
  }, [user?.churchId]);

  useEffect(() => {
    if (user?.churchId) {
      fetchStudents();
      fetchAttendances(user.churchId, selectedDate);
    }
  }, [user?.churchId, selectedDate, fetchStudents, fetchAttendances]);

  const handleOpenAttendanceDialog = () => {
    // 해당 날짜의 기존 출결 데이터를 로드
    const existingAttendances = attendances?.filter(a =>
      a.date.toISOString().split('T')[0] === selectedDate
    ) || [];

    const presentStudentIds = new Set(
      existingAttendances
        .filter(a => a.status === AttendanceStatus.PRESENT)
        .map(a => a.studentId)
    );

    setSelectedAttendances(presentStudentIds);
    setAttendanceDialogOpen(true);
  };

  const handleSaveAttendance = async () => {
    if (!user?.churchId) return;

    try {
      // 기존 출결 데이터 삭제 후 새로 생성
      const existingAttendances = attendances?.filter(a =>
        a.date.toISOString().split('T')[0] === selectedDate
      ) || [];

      // 각 학생에 대해 출결 기록 생성/업데이트
      for (const student of students || []) {
        const isPresent = selectedAttendances.has(student.id);
        const existingAttendance = existingAttendances.find(a => a.studentId === student.id);

        if (existingAttendance) {
          // 기존 기록 업데이트
          await updateAttendance(existingAttendance.id, {
            ...existingAttendance,
            status: isPresent ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
          });
        } else {
          // 새 기록 생성
          const teacherId = getCurrentTeacherId(student);
          const teacherName = getTeacherName(teacherId);
          await createAttendance({
            studentId: student.id,
            date: new Date(selectedDate),
            status: isPresent ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
            studentName: student.name,
            teacherId: teacherId || '',
            teacherName: teacherName,
          });
        }
      }

      await fetchAttendances(user.churchId, selectedDate);
      setAttendanceDialogOpen(false);
    } catch (error) {
      console.error('출결 저장 실패:', error);
    }
  };

  const handleStudentToggle = (studentId: string) => {
    const newSelected = new Set(selectedAttendances);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedAttendances(newSelected);
  };

  // 선생님 ID로 선생님 이름을 찾는 함수
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return '미배정';
    const teacher = teachers.find(t => t.uid === teacherId);
    return teacher?.displayName || '알 수 없음';
  };

  // 학생의 현재 담당 선생님 ID를 가져오는 함수
  const getCurrentTeacherId = (student: { tempAssignedTeacherId?: string; tempAssignedUntil?: Date | string; assignedTeacherId?: string }) => {
    // 임시 담당 선생님이 있고, 임시 담당 종료일이 아직 지나지 않은 경우
    if (student.tempAssignedTeacherId && student.tempAssignedUntil) {
      const now = new Date();
      const tempUntil = student.tempAssignedUntil instanceof Date ? student.tempAssignedUntil : new Date(student.tempAssignedUntil);
      if (tempUntil >= now) {
        return student.tempAssignedTeacherId;
      }
    }
    // 기본 담당 선생님
    return student.assignedTeacherId;
  };

  const getAttendanceStats = () => {
    if (!attendances) return { present: 0, absent: 0, total: 0 };

    const dayAttendances = attendances.filter(a =>
      a.date.toISOString().split('T')[0] === selectedDate
    );

    const present = dayAttendances.filter(a => a.status === AttendanceStatus.PRESENT).length;
    const absent = dayAttendances.filter(a => a.status === AttendanceStatus.ABSENT).length;
    const total = students?.length || 0;

    return { present, absent, total };
  };

  const stats = getAttendanceStats();

  // 테이블 데이터 준비
  const tableData: StudentWithAttendance[] = (students || []).map(student => {
    const attendance = attendances?.find(a =>
      a.studentId === student.id &&
      a.date.toISOString().split('T')[0] === selectedDate
    );
    return {
      id: student.id,
      name: student.name,
      grade: student.grade,
      assignedTeacherId: student.assignedTeacherId,
      tempAssignedTeacherId: student.tempAssignedTeacherId,
      tempAssignedUntil: student.tempAssignedUntil,
      attendance: attendance?.status,
      teacherName: getTeacherName(getCurrentTeacherId(student)),
    };
  });

  const columns: ColumnDef<StudentWithAttendance>[] = [
    {
      accessorKey: 'name',
      header: '학생 이름',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'grade',
      header: '학년',
      cell: ({ row }) => (
        <Badge variant="outline">
          {['Puggles', 'Cubbies', 'Sparks', 'T&T'][row.original.grade - 1]}
        </Badge>
      ),
    },
    {
      accessorKey: 'teacherName',
      header: '담당 선생님',
    },
    {
      accessorKey: 'attendance',
      header: '출결 상태',
      cell: ({ row }) => {
        const attendance = row.original.attendance;
        if (!attendance) {
          return <Badge variant="outline">미등록</Badge>;
        }
        return (
          <Badge
            variant={attendance === AttendanceStatus.PRESENT ? 'default' : 'destructive'}
          >
            {attendance === AttendanceStatus.PRESENT ? '출석' : '결석'}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 모바일 우선 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">출결 관리</h1>
        <Button
          onClick={handleOpenAttendanceDialog}
          className="w-full sm:w-auto"
        >
          <Calendar className="mr-2 h-4 w-4" />
          출결 체크
        </Button>
      </div>

      {/* 모바일 우선 날짜 선택 및 통계 */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-auto"
        />

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
            출석: {stats.present}
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
            결석: {stats.absent}
          </Badge>
          <Badge variant="outline">
            총원: {stats.total}
          </Badge>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="ml-4 text-sm underline"
            >
              닫기
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* 모바일 우선 학생 출결 목록 */}
      {isLoading ? (
        <div className="text-center py-8">
          <p>로딩 중...</p>
        </div>
      ) : students && students.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">등록된 학생이 없습니다.</p>
        </div>
      ) : isMobile ? (
        // 모바일: 카드 형태
        <div className="flex flex-col gap-4">
          {students?.map((student) => {
            const attendance = attendances?.find(a =>
              a.studentId === student.id &&
              a.date.toISOString().split('T')[0] === selectedDate
            );

            return (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-10 w-10 bg-primary">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <UserIcon className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{student.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            담당: {getTeacherName(getCurrentTeacherId(student))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {attendance ? (
                        <div className="flex items-center gap-2">
                          {attendance.status === AttendanceStatus.PRESENT ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-red-500" />
                          )}
                          <span className={`text-sm ${
                            attendance.status === AttendanceStatus.PRESENT
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}>
                            {attendance.status === AttendanceStatus.PRESENT ? '출석' : '결석'}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline">미등록</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        // 데스크톱: 테이블 형태
        <DataTable
          data={tableData}
          columns={columns}
          searchable={false}
        />
      )}

      {/* 모바일 출결 체크 FAB */}
      {isMobile && (
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          onClick={handleOpenAttendanceDialog}
        >
          <Calendar className="h-6 w-6" />
        </Button>
      )}

      {/* 출결 체크 다이얼로그 */}
      <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDate} 출결 체크</DialogTitle>
            <DialogDescription>
              출석한 학생을 선택해주세요.
            </DialogDescription>
          </DialogHeader>

          {isMobile ? (
            // 모바일: 카드 형태로 학생 선택
            <div className="flex flex-col gap-2">
              {students?.map((student) => (
                <Card
                  key={student.id}
                  className={`cursor-pointer transition-colors ${
                    selectedAttendances.has(student.id)
                      ? 'border-primary bg-primary/10'
                      : ''
                  }`}
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <UserIcon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]}
                          </div>
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedAttendances.has(student.id)}
                        onCheckedChange={() => handleStudentToggle(student.id)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // 데스크톱: 그리드 형태
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {students?.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer"
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <Checkbox
                    checked={selectedAttendances.has(student.id)}
                    onCheckedChange={() => handleStudentToggle(student.id)}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    {student.name} ({['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]})
                  </label>
                </div>
              ))}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setAttendanceDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              취소
            </Button>
            <Button
              onClick={handleSaveAttendance}
              className="w-full sm:w-auto"
            >
              <Save className="mr-2 h-4 w-4" />
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
