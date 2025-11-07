import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { Search, CheckCircle, Play, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Card, CardContent } from '../../components/ui/Card';
import { Alert, AlertDescription } from '../../components/ui/Alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { DataTable } from '../../components/data-visualization/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import { useAuthStore } from '../../store/authStore';
import { Club, CLUB_OPTIONS } from '../../constants';
import { canManageHandbook, isAdmin, isLeader } from '../../utils/permissions';
import { studentService } from '../../services/studentService';
import { userService } from '../../services/userService';
import type { User } from '../../models/User';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { SPARKS_HANDBOOKS } from '../../constants/sparksHandbooks';
import { SparksHandbook } from '../../models/SparksHandbookProgress';
import { useAttendanceStore } from '../../store/attendanceStore';
import { AttendanceStatus } from '../../models/Attendance';
import type { Student } from '../../models/Student';

export default function HandbookPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [students, setStudents] = useState<Student[]>([]);
  const {
    studentSummaries,
    studentProgresses,
    fetchStudentSummary,
    fetchStudentProgress,
    getNextSectionToComplete: fetchNextSectionToComplete,
    createJewelSectionProgress,
    isLoading: sparksLoading,
    error,
  } = useSparksHandbookStore();

  const {
    attendances,
    fetchAttendances,
    createAttendance,
    updateAttendance,
  } = useAttendanceStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club>(Club.SPARKS);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [studentsByTeacher, setStudentsByTeacher] = useState<Map<string, Student[]>>(new Map());
  const [teachers, setTeachers] = useState<User[]>([]);
  const isMobile = useMobile();
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedAttendances, setSelectedAttendances] = useState<Set<string>>(new Set());

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

  // 핸드북 페이지용 학생 목록 가져오기
  const fetchHandbookStudents = async () => {
    if (!user?.churchId) return;

    try {
      // 관리자나 교회 리더는 항상 모든 학생 조회, 클럽 리더 이상은 핸드북 관리 권한에 따라 결정
      const canViewAllStudents = isAdmin(user) || isLeader(user) || canManageHandbook(user);
      const teacherId = canViewAllStudents ? undefined : user.uid;

      const allStudents = await studentService.getStudentsByChurch(user.churchId, teacherId);

      setStudents(allStudents);
    } catch (error) {
      console.error('학생 목록 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchHandbookStudents();
  }, [user?.churchId, user?.uid]);

  // 출결 데이터 가져오기
  useEffect(() => {
    if (user?.churchId) {
      fetchAttendances(user.churchId, selectedDate);
    }
  }, [user?.churchId, selectedDate, fetchAttendances]);

  // 선택된 클럽 학생들의 진도 요약 가져오기
  useEffect(() => {
    if (students && user?.churchId && selectedClub === Club.SPARKS) {
      const clubStudents = students.filter(student => student.club === selectedClub);
      clubStudents.forEach(student => {
        fetchStudentSummary(student.id, user.churchId!);
        fetchStudentProgress(student.id, user.churchId!);
      });
    }
  }, [students, user?.churchId, selectedClub, fetchStudentSummary, fetchStudentProgress]);

  // 선생님별로 학생들 그룹화
  useEffect(() => {
    if (students && teachers.length > 0) {
      const clubStudents = students.filter(student => student.club === selectedClub);
      const teacherMap = new Map<string, Student[]>();

      // 각 선생님별로 학생들 그룹화
      teachers.forEach(teacher => {
        const teacherStudents = clubStudents.filter(student =>
          student.assignedTeacherId === teacher.uid
        );
        if (teacherStudents.length > 0) {
          teacherMap.set(teacher.uid, teacherStudents);
        }
      });

      // 미배정 학생들
      const unassignedStudents = clubStudents.filter(student =>
        !student.assignedTeacherId
      );
      if (unassignedStudents.length > 0) {
        teacherMap.set('unassigned', unassignedStudents);
      }

      setStudentsByTeacher(teacherMap);

      // 검색 필터링
      let allFilteredStudents: Student[] = [];
      teacherMap.forEach(students => {
        const filtered = students.filter(student =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        allFilteredStudents = [...allFilteredStudents, ...filtered];
      });

      setFilteredStudents(allFilteredStudents);
    }
  }, [students, teachers, searchTerm, selectedClub]);

  const getHandbookLabel = (handbook: SparksHandbook | null): string => {
    if (!handbook) return '미시작';
    const hb = SPARKS_HANDBOOKS.find((h) => h.id === handbook);
    return hb?.label || handbook;
  };

  const getProgressText = (summary: any): string => {
    // SPARKS 클럽이 아니면 아직 핸드북 시스템이 준비되지 않음
    if (selectedClub !== Club.SPARKS) {
      return '준비 중';
    }

    if (!summary) return '진도 없음';
    if (!summary.currentHandbook) return '-';

    const jewelType = summary.currentJewelType === 'red' ? '빨강' : '초록';

    // 마지막 완료된 섹션이 있으면 그 섹션을 현재 진도로 표시
    if (summary.lastCompletedSection) {
      const { major, minor } = summary.lastCompletedSection;
      return `${getHandbookLabel(summary.currentHandbook)} - ${jewelType}(${major}:${minor})`;
    }

    // 마지막 완료 섹션이 없으면 첫 번째 섹션부터 시작
    return `${getHandbookLabel(summary.currentHandbook)} - ${jewelType}(1:1)`;
  };


  const handleStudentClick = (studentId: string) => {
    navigate(`/handbook/${studentId}`);
  };

  const handleQuickCompleteClick = async (student: Student) => {
    if (!user?.churchId) return;

    try {
      const nextSection = await fetchNextSectionToComplete(student.id, user.churchId);

      if (!nextSection) {
        console.log('완료할 다음 섹션이 없습니다.');
        return;
      }

      // 바로 완료 처리
      await createJewelSectionProgress({
        studentId: student.id,
        handbook: nextSection.handbook as any,
        jewelType: nextSection.jewelType as any,
        section: nextSection.section,
        completedDate: new Date(),
      });

      // 진도 요약 및 상세 진도 새로고침
      await fetchStudentSummary(student.id, user.churchId);
      await fetchStudentProgress(student.id, user.churchId);
    } catch (error) {
      console.error('빠른 완료 실패:', error);
    }
  };


  // 출결 체크 관련 함수들
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
          await createAttendance({
            studentId: student.id,
            date: new Date(selectedDate),
            status: isPresent ? AttendanceStatus.PRESENT : AttendanceStatus.ABSENT,
            studentName: student.name,
            teacherId: '', // 핸드북 페이지에서는 선생님 정보 필요 없음
            teacherName: '',
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


  const getTodayCompletedCount = (studentId: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const studentProgress = studentProgresses.get(studentId);
    if (!studentProgress) return 0;

    return studentProgress.filter(progress => {
      const completedDate = new Date(progress.completedDate);
      return completedDate >= today && completedDate < tomorrow;
    }).length;
  };

  // 데스크톱 테이블용 데이터 준비
  const tableData = filteredStudents.map(student => {
    const summary = studentSummaries.get(student.id);
    const teacher = teachers.find(t => t.uid === student.assignedTeacherId);
    const teacherName = !student.assignedTeacherId ? '미배정' : teacher?.displayName || '알 수 없음';

    return {
      id: student.id,
      name: student.name,
      teacher: teacherName,
      quickComplete: student,
      todayCompleted: getTodayCompletedCount(student.id),
      currentProgress: getProgressText(summary),
      lastCompleted: summary?.lastCompletedDate?.toLocaleDateString('ko-KR') || '-',
    };
  });

  // 데스크톱 테이블 컬럼 정의
  const columns: ColumnDef<typeof tableData[0]>[] = [
    {
      accessorKey: 'teacher',
      header: '담당 선생님',
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.teacher}</div>
      ),
    },
    {
      accessorKey: 'name',
      header: '학생 이름',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    ...(selectedClub === Club.SPARKS ? [{
      accessorKey: 'quickComplete',
      header: '빠른 완료',
      cell: ({ row }: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleQuickCompleteClick(row.original.quickComplete);
          }}
          className="text-xs"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          완료
        </Button>
      ),
    }] : []),
    ...(selectedClub === Club.SPARKS ? [{
      accessorKey: 'todayCompleted',
      header: '오늘 완료',
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground">
          {row.original.todayCompleted}개
        </div>
      ),
    }] : []),
    {
      accessorKey: 'currentProgress',
      header: '현재 진도',
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.currentProgress}
        </div>
      ),
    },
    ...(selectedClub === Club.SPARKS ? [{
      accessorKey: 'lastCompleted',
      header: '마지막 완료',
      cell: ({ row }: any) => (
        <div className="text-sm text-muted-foreground">
          {row.original.lastCompleted}
        </div>
      ),
    }] : []),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          핸드북 진도
        </h1>
        <p className="text-muted-foreground">
          클럽별로 학생들의 핸드북 진도를 확인하고 관리할 수 있습니다.
        </p>
      </div>

      {/* 클럽 선택 */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">클럽 선택:</label>
        <Select
          value={selectedClub}
          onValueChange={(value) => setSelectedClub(value as Club)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="클럽을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {CLUB_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="학생 이름으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 모바일: 선생님별 카드 형태 */}
      <div className="block md:hidden">
        {selectedClub === Club.SPARKS && sparksLoading ? (
          <div className="text-center py-8">
            <p>로딩 중...</p>
          </div>
        ) : studentsByTeacher.size === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm ? '검색 결과가 없습니다.' : `등록된 ${CLUB_OPTIONS.find(c => c.value === selectedClub)?.label} 학생이 없습니다.`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {Array.from(studentsByTeacher.entries()).map(([teacherId, teacherStudents]) => {
              const teacher = teachers.find(t => t.uid === teacherId);
              const teacherName = teacherId === 'unassigned' ? '미배정' : teacher?.displayName || '알 수 없음';

              const filteredTeacherStudents = teacherStudents.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (filteredTeacherStudents.length === 0) return null;

              return (
                <div key={teacherId} className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary border-b pb-2">
                    {teacherName} 선생님 ({filteredTeacherStudents.length}명)
                  </h3>
                  <div className="flex flex-col gap-3">
                    {filteredTeacherStudents.map((student) => {
                      const summary = studentSummaries.get(student.id);
                      return (
                        <Card
                          key={student.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleStudentClick(student.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold">{student.name}</h4>
                              {selectedClub === Club.SPARKS && (
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickCompleteClick(student);
                                  }}
                                  className="text-xs px-3 py-1"
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  완료
                                </Button>
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-muted-foreground">
                                  {getProgressText(summary)}
                                </p>
                                <p className="text-sm font-medium text-primary">
                                  오늘: {getTodayCompletedCount(student.id)}개
                                </p>
                              </div>
                            </div>

                            {summary?.lastCompletedDate && (
                              <p className="text-xs text-muted-foreground mt-2">
                                마지막: {summary.lastCompletedDate.toLocaleDateString('ko-KR')}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 데스크톱: 테이블 */}
      <div className="hidden md:block">
        {selectedClub === Club.SPARKS && sparksLoading ? (
          <div className="text-center py-8">
            <p>로딩 중...</p>
          </div>
        ) : (
          <DataTable
            data={tableData}
            columns={columns}
            searchable={false}
            onRowClick={(row) => handleStudentClick(row.id)}
          />
        )}
      </div>

      {filteredStudents.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            총 {filteredStudents.length}명의 학생
          </p>
        </div>
      )}

      {/* 모바일 출결 체크 FAB */}
      {isMobile && (
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
          onClick={handleOpenAttendanceDialog}
          style={{ zIndex: 9999 }}
        >
          <Calendar className="h-6 w-6" />
        </Button>
      )}

      {/* 출결 체크 다이얼로그 */}
      <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader className="text-center pb-2">
            <DialogTitle className="text-xl font-bold">📅 출결 체크</DialogTitle>
            <DialogDescription className="text-base">
              {selectedDate} 출결 현황
            </DialogDescription>
          </DialogHeader>

          {/* 날짜 선택 */}
          <div className="mb-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
              style={{ colorScheme: 'light dark' }}
            />
          </div>

          {/* 학생 선택 리스트 - 선생님별 그룹화 */}
          <div className="max-h-60 overflow-y-auto space-y-4">
            {Array.from(studentsByTeacher.entries()).map(([teacherId, teacherStudents]) => {
              const teacher = teachers.find(t => t.uid === teacherId);
              const teacherName = teacherId === 'unassigned' ? '미배정' : teacher?.displayName || '알 수 없음';

              if (teacherStudents.length === 0) return null;

              return (
                <div key={teacherId} className="space-y-2">
                  <h4 className="text-sm font-semibold text-primary border-b pb-1">
                    {teacherName} 선생님 ({teacherStudents.length}명)
                  </h4>
                  <div className="space-y-1">
                    {teacherStudents.map((student) => (
                      <div
                        key={student.id}
                        onClick={() => handleStudentToggle(student.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer text-sm ${selectedAttendances.has(student.id)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border'
                          }`}
                      >
                        <span className="font-medium">
                          {student.name}
                        </span>
                        <CheckCircle
                          className={`h-4 w-4 ${selectedAttendances.has(student.id) ? 'text-white' : 'text-muted-foreground'
                            }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4 mb-6">
            출석한 학생을 선택해주세요
          </p>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => setAttendanceDialogOpen(false)}
              className="px-6 py-2"
            >
              취소
            </Button>
            <Button
              onClick={handleSaveAttendance}
              className="px-6 py-2 shadow-md hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              저장하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
