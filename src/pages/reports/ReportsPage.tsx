import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ReportCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  status: 'available' | 'coming-soon';
}

export default function ReportsPage() {
  const navigate = useNavigate();

  const reportCards: ReportCard[] = [
    {
      title: '학생 성취기록카드',
      description: '개별 학생의 핸드북 진도와 출석 현황을 확인할 수 있는 상세 보고서입니다.',
      icon: <PersonIcon />,
      path: '/reports/student-progress',
      color: 'primary',
      status: 'available',
    },
    {
      title: '교회 통계 대시보드',
      description: '교회 전체 학생 수, 출석율, 진도율 등의 종합 통계를 제공합니다.',
      icon: <BarChartIcon />,
      path: '/reports/church-statistics',
      color: 'success',
      status: 'available',
    },
    {
      title: '클럽별 보고서',
      description: 'SPARKS, CUBBIES 등 클럽별 학생 현황과 진도 통계를 확인합니다.',
      icon: <SchoolIcon />,
      path: '/reports/club-reports',
      color: 'info',
      status: 'coming-soon',
    },
    {
      title: '출석 분석 보고서',
      description: '월별/주별 출석 현황과 패턴을 분석한 상세 보고서입니다.',
      icon: <AssessmentIcon />,
      path: '/reports/attendance-analysis',
      color: 'warning',
      status: 'coming-soon',
    },
    {
      title: '진도율 분석 보고서',
      description: '학생들의 핸드북 진도율을 분석하고 개선 방향을 제시합니다.',
      icon: <GroupIcon />,
      path: '/reports/progress-analysis',
      color: 'secondary',
      status: 'coming-soon',
    },
  ];

  const handleReportClick = (report: ReportCard) => {
    if (report.status === 'available') {
      navigate(report.path);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        보고서 📊
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        다양한 통계와 분석 보고서를 통해 학생들의 성장과 진도를 효과적으로 관리하세요.
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
        gap={3}
      >
        {reportCards.map((report, index) => (
          <Box key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: report.status === 'available' ? 'pointer' : 'default',
                transition: 'transform 0.2s',
                '&:hover': report.status === 'available' ? {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                } : {},
                opacity: report.status === 'coming-soon' ? 0.7 : 1,
              }}
              onClick={() => handleReportClick(report)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: `${report.color}.main`,
                      mr: 2,
                    }}
                  >
                    {report.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="div">
                      {report.title}
                    </Typography>
                    {report.status === 'coming-soon' && (
                      <Chip
                        label="준비중"
                        size="small"
                        color="default"
                        variant="outlined"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {report.description}
                </Typography>
              </CardContent>
              {report.status === 'available' && (
                <CardActions>
                  <Button size="small" color={report.color}>
                    보기
                  </Button>
                </CardActions>
              )}
            </Card>
          </Box>
        ))}
      </Box>

      <Box mt={4} p={3} bgcolor="background.paper" borderRadius={2}>
        <Typography variant="h6" gutterBottom>
          💡 보고서 활용 Tip
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • 학생 성취기록카드는 학부모 상담 시 유용하게 활용할 수 있습니다.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • 정기적인 보고서를 통해 학생들의 성장 추이를 파악하고 개선 방향을 설정하세요.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • 데이터 기반 의사결정으로 더 효과적인 교육 프로그램을 운영할 수 있습니다.
        </Typography>
      </Box>
    </Box>
  );
}
