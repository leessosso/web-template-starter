import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme,
  Fab,
} from '@mui/material';
import {
  EventAvailable as EventAvailableIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAttendanceStore } from '../../store/attendanceStore';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { AttendanceStatus } from '../../models/Attendance';
import type { User } from '../../models/User';

export default function AttendancePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
  const getCurrentTeacherId = (student: any) => {
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

  return (
    <Box>
      {/* 모바일 우선 헤더 */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          출결 관리
        </Typography>
        <Button
          variant="contained"
          startIcon={<EventAvailableIcon />}
          onClick={handleOpenAttendanceDialog}
          fullWidth={isMobile}
        >
          출결 체크
        </Button>
      </Box>

      {/* 모바일 우선 날짜 선택 및 통계 */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <TextField
          type="date"
          label="날짜 선택"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth={isMobile}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '16px', sm: '14px' }, // iOS 줌 방지
            }
          }}
        />

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          <Chip
            label={`출석: ${stats.present}`}
            color="success"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <Chip
            label={`결석: ${stats.absent}`}
            color="error"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
          <Chip
            label={`총원: ${stats.total}`}
            color="default"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* 모바일 우선 학생 출결 목록 */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>로딩 중...</Typography>
        </Box>
      ) : students && students.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            등록된 학생이 없습니다.
          </Typography>
        </Box>
      ) : isMobile ? (
        // 모바일: 카드 형태
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {students?.map((student) => {
            const attendance = attendances?.find(a =>
              a.studentId === student.id &&
              a.date.toISOString().split('T')[0] === selectedDate
            );

            return (
              <Card key={student.id} sx={{ '&:hover': { boxShadow: 2 } }}>
                <CardContent sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" flexGrow={1}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {student.name}
                        </Typography>
                        <Box display="flex" gap={1} mt={0.5}>
                          <Chip
                            label={['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                          <Typography variant="body2" color="text.secondary">
                            담당: {getTeacherName(getCurrentTeacherId(student))}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      {attendance ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          {attendance.status === AttendanceStatus.PRESENT ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <RadioButtonUncheckedIcon color="error" />
                          )}
                          <Typography variant="body2" color={
                            attendance.status === AttendanceStatus.PRESENT ? 'success.main' : 'error.main'
                          }>
                            {attendance.status === AttendanceStatus.PRESENT ? '출석' : '결석'}
                          </Typography>
                        </Box>
                      ) : (
                        <Chip label="미등록" color="default" size="small" variant="outlined" />
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        // 데스크톱: 테이블 형태
        <Box sx={{ overflowX: 'auto' }}>
          <Box component="table" sx={{
            width: '100%',
            borderCollapse: 'collapse',
            '& th, & td': {
              border: '1px solid',
              borderColor: 'divider',
              px: 2,
              py: 1.5,
            },
            '& th': {
              bgcolor: 'background.paper',
              fontWeight: 'bold',
            },
          }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th">학생 이름</Box>
                <Box component="th">학년</Box>
                <Box component="th">담당 선생님</Box>
                <Box component="th">출결 상태</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {students?.map((student) => {
                const attendance = attendances?.find(a =>
                  a.studentId === student.id &&
                  a.date.toISOString().split('T')[0] === selectedDate
                );

                return (
                  <Box component="tr" key={student.id} sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                  }}>
                    <Box component="td">
                      <Typography variant="body1" fontWeight="medium">
                        {student.name}
                      </Typography>
                    </Box>
                    <Box component="td">
                      {['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]}
                    </Box>
                    <Box component="td">{getTeacherName(getCurrentTeacherId(student))}</Box>
                    <Box component="td">
                      {attendance ? (
                        <Chip
                          label={attendance.status === AttendanceStatus.PRESENT ? '출석' : '결석'}
                          color={attendance.status === AttendanceStatus.PRESENT ? 'success' : 'error'}
                          size="small"
                        />
                      ) : (
                        <Chip label="미등록" color="default" size="small" variant="outlined" />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* 모바일 출결 체크 FAB */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="출결 체크"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={handleOpenAttendanceDialog}
        >
          <EventAvailableIcon />
        </Fab>
      )}

      {/* 출결 체크 다이얼로그 */}
      <Dialog
        open={attendanceDialogOpen}
        onClose={() => setAttendanceDialogOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          {selectedDate} 출결 체크
        </DialogTitle>
        <DialogContent sx={{ pb: { xs: 2, sm: 3 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            출석한 학생을 선택해주세요.
          </Typography>

          {isMobile ? (
            // 모바일: 카드 형태로 학생 선택
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {students?.map((student) => (
                <Card
                  key={student.id}
                  sx={{
                    cursor: 'pointer',
                    border: selectedAttendances.has(student.id) ? 2 : 1,
                    borderColor: selectedAttendances.has(student.id) ? 'primary.main' : 'divider',
                    bgcolor: selectedAttendances.has(student.id) ? 'primary.light' : 'background.paper',
                  }}
                  onClick={() => handleStudentToggle(student.id)}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          <PersonIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{student.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]}
                          </Typography>
                        </Box>
                      </Box>
                      <Checkbox
                        checked={selectedAttendances.has(student.id)}
                        onChange={() => handleStudentToggle(student.id)}
                        sx={{ mr: -1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            // 데스크톱: 그리드 형태
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={1}>
              {students?.map((student) => (
                <FormControlLabel
                  key={student.id}
                  control={
                    <Checkbox
                      checked={selectedAttendances.has(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                    />
                  }
                  label={`${student.name} (${['Puggles', 'Cubbies', 'Sparks', 'T&T'][student.grade - 1]})`}
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 }, gap: 1 }}>
          <Button
            onClick={() => setAttendanceDialogOpen(false)}
            fullWidth={isMobile}
          >
            취소
          </Button>
          <Button
            onClick={handleSaveAttendance}
            variant="contained"
            fullWidth={isMobile}
            startIcon={<SaveIcon />}
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
