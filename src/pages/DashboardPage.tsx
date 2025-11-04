import { Typography, Box, Card, CardContent, Avatar, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookIcon from '@mui/icons-material/Book';
import { useAuthStore } from '../store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <Box>
      {/* 모바일 우선 환영 메시지 */}
      <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          안녕하세요, {user?.displayName}님! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user?.churchName} 대시보드에 오신 것을 환영합니다
        </Typography>
      </Box>

      {/* 모바일 우선 통계 카드들 */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 2,
        mb: 4
      }}>
        <Card sx={{ minHeight: 120 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <PeopleIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  총 학생 수
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minHeight: 120 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  오늘 출석
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ minHeight: 120 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                <BookIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  핸드북 완료
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 빠른 액션 버튼들 (모바일 우선) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          빠른 액션
        </Typography>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
          gap: 2
        }}>
          <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <PeopleIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="body2">학생 관리</Typography>
            </CardContent>
          </Card>
          <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <CheckCircleIcon color="secondary" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="body2">출석 체크</Typography>
            </CardContent>
          </Card>
          <Card sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <BookIcon color="success" sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="body2">핸드북</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* 최근 활동 */}
      <Box>
        <Typography variant="h6" gutterBottom>
          최근 활동
        </Typography>
        <Paper sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="body2" color="text.secondary">
            아직 활동 내역이 없습니다.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
