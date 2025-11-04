import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
} from '@mui/icons-material';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { Club } from '../../constants';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { SPARKS_HANDBOOKS } from '../../constants/sparksHandbooks';
import { SparksHandbook } from '../../models/SparksHandbookProgress';
import type { Student } from '../../models/Student';

export default function HandbookPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { students, fetchStudents } = useStudentStore();
  const {
    studentSummaries,
    fetchStudentSummary,
    isLoading: sparksLoading,
    error,
    clearError,
  } = useSparksHandbookStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (user?.churchId) {
      fetchStudents();
    }
  }, [user?.churchId, fetchStudents]);

  // SPARKS 학생들의 진도 요약 가져오기
  useEffect(() => {
    if (students && user?.churchId) {
      const sparksStudents = students.filter(student => student.club === Club.SPARKS);
      sparksStudents.forEach(student => {
        fetchStudentSummary(student.id, user.churchId!);
      });
    }
  }, [students, user?.churchId, fetchStudentSummary]);

  useEffect(() => {
    if (students) {
      // SPARKS 클럽 학생만 필터링
      const sparksStudents = students.filter(student => student.club === Club.SPARKS);
      const filtered = sparksStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [students, searchTerm]);

  const getHandbookLabel = (handbook: SparksHandbook | null): string => {
    if (!handbook) return '미시작';
    const hb = SPARKS_HANDBOOKS.find((h) => h.id === handbook);
    return hb?.label || handbook;
  };

  const getProgressText = (summary: any): string => {
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

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 3 } }}>
      <Box mb={3}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: { xs: 2, sm: 0 }
          }}
        >
          SPARKS 핸드북 진도
        </Typography>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="학생 이름으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* 모바일: 카드 형태, 데스크톱: 테이블 */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {sparksLoading ? (
          <Box textAlign="center" py={4}>
            <Typography>로딩 중...</Typography>
          </Box>
        ) : filteredStudents.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography color="text.secondary">
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 SPARKS 학생이 없습니다.'}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredStudents.map((student) => {
              const summary = studentSummaries.get(student.id);
              return (
                <Paper
                  key={student.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 3 },
                  }}
                  onClick={() => handleStudentClick(student.id)}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="medium">
                      {student.name}
                    </Typography>
                    <Chip 
                      label={student.gender === 'male' ? '남' : '여'} 
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {getProgressText(summary)}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label={`HangGlider: ${summary?.hangGliderProgress.redCompleted || 0}/16 + ${summary?.hangGliderProgress.greenCompleted || 0}/16`}
                      size="small"
                      variant="outlined"
                      color={summary?.currentHandbook === SparksHandbook.HANG_GLIDER ? 'primary' : 'default'}
                      sx={{ justifyContent: 'flex-start' }}
                    />
                    <Chip
                      label={`WingRunner: ${summary?.wingRunnerProgress.redCompleted || 0}/16 + ${summary?.wingRunnerProgress.greenCompleted || 0}/16`}
                      size="small"
                      variant="outlined"
                      color={summary?.currentHandbook === SparksHandbook.WING_RUNNER ? 'primary' : 'default'}
                      sx={{ justifyContent: 'flex-start' }}
                    />
                    <Chip
                      label={`SkyStormer: ${summary?.skyStormerProgress.redCompleted || 0}/16 + ${summary?.skyStormerProgress.greenCompleted || 0}/16`}
                      size="small"
                      variant="outlined"
                      color={summary?.currentHandbook === SparksHandbook.SKY_STORMER ? 'primary' : 'default'}
                      sx={{ justifyContent: 'flex-start' }}
                    />
                  </Box>

                  {summary?.lastCompletedDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      마지막 완료: {summary.lastCompletedDate.toLocaleDateString('ko-KR')}
                    </Typography>
                  )}
                </Paper>
              );
            })}
          </Box>
        )}
      </Box>

      {/* 데스크톱: 테이블 */}
      <TableContainer 
        component={Paper}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>학생 이름</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>현재 진도</TableCell>
              <TableCell>HangGlider</TableCell>
              <TableCell>WingRunner</TableCell>
              <TableCell>SkyStormer</TableCell>
              <TableCell>마지막 완료</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sparksLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  로딩 중...
                </TableCell>
              </TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {searchTerm ? '검색 결과가 없습니다.' : '등록된 SPARKS 학생이 없습니다.'}
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => {
                const summary = studentSummaries.get(student.id);

                return (
                  <TableRow
                    key={student.id}
                    hover
                    onClick={() => handleStudentClick(student.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="body1" fontWeight="medium">
                        {student.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {student.gender === 'male' ? '남' : '여'}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {getProgressText(summary)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${summary?.hangGliderProgress.redCompleted || 0}/16 + ${summary?.hangGliderProgress.greenCompleted || 0}/16`}
                        size="small"
                        variant="outlined"
                        color={summary?.currentHandbook === SparksHandbook.HANG_GLIDER ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${summary?.wingRunnerProgress.redCompleted || 0}/16 + ${summary?.wingRunnerProgress.greenCompleted || 0}/16`}
                        size="small"
                        variant="outlined"
                        color={summary?.currentHandbook === SparksHandbook.WING_RUNNER ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${summary?.skyStormerProgress.redCompleted || 0}/16 + ${summary?.skyStormerProgress.greenCompleted || 0}/16`}
                        size="small"
                        variant="outlined"
                        color={summary?.currentHandbook === SparksHandbook.SKY_STORMER ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      {summary?.lastCompletedDate ? (
                        <Typography variant="body2" color="text.secondary">
                          {summary.lastCompletedDate.toLocaleDateString('ko-KR')}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredStudents.length > 0 && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            총 {filteredStudents.length}명의 학생
          </Typography>
        </Box>
      )}
    </Box>
  );
}
