import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useStudentStore } from '../../store/studentStore';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { useAuthStore } from '../../store/authStore';
import {
  SPARKS_HANDBOOKS,
  JEWEL_TYPE_LABELS,
  generateJewelSections,
  sectionToString,
} from '../../constants/sparksHandbooks';
import { SparksHandbook, JewelType } from '../../models/SparksHandbookProgress';
import type { JewelSection } from '../../models/SparksHandbookProgress';

export default function StudentHandbookDetailPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { user } = useAuthStore();

  const { students } = useStudentStore();
  const {
    studentSummaries,
    error,
    fetchStudentSummary,
    fetchStudentProgress,
    createJewelSectionProgress,
    clearError,
  } = useSparksHandbookStore();

  const [selectedHandbook, setSelectedHandbook] = useState<SparksHandbook | ''>('');
  const [selectedJewelType, setSelectedJewelType] = useState<JewelType | ''>('');
  const [completionStatus, setCompletionStatus] = useState<Map<string, boolean>>(new Map());
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<JewelSection | null>(null);

  // 학생 정보 찾기
  const student = students?.find(s => s.id === studentId);
  const summary = studentId ? studentSummaries.get(studentId) : undefined;

  useEffect(() => {
    if (studentId && user?.churchId) {
      fetchStudentSummary(studentId, user.churchId!);
      fetchStudentProgress(studentId, user.churchId!);
    }
  }, [studentId, user?.churchId, fetchStudentSummary, fetchStudentProgress]);

  // 핸드북 선택 시 완료 상태 로드
  useEffect(() => {
    const loadCompletionStatus = async () => {
      if (selectedHandbook && studentId && user?.churchId) {
        try {
          const status = await import('../../services/sparksHandbookService').then(
            ({ sparksHandbookService }) =>
              sparksHandbookService.getHandbookCompletionStatus(studentId, selectedHandbook, user.churchId!)
          );
          setCompletionStatus(status);
        } catch (error) {
          console.error('완료 상태 로드 실패:', error);
        }
      }
    };

    loadCompletionStatus();
  }, [selectedHandbook, studentId, user?.churchId]);

  const handleSectionClick = (section: JewelSection) => {
    if (!selectedHandbook || !selectedJewelType) {
      alert('먼저 핸드북과 보석 타입을 선택해주세요.');
      return;
    }

    setSelectedSection(section);
    setConfirmDialogOpen(true);
  };

  const handleConfirmCompletion = async () => {
    if (!studentId || !selectedHandbook || !selectedJewelType || !selectedSection) return;

    try {
      await createJewelSectionProgress({
        studentId,
        handbook: selectedHandbook,
        jewelType: selectedJewelType,
        section: selectedSection,
        completedDate: new Date(),
      });

      setConfirmDialogOpen(false);
      setSelectedSection(null);

      // 완료 상태 새로고침
      if (user?.churchId) {
        const status = await import('../../services/sparksHandbookService').then(
          ({ sparksHandbookService }) =>
            sparksHandbookService.getHandbookCompletionStatus(studentId, selectedHandbook, user.churchId!)
        );
        setCompletionStatus(status);
      }
    } catch (error) {
      console.error('진도 등록 실패:', error);
    }
  };

  const getSectionKey = (jewelType: JewelType, section: JewelSection) => {
    return `${jewelType}-${section.major}-${section.minor}`;
  };

  const isSectionCompleted = (jewelType: JewelType, section: JewelSection) => {
    return completionStatus.get(getSectionKey(jewelType, section)) || false;
  };

  if (!student) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">학생을 찾을 수 없습니다.</Typography>
        <Button onClick={() => navigate('/handbook')} sx={{ mt: 2 }}>
          핸드북 관리로 돌아가기
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 3 } }}>
      {/* 헤더 */}
      <Box 
        display="flex" 
        alignItems="center" 
        mb={3}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 2, sm: 0 }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/handbook')}
          sx={{ mr: { xs: 0, sm: 2 }, alignSelf: { xs: 'flex-start', sm: 'auto' } }}
          size="small"
        >
          뒤로
        </Button>
        <Box>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ fontSize: { xs: '1.25rem', sm: '2rem' } }}
          >
            {student.name} - SPARKS 핸드북
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {student.gender === 'male' ? '남' : '여'}학생
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      {/* 핸드북 선택 */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          핸드북 선택
        </Typography>
        <Box 
          display="flex" 
          gap={2} 
          mb={2}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: 200 } }}>
            <InputLabel>핸드북</InputLabel>
            <Select
              value={selectedHandbook}
              label="핸드북"
              onChange={(e) => setSelectedHandbook(e.target.value as SparksHandbook)}
              size="small"
            >
              {SPARKS_HANDBOOKS.map((handbook) => (
                <MenuItem key={handbook.id} value={handbook.id}>
                  {handbook.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: 150 } }}>
            <InputLabel>보석 타입</InputLabel>
            <Select
              value={selectedJewelType}
              label="보석 타입"
              onChange={(e) => setSelectedJewelType(e.target.value as JewelType)}
              size="small"
            >
              <MenuItem value={JewelType.RED}>빨강 보석</MenuItem>
              <MenuItem value={JewelType.GREEN}>초록 보석</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {selectedHandbook && (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              선택한 핸드북의 보석을 클릭하여 진도를 표시하세요.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* 보석 그리드 */}
      {selectedHandbook && selectedJewelType && (
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 2 }}
          >
            {SPARKS_HANDBOOKS.find(h => h.id === selectedHandbook)?.label} - {JEWEL_TYPE_LABELS[selectedJewelType]}
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: 'repeat(4, 1fr)', 
              sm: 'repeat(6, 1fr)', 
              md: 'repeat(8, 1fr)' 
            }, 
            gap: { xs: 0.5, sm: 1 } 
          }}>
            {generateJewelSections().map((section) => {
              const isCompleted = isSectionCompleted(selectedJewelType, section);
              return (
                <Box key={`${section.major}-${section.minor}`}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      border: isCompleted ? '2px solid #4caf50' : '1px solid #e0e0e0',
                      backgroundColor: isCompleted ? '#e8f5e8' : 'white',
                      '&:hover': {
                        boxShadow: 2,
                      },
                    }}
                    onClick={() => handleSectionClick(section)}
                  >
                    <CardContent sx={{ 
                      p: { xs: 0.5, sm: 1 }, 
                      textAlign: 'center',
                      '&:last-child': { pb: { xs: 0.5, sm: 1 } }
                    }}>
                      {isCompleted && (
                        <CheckCircleIcon sx={{ 
                          color: '#4caf50', 
                          fontSize: { xs: 12, sm: 16 }, 
                          mb: 0.5 
                        }} />
                      )}
                      <Typography 
                        variant="body2" 
                        fontWeight="medium"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        {sectionToString(section)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Paper>
      )}

      {/* 진도 요약 */}
      {summary && (
        <Paper sx={{ p: { xs: 2, sm: 3 }, mt: 3 }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            진도 요약
          </Typography>
          <Box 
            display="flex" 
            gap={2} 
            flexWrap="wrap"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <Chip
              label={`HangGlider: ${summary.hangGliderProgress.redCompleted}/16 + ${summary.hangGliderProgress.greenCompleted}/16`}
              color={summary.currentHandbook === SparksHandbook.HANG_GLIDER ? 'primary' : 'default'}
              variant="outlined"
              sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-start', sm: 'center' } }}
            />
            <Chip
              label={`WingRunner: ${summary.wingRunnerProgress.redCompleted}/16 + ${summary.wingRunnerProgress.greenCompleted}/16`}
              color={summary.currentHandbook === SparksHandbook.WING_RUNNER ? 'primary' : 'default'}
              variant="outlined"
              sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-start', sm: 'center' } }}
            />
            <Chip
              label={`SkyStormer: ${summary.skyStormerProgress.redCompleted}/16 + ${summary.skyStormerProgress.greenCompleted}/16`}
              color={summary.currentHandbook === SparksHandbook.SKY_STORMER ? 'primary' : 'default'}
              variant="outlined"
              sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-start', sm: 'center' } }}
            />
          </Box>
        </Paper>
      )}

      {/* 완료 확인 다이얼로그 */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            m: { xs: 2, sm: 'auto' },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          진도 완료 확인
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            {selectedSection && sectionToString(selectedSection)} 섹션을 완료로 표시하시겠습니까?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            이 작업은 되돌릴 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
          <Button 
            onClick={() => setConfirmDialogOpen(false)}
            size="small"
          >
            취소
          </Button>
          <Button 
            onClick={handleConfirmCompletion} 
            variant="contained"
            size="small"
          >
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
