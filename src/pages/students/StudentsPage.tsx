import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import { isAdmin } from '../../utils/permissions';
import type { Student } from '../../models/Student';
import type { User } from '../../models/User';

export default function StudentsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuthStore();
  const {
    students,
    isLoading,
    error,
    fetchStudents,
    deleteStudent,
    clearError
  } = useStudentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
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
    }
  }, [user?.churchId, fetchStudents]);

  // 선생님 ID로 선생님 이름을 찾는 함수
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return '미배정';
    const teacher = teachers.find(t => t.uid === teacherId);
    return teacher?.displayName || '알 수 없음';
  };

  useEffect(() => {
    if (students) {
      const filtered = students.filter(student => {
        const teacherName = getTeacherName(student.assignedTeacherId);
        return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               teacherName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredStudents(filtered);
    }
  }, [students, searchTerm, teachers]);

  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm('정말로 이 학생을 삭제하시겠습니까?')) {
      await deleteStudent(studentId);
    }
  };

  const getGradeText = (grade: number) => {
    const grades = ['Puggles', 'Cubbies', 'Sparks', 'T&T'];
    return grades[grade - 1] || '알 수 없음';
  };

  const getGenderText = (gender: 'male' | 'female') => {
    return gender === 'male' ? '남자' : '여자';
  };

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
          {isAdmin(user) ? '학생 관리' : '학생 조회'}
        </Typography>
        {isAdmin(user) && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/students/new')}
            fullWidth={isMobile}
            sx={{ alignSelf: { xs: 'stretch', sm: 'auto' } }}
          >
            학생 추가
          </Button>
        )}
      </Box>

      {/* 모바일 우선 검색 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder={isAdmin(user) ? "학생 이름 또는 담당 선생님으로 검색" : "학생 이름으로 검색"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: { xs: '16px', sm: '14px' }, // iOS 줌 방지
            }
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* 모바일 우선 학생 목록 */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>로딩 중...</Typography>
        </Box>
      ) : filteredStudents.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 학생이 없습니다.'}
          </Typography>
        </Box>
      ) : isMobile ? (
        // 모바일: 카드 형태
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredStudents.map((student) => (
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
                          label={getGradeText(student.grade)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={getGenderText(student.gender)}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        담당: {getTeacherName(student.assignedTeacherId) || '미배정'}
                      </Typography>
                    </Box>
                  </Box>
                  {isAdmin(user) && (
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/students/${student.id}/edit`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteStudent(student.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
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
                <Box component="th">이름</Box>
                <Box component="th">학년</Box>
                <Box component="th">성별</Box>
                <Box component="th">담당 선생님</Box>
                <Box component="th">등록일</Box>
                {isAdmin(user) && <Box component="th" sx={{ textAlign: 'center' }}>작업</Box>}
              </Box>
            </Box>
            <Box component="tbody">
              {filteredStudents.map((student) => (
                <Box component="tr" key={student.id} sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                  cursor: 'pointer'
                }}>
                  <Box component="td">
                    <Typography variant="body1" fontWeight="medium">
                      {student.name}
                    </Typography>
                  </Box>
                  <Box component="td">
                    <Chip
                      label={getGradeText(student.grade)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Box component="td">{getGenderText(student.gender)}</Box>
                  <Box component="td">{getTeacherName(student.assignedTeacherId)}</Box>
                  <Box component="td">
                    {student.createdAt?.toLocaleDateString('ko-KR')}
                  </Box>
                  {isAdmin(user) && (
                    <Box component="td" sx={{ textAlign: 'center' }}>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/students/${student.id}/edit`)}
                        title="수정"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteStudent(student.id)}
                        color="error"
                        title="삭제"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {filteredStudents.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            총 {filteredStudents.length}명의 학생
          </Typography>
        </Box>
      )}

      {/* 모바일 FAB 버튼 */}
      {isAdmin(user) && isMobile && (
        <Fab
          color="primary"
          aria-label="학생 추가"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
          onClick={() => navigate('/students/new')}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
}
