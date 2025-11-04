import { Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
        }}
      >
        <ConstructionIcon
          sx={{
            fontSize: 64,
            color: 'primary.main',
            mb: 2,
          }}
        />
        <Typography variant="h4" gutterBottom color="primary">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {description || '이 기능은 현재 개발 중입니다. 곧 제공될 예정입니다.'}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/"
          size="large"
          sx={{ minWidth: 200 }}
        >
          대시보드로 돌아가기
        </Button>
      </Paper>
    </Box>
  );
}
