import { Box, Typography, Container, Alert, useTheme } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import BuilderStepper from '../components/Builder/BuilderStepper';
import ResumeUploader from '../components/Parser/ResumeUploader';

export default function BuilderPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0D2137 0%, #0D3349 100%)'
            : 'linear-gradient(135deg, #1565C0 0%, #00ACC1 100%)',
          color: '#fff',
          py: { xs: 4, md: 5 },
          px: 2,
          textAlign: 'center',
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(79,195,247,0.12)' : 'rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0, left: 0,
            width: '100%', height: '1px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(79,195,247,0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          },
        }}
      >
        <BuildIcon sx={{ fontSize: 44, mb: 1, opacity: 0.9 }} />
        <Typography variant="h4" fontWeight={800}>Resume Builder</Typography>
        <Typography sx={{ opacity: 0.8, mt: 0.5, maxWidth: 480, mx: 'auto' }}>
          Fill out each section — your data auto-saves as you type
        </Typography>
      </Box>

      {/* Upload existing resume */}
      <Container maxWidth="md" sx={{ mt: 3 }}>
        <Alert severity="info" sx={{ mb: 0 }}>
          <strong>Already have a resume?</strong> Upload it below and AI will auto-fill the form for you.
        </Alert>
        <ResumeUploader />
      </Container>

      <BuilderStepper />
    </Box>
  );
}
