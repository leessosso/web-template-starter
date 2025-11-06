import { useEffect, useState } from 'react';
import { Users, CheckCircle2, Book } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useStudentStore } from '../store/studentStore';
import { useAttendanceStore } from '../store/attendanceStore';
import { useHandbookStore } from '../store/handbookStore';
import { AttendanceStatus } from '../models/Attendance';
import { Card, CardContent } from '../components/ui/Card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { students, fetchStudents } = useStudentStore();
  const { attendances, fetchAttendances } = useAttendanceStore();
  const { handbookProgresses, fetchHandbookProgresses } = useHandbookStore();

  const [totalStudents, setTotalStudents] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [completedHandbooks, setCompletedHandbooks] = useState(0);

  // 오늘 날짜 계산 (한국 시간 기준)
  const getKoreanDateString = () => {
    const now = new Date();
    // 한국 시간으로 변환 (UTC+9)
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    return koreanTime.toISOString().split('T')[0];
  };

  const today = getKoreanDateString();

  // 데이터 로딩 및 계산
  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.churchId) return;

      try {
        // 학생 데이터 로딩
        await fetchStudents();

        // 오늘 출석 데이터 로딩
        await fetchAttendances(user.churchId, today);

        // 핸드북 진도 데이터 로딩
        await fetchHandbookProgresses(user.churchId);
      } catch (error) {
        console.error('대시보드 데이터 로딩 실패:', error);
      }
    };

    loadDashboardData();
  }, [user?.churchId, fetchStudents, fetchAttendances, fetchHandbookProgresses, today]);

  // 학생 수 계산
  useEffect(() => {
    setTotalStudents(students.length);
  }, [students]);

  // 오늘 출석 수 계산
  useEffect(() => {
    console.log('Dashboard - attendances data:', attendances);
    console.log('Dashboard - today date:', today);

    // 오늘 날짜의 출석 데이터만 필터링
    const todayAttendances = attendances.filter(attendance => {
      const attendanceDate = attendance.date.toISOString().split('T')[0];
      return attendanceDate === today;
    });

    console.log('Dashboard - today filtered attendances:', todayAttendances);

    const presentCount = todayAttendances.filter(attendance =>
      attendance.status === AttendanceStatus.PRESENT
    ).length;

    console.log('Dashboard - today attendance count:', presentCount);
    setTodayAttendance(presentCount);
  }, [attendances, today]);

  // 핸드북 완료 수 계산
  useEffect(() => {
    const completedCount = handbookProgresses.filter(progress =>
      progress.completedDate
    ).length;
    setCompletedHandbooks(completedCount);
  }, [handbookProgresses]);

  return (
    <div className="space-y-6">
      {/* 모바일 우선 환영 메시지 */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          안녕하세요, {user?.displayName}님! 👋
        </h1>
        <p className="text-muted-foreground">
          {user?.churchName} 대시보드에 오신 것을 환영합니다
        </p>
      </div>

      {/* 모바일 우선 통계 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="min-h-[120px]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{totalStudents}</div>
                <p className="text-sm text-muted-foreground">총 학생 수</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[120px]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{todayAttendance}</div>
                <p className="text-sm text-muted-foreground">오늘 출석</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="min-h-[120px]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-green-500">
                <AvatarFallback className="bg-green-500 text-white">
                  <Book className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-2xl sm:text-3xl font-bold">{completedHandbooks}</div>
                <p className="text-sm text-muted-foreground">핸드북 완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 액션 버튼들 (모바일 우선) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">빠른 액션</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:bg-muted transition-colors">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm">학생 관리</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted transition-colors">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm">출석 체크</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-muted transition-colors">
            <CardContent className="p-4 text-center">
              <Book className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm">핸드북</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 최근 활동 */}
      <div>
        <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm text-muted-foreground">
              아직 활동 내역이 없습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
