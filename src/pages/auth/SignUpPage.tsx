import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthStore } from '../../store/authStore';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [churchName, setChurchName] = useState('');
  const [churchAddress, setChurchAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp, isLoading, error, clearError } = useAuthStore();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      useAuthStore.setState({ error: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    try {
      await signUp(email, password, displayName, churchName, churchAddress);
      navigate('/');
    } catch {
      // 에러는 store에서 처리됨
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            회원가입
          </Typography>

          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="이름"
              name="displayName"
              autoFocus
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="비밀번호 확인"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="churchName"
              label="교회 이름"
              name="churchName"
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              fullWidth
              id="churchAddress"
              label="교회 주소 (선택)"
              name="churchAddress"
              value={churchAddress}
              onChange={(e) => setChurchAddress(e.target.value)}
              disabled={isLoading}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }} onClose={clearError}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading || !email || !password || !displayName || !churchName}
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>

            <MuiLink
              component={Link}
              to="/login"
              variant="body2"
              sx={{ display: 'block', textAlign: 'center' }}
            >
              이미 계정이 있으신가요? 로그인
            </MuiLink>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
