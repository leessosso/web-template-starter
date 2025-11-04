import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { AttendanceStatus } from '../../models';
import { Club } from '../../constants';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ChurchStatisticsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { students, fetchStudents } = useStudentStore();
  const { attendanceRecords, fetchAttendanceRecords } = useAttendanceStore();
  const { fetchAllStudentSummaries, studentSummaries } = useSparksHandbookStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.churchId) {
      Promise.all([
        fetchStudents(),
        fetchAttendanceRecords(),
        fetchAllStudentSummaries(user.churchId),
      ]).finally(() => setLoading(false));
    }
  }, [user?.churchId, fetchStudents, fetchAttendanceRecords, fetchAllStudentSummaries]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  // 통계 계산
  const totalStudents = students?.length || 0;
  const activeStudents = students?.filter(s => s.isActive !== false).length || 0;

  // 클럽별 학생 수
  const clubStats = Object.values(Club).map(club => ({
    club,
    count: students?.filter(s => s.club === club && s.isActive !== false).length || 0,
  }));

  // 출석 통계 (최근 30일)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentAttendance = attendanceRecords.filter(a => a.date >= thirtyDaysAgo);
  const totalAttendanceRecords = recentAttendance.length;
  const presentCount = recentAttendance.filter(a => a.status === AttendanceStatus.PRESENT).length;
  const attendanceRate = totalAttendanceRecords > 0 ? Math.round((presentCount / totalAttendanceRecords) * 100) : 0;

  // SPARKS 진도 통계
  const sparksSummaries = Array.from(studentSummaries.values());
  const totalSparksSections = sparksSummaries.length * 16; // 각 학생당 16개 섹션 (4핸드북 × 2보석타입 × 2섹션)
  const completedSections = sparksSummaries.reduce((sum, student) => {
    return sum +
      student.hangGliderProgress.redCompleted +
      student.hangGliderProgress.greenCompleted +
      student.wingRunnerProgress.redCompleted +
      student.wingRunnerProgress.greenCompleted +
      student.skyStormerProgress.redCompleted +
      student.skyStormerProgress.greenCompleted;
  }, 0);
  const progressRate = totalSparksSections > 0 ? Math.round((completedSections / totalSparksSections) * 100) : 0;

  // 월별 출석 추이 (최근 6개월)
  const monthlyAttendance = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthAttendance = attendanceRecords.filter(a =>
      a.date.getMonth() + 1 === month && a.date.getFullYear() === year
    );
    const present = monthAttendance.filter(a => a.status === AttendanceStatus.PRESENT).length;

    monthlyAttendance.push({
      month: `${month}월`,
      attendance: present,
      total: monthAttendance.length,
      rate: monthAttendance.length > 0 ? Math.round((present / monthAttendance.length) * 100) : 0,
    });
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/reports')}>
          뒤로가기
        </Button>
        <Typography variant="h4">
          교회 통계 대시보드 📊
        </Typography>
      </Box>

      {/* 주요 통계 카드 */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }}
        gap={3}
        mb={4}
      >
        <StatCard
          title="총 학생 수"
          value={totalStudents}
          subtitle={`${activeStudents}명 활동중`}
          icon={<PeopleIcon fontSize="large" />}
          color="primary"
        />
        <StatCard
          title="최근 출석률"
          value={`${attendanceRate}%`}
          subtitle="지난 30일 기준"
          icon={<CheckCircleIcon fontSize="large" />}
          color="success"
        />
        <StatCard
          title="SPARKS 진도율"
          value={`${progressRate}%`}
          subtitle={`${completedSections}/${totalSparksSections} 섹션 완료`}
          icon={<TrendingUpIcon fontSize="large" />}
          color="warning"
        />
        <StatCard
          title="활동 클럽"
          value={clubStats.filter(c => c.count > 0).length}
          subtitle="개 운영중"
          icon={<SchoolIcon fontSize="large" />}
          color="info"
        />
      </Box>

      {/* 클럽별 현황 */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        클럽별 학생 현황
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>클럽</TableCell>
              <TableCell align="right">학생 수</TableCell>
              <TableCell align="right">비율</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clubStats.map((stat) => (
              <TableRow key={stat.club}>
                <TableCell>{stat.club}</TableCell>
                <TableCell align="right">{stat.count}</TableCell>
                <TableCell align="right">
                  {totalStudents > 0 ? `${Math.round((stat.count / totalStudents) * 100)}%` : '0%'}
                </TableCell>
                <TableCell>
                  {stat.count > 0 ? (
                    <Chip label="운영중" color="success" size="small" />
                  ) : (
                    <Chip label="미운영" color="default" size="small" variant="outlined" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 월별 출석 추이 */}
      <Typography variant="h6" gutterBottom>
        월별 출석 추이 (최근 6개월)
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>월</TableCell>
              <TableCell align="right">출석</TableCell>
              <TableCell align="right">총 기록</TableCell>
              <TableCell align="right">출석률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyAttendance.map((month) => (
              <TableRow key={month.month}>
                <TableCell>{month.month}</TableCell>
                <TableCell align="right">{month.attendance}</TableCell>
                <TableCell align="right">{month.total}</TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>{month.rate}%</Typography>
                    <Box
                      sx={{
                        width: 60,
                        height: 8,
                        bgcolor: 'grey.300',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${month.rate}%`,
                          height: '100%',
                          bgcolor: month.rate >= 80 ? 'success.main' :
                                   month.rate >= 60 ? 'warning.main' : 'error.main',
                        }}
                      />
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* SPARKS 진도 상세 */}
      <Typography variant="h6" gutterBottom>
        SPARKS 핸드북 진도 현황
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>학생 이름</TableCell>
              <TableCell align="right">완료 섹션</TableCell>
              <TableCell align="right">총 섹션</TableCell>
              <TableCell align="right">진도율</TableCell>
              <TableCell>최근 활동</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sparksSummaries.slice(0, 10).map((student) => {
              const totalCompleted = student.hangGliderProgress.redCompleted +
                student.hangGliderProgress.greenCompleted +
                student.wingRunnerProgress.redCompleted +
                student.wingRunnerProgress.greenCompleted +
                student.skyStormerProgress.redCompleted +
                student.skyStormerProgress.greenCompleted;

              return (
                <TableRow key={student.studentId}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell align="right">{totalCompleted}</TableCell>
                  <TableCell align="right">16</TableCell>
                  <TableCell align="right">
                    {Math.round((totalCompleted / 16) * 100)}%
                  </TableCell>
                  <TableCell>
                    {student.lastCompletedDate ? new Date(student.lastCompletedDate).toLocaleDateString('ko-KR') : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
            {sparksSummaries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    SPARKS 학생 데이터가 없습니다.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1}>
        <Typography variant="body2" color="text.secondary">
          📊 이 통계는 실시간으로 업데이트됩니다. 데이터는 매일 자정에 갱신됩니다.
        </Typography>
      </Box>
    </Box>
  );
}
