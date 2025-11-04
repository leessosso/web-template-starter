import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Print as PrintIcon } from '@mui/icons-material';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { useSparksHandbookStore } from '../../store/sparksHandbookStore';
import { useAttendanceStore } from '../../store/attendanceStore';
import { AttendanceStatus } from '../../models';
import { Club } from '../../constants';
import { SparksHandbook, JewelType } from '../../models/SparksHandbookProgress';
import { generateJewelSections, sectionToString } from '../../constants/sparksHandbooks';

// 인쇄용 스타일
const PrintContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '210mm', // A4 세로
  margin: '0 auto',
  backgroundColor: 'white',
  '@media print': {
    padding: theme.spacing(0.5),
    boxShadow: 'none',
    maxWidth: '100%',
    margin: 0,
    '& .no-print': {
      display: 'none',
    },
    '@page': {
      size: 'A4 portrait',
      margin: '10mm',
    },
  },
}));

const ReportHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '8px',
  paddingBottom: '4px',
  borderBottom: '2px solid #000',
});

const InfoTable = styled(Table)({
  marginBottom: '8px',
  '& .MuiTableCell-root': {
    padding: '2px 4px',
    fontSize: '9px',
    border: '1px solid #000',
  },
});

const ProgressTable = styled(Table)({
  '& .MuiTableCell-root': {
    padding: '2px',
    fontSize: '7px',
    border: '1px solid #000',
    textAlign: 'center',
    height: '16px',
    overflow: 'hidden',
    lineHeight: '1.2',
  },
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    fontSize: '7px',
    padding: '2px',
  },
});

export default function StudentProgressReportPage() {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { user } = useAuthStore();
  const { students, fetchStudents } = useStudentStore();
  const { studentProgresses, fetchStudentProgress } = useSparksHandbookStore();
  const { attendanceRecords, fetchAttendanceByStudent } = useAttendanceStore();

  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(studentId || '');

  const student = students?.find((s) => s.id === selectedStudentId);
  const progress = selectedStudentId ? studentProgresses.get(selectedStudentId) || [] : [];
  const studentAttendance = attendanceRecords.filter(a => a.studentId === selectedStudentId);

  useEffect(() => {
    if (user?.churchId) {
      fetchStudents();
    }
  }, [user?.churchId, fetchStudents]);

  useEffect(() => {
    if (selectedStudentId && user?.churchId) {
      fetchStudentProgress(selectedStudentId, user.churchId);
      fetchAttendanceByStudent(selectedStudentId, user.churchId);
    }
  }, [selectedStudentId, user?.churchId, fetchStudentProgress, fetchAttendanceByStudent]);

  useEffect(() => {
    if (students && attendanceRecords) {
      setLoading(false);
    }
  }, [students, attendanceRecords]);

  // 특정 섹션의 완료 날짜 가져오기
  const getSectionDate = (handbook: SparksHandbook, jewelType: JewelType, section: any): string => {
    const progressItem = progress.find(
      (p) =>
        p.handbook === handbook &&
        p.jewelType === jewelType &&
        p.section.major === section.major &&
        p.section.minor === section.minor
    );

    if (progressItem) {
      const date = progressItem.completedDate;
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
    return '';
  };

  // 월별 출석 통계 계산
  const getMonthlyAttendance = (month: number) => {
    const monthAttendance = studentAttendance.filter((a) => a.date.getMonth() + 1 === month);
    const presentCount = monthAttendance.filter((a) => a.status === AttendanceStatus.PRESENT).length;
    return presentCount > 0 ? presentCount.toString() : '';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStudentChange = (newStudentId: string) => {
    setSelectedStudentId(newStudentId);
    navigate(`/reports/student-progress/${newStudentId}`, { replace: true });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!student) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>학생을 선택해주세요.</Typography>
      </Box>
    );
  }

  const sections = generateJewelSections();
  const currentYear = new Date().getFullYear();
  const months = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // 3월~12월

  return (
    <Box>
      <Box className="no-print" display="flex" gap={2} mb={3} alignItems="center">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/reports')}>
          뒤로가기
        </Button>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>학생 선택</InputLabel>
          <Select
            value={selectedStudentId}
            label="학생 선택"
            onChange={(e) => handleStudentChange(e.target.value)}
          >
            {students?.filter(s => s.club === Club.SPARKS).map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button startIcon={<PrintIcon />} variant="contained" onClick={handlePrint}>
          인쇄
        </Button>
      </Box>

      <PrintContainer>
        {/* 헤더 */}
        <ReportHeader>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '14px' }}>
              🔥 SPARKS 성취기록카드
            </Typography>
          </Box>
          <Typography variant="subtitle2" sx={{ fontSize: '10px' }}>{currentYear}년</Typography>
        </ReportHeader>

        {/* 학생 정보 */}
        <InfoTable size="small">
          <TableBody>
            <TableRow>
              <TableCell width="10%" sx={{ fontWeight: 'bold' }}>이름</TableCell>
              <TableCell width="15%">{student.name}</TableCell>
              <TableCell width="10%" sx={{ fontWeight: 'bold' }}>성별</TableCell>
              <TableCell width="15%">{student.gender === 'male' ? '남' : '여'}</TableCell>
              <TableCell width="10%" sx={{ fontWeight: 'bold' }}>생년월일</TableCell>
              <TableCell width="15%">
                {student.birthDate ? new Date(student.birthDate).toLocaleDateString('ko-KR').slice(2) : '-'}
              </TableCell>
              <TableCell width="10%" sx={{ fontWeight: 'bold' }}>출석교회</TableCell>
              <TableCell width="15%">-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>가족관계</TableCell>
              <TableCell colSpan={2}>{student.parentName || '-'}</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>전화번호</TableCell>
              <TableCell colSpan={4}>{student.parentPhone || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>클럽등록일</TableCell>
              <TableCell colSpan={7}>
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString('ko-KR') : '-'}
              </TableCell>
            </TableRow>
          </TableBody>
        </InfoTable>

        {/* 전체 진도표 - 왼쪽(출결) + 오른쪽(핸드북 3개 가로) */}
        <TableContainer>
          <ProgressTable size="small">
            <TableHead>
              <TableRow>
                {/* 왼쪽: 출결 */}
                <TableCell rowSpan={3} sx={{ width: '25px' }}>월</TableCell>
                <TableCell rowSpan={3} sx={{ width: '25px' }}>주</TableCell>
                <TableCell rowSpan={3} sx={{ width: '30px' }}>일단<br/>과제</TableCell>
                <TableCell rowSpan={3} sx={{ width: '25px' }}>송금</TableCell>

                {/* 오른쪽: 핸드북 3개 */}
                <TableCell colSpan={12}>핸드북</TableCell>
                <TableCell rowSpan={3} sx={{ width: '30px' }}>핸드북<br/>복습</TableCell>
              </TableRow>
              <TableRow>
                {/* 행글라이더 */}
                <TableCell colSpan={4} sx={{ backgroundColor: '#ffe0e0' }}>행글라이더</TableCell>
                {/* 윙러너 */}
                <TableCell colSpan={4} sx={{ backgroundColor: '#e0f0ff' }}>윙러너</TableCell>
                {/* 스카이스토머 */}
                <TableCell colSpan={4} sx={{ backgroundColor: '#e0ffe0' }}>스카이스토머</TableCell>
              </TableRow>
              <TableRow>
                {/* 행글라이더 */}
                <TableCell sx={{ width: '30px', backgroundColor: '#fff5f5' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#fff5f5' }}>빨강</TableCell>
                <TableCell sx={{ width: '30px', backgroundColor: '#fff5f5' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#fff5f5' }}>초록</TableCell>
                {/* 윙러너 */}
                <TableCell sx={{ width: '30px', backgroundColor: '#f5f9ff' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#f5f9ff' }}>빨강</TableCell>
                <TableCell sx={{ width: '30px', backgroundColor: '#f5f9ff' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#f5f9ff' }}>초록</TableCell>
                {/* 스카이스토머 */}
                <TableCell sx={{ width: '30px', backgroundColor: '#f5fff5' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#f5fff5' }}>빨강</TableCell>
                <TableCell sx={{ width: '30px', backgroundColor: '#f5fff5' }}>보석</TableCell>
                <TableCell sx={{ width: '35px', backgroundColor: '#f5fff5' }}>초록</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 16개 섹션 행 */}
              {sections.map((section, idx) => {
                const monthIdx = Math.floor(idx / 2);
                const month = months[monthIdx] || 12;
                const weekNum = (idx % 4) + 1;

                return (
                  <TableRow key={idx}>
                    {/* 월 - 2개씩 병합 */}
                    {idx % 2 === 0 && (
                      <TableCell rowSpan={2} sx={{ fontWeight: 'bold' }}>
                        {month}
                      </TableCell>
                    )}

                    {/* 주차 */}
                    <TableCell>{weekNum}</TableCell>

                    {/* 일단과제 (출석) - 2개씩 병합 */}
                    {idx % 2 === 0 && (
                      <TableCell rowSpan={2}>
                        {getMonthlyAttendance(month)}
                      </TableCell>
                    )}

                    {/* 송금 */}
                    <TableCell></TableCell>

                    {/* 행글라이더 */}
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#fff5f5' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#fff5f5' }}>
                      {getSectionDate(SparksHandbook.HANG_GLIDER, JewelType.RED, section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#fff5f5' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#fff5f5' }}>
                      {getSectionDate(SparksHandbook.HANG_GLIDER, JewelType.GREEN, section)}
                    </TableCell>

                    {/* 윙러너 */}
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5f9ff' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5f9ff' }}>
                      {getSectionDate(SparksHandbook.WING_RUNNER, JewelType.RED, section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5f9ff' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5f9ff' }}>
                      {getSectionDate(SparksHandbook.WING_RUNNER, JewelType.GREEN, section)}
                    </TableCell>

                    {/* 스카이스토머 */}
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5fff5' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5fff5' }}>
                      {getSectionDate(SparksHandbook.SKY_STORMER, JewelType.RED, section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5fff5' }}>
                      {sectionToString(section)}
                    </TableCell>
                    <TableCell sx={{ fontSize: '7px', backgroundColor: '#f5fff5' }}>
                      {getSectionDate(SparksHandbook.SKY_STORMER, JewelType.GREEN, section)}
                    </TableCell>

                    {/* 핸드북 복습 */}
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </ProgressTable>
        </TableContainer>

        {/* 페이지 하단 정보 */}
        <Box mt={1} pt={0.5} borderTop="1px solid #ccc">
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '8px' }}>
            * 날짜 형식: 월/일 | 일단과제: 해당 월 출석 횟수
          </Typography>
        </Box>
      </PrintContainer>
    </Box>
  );
}
