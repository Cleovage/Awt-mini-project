import { Box, Typography, Button, Grid, Card, CardContent, CardActions, Chip, Container, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BoltIcon from '@mui/icons-material/Bolt';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const features = [
  {
    icon: <BuildIcon sx={{ fontSize: 36 }} />,
    title: 'Resume Builder',
    desc: 'Fill in a guided multi-step form with real-time validation. Every section — experience, education, skills, projects — is cleanly structured and ready to export.',
    tags: ['Multi-step form', 'Profile photo', 'Auto-save'],
    cta: 'Start Building',
    path: '/builder',
    gradient: 'linear-gradient(135deg, #1565C0, #00ACC1)',
    glow: 'rgba(0,172,193,0.25)',
  },
  {
    icon: <AssessmentIcon sx={{ fontSize: 36 }} />,
    title: 'ATS Scorer',
    desc: 'Paste a job description and get an instant ATS compatibility score based on keyword matching — see exactly which keywords are present or missing.',
    tags: ['ATS Analysis', 'Score 0-100', 'Keyword match'],
    cta: 'Score My Resume',
    path: '/ats-scorer',
    gradient: 'linear-gradient(135deg, #6A1B9A, #AD1457)',
    glow: 'rgba(173,20,87,0.25)',
  },
  {
    icon: <UploadFileIcon sx={{ fontSize: 36 }} />,
    title: 'Resume Upload',
    desc: 'Upload your existing PDF resume to extract its text content. Use it as a reference while filling in your builder form.',
    tags: ['PDF upload', 'Text extraction', 'Reference import'],
    cta: 'Upload Resume',
    path: '/builder',
    gradient: 'linear-gradient(135deg, #1B5E20, #00695C)',
    glow: 'rgba(0,105,92,0.25)',
  },
  {
    icon: <PictureAsPdfIcon sx={{ fontSize: 36 }} />,
    title: 'Live Preview & Export',
    desc: 'See your resume update in real-time as you type. Export a crisp, print-ready PDF with one click using a professional template.',
    tags: ['Live preview', 'A4 template', 'PDF export'],
    cta: 'View Preview',
    path: '/preview',
    gradient: 'linear-gradient(135deg, #E65100, #BF360C)',
    glow: 'rgba(230,81,0,0.25)',
  },
];

const STATS = [
  { value: '4', label: 'Core Features', icon: <SpeedIcon sx={{ fontSize: 20 }} /> },
  { value: '100%', label: 'Free Forever', icon: <BoltIcon sx={{ fontSize: 20 }} /> },
  { value: 'ATS', label: 'Optimized Output', icon: <AssessmentIcon sx={{ fontSize: 20 }} /> },
  { value: '0', label: 'Data Sent to Server', icon: <SecurityIcon sx={{ fontSize: 20 }} /> },
];

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #071320 0%, #0D2137 50%, #091620 100%)'
            : 'linear-gradient(135deg, #0D47A1 0%, #1565C0 50%, #00838F 100%)',
          color: '#fff',
          py: { xs: 9, md: 14 },
          px: 2,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-40%', left: '-20%',
            width: '60%', height: '200%',
            background: 'radial-gradient(circle, rgba(79,195,247,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0, left: 0,
            width: '100%', height: '1px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(79,195,247,0.3), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          },
        }}
      >
        <Container maxWidth="md">
          <AutoAwesomeIcon sx={{ fontSize: 60, color: '#4FC3F7', mb: 1.5, filter: 'drop-shadow(0 0 16px rgba(79,195,247,0.6))' }} />
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: '2.6rem', md: '4rem' },
              letterSpacing: '-1px',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Resume<Box component="span" sx={{ color: '#4FC3F7' }}>Genie</Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 400, opacity: 0.88, mb: 1.5, fontSize: { xs: '1.1rem', md: '1.35rem' } }}
          >
            Smart Resume Builder &amp; ATS Scorer
          </Typography>
          <Typography sx={{ opacity: 0.65, mb: 5, maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Build a professional resume, check your ATS score, and export a crisp PDF — all for free, all in your browser.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/builder')}
              sx={{
                background: '#fff',
                color: '#1565C0',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                '&:hover': { background: '#E3F2FD', transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' },
                transition: 'all 0.2s',
              }}
            >
              Build My Resume
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/ats-scorer')}
              sx={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                backdropFilter: 'blur(8px)',
                '&:hover': { background: 'rgba(255,255,255,0.1)', borderColor: '#fff', transform: 'translateY(-2px)' },
                transition: 'all 0.2s',
              }}
            >
              Score My Resume
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats strip */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(90deg, rgba(13,33,55,0.9), rgba(9,22,32,0.9))'
            : 'linear-gradient(90deg, #1565C0, #00838F)',
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(79,195,247,0.15)' : 'rgba(255,255,255,0.2)',
          py: 2.5,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {STATS.map(s => (
              <Grid item xs={6} sm={3} key={s.label} sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, color: '#4FC3F7', mb: 0.3 }}>
                  {s.icon}
                  <Typography variant="h6" fontWeight={800} sx={{ color: '#fff', lineHeight: 1 }}>{s.value}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Feature cards */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Typography variant="h4" textAlign="center" fontWeight={800} mb={1}>
          Everything You Need
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={6} sx={{ maxWidth: 500, mx: 'auto' }}>
          Build, score, and export your resume — no account, no subscription needed
        </Typography>
        <Grid container spacing={3}>
          {features.map(f => (
            <Grid item xs={12} sm={6} key={f.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 16px 40px ${f.glow}`,
                    borderColor: 'transparent',
                  },
                }}
              >
                <Box
                  sx={{
                    background: f.gradient,
                    color: '#fff',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: '12px 12px 0 0',
                  }}
                >
                  <Box sx={{
                    p: 1.2,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    {f.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700}>{f.title}</Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
                  <Typography color="text.secondary" mb={2.5} lineHeight={1.65}>{f.desc}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
                    {f.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1.5 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2.5 }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(f.path)}
                    fullWidth
                    sx={{
                      background: f.gradient,
                      borderRadius: 2,
                      py: 1.2,
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: `0 4px 16px ${f.glow}`, opacity: 0.92 },
                    }}
                  >
                    {f.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: isDark
              ? 'linear-gradient(135deg, rgba(13,33,55,0.9) 0%, rgba(13,49,73,0.9) 100%)'
              : 'linear-gradient(135deg, #1565C0 0%, #00838F 100%)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(79,195,247,0.15)' : 'transparent',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%', right: '-10%',
              width: '40%', height: '200%',
              background: 'radial-gradient(circle, rgba(79,195,247,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Typography variant="h4" fontWeight={800} mb={1.5}>
            Ready to land your dream job?
          </Typography>
          <Typography sx={{ opacity: 0.75, mb: 4, maxWidth: 440, mx: 'auto' }}>
            Create a professional, ATS-optimized resume in minutes — completely free, no account needed.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/builder')}
            sx={{
              background: '#fff',
              color: '#1565C0',
              fontWeight: 700,
              px: 5,
              py: 1.6,
              borderRadius: 3,
              boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              '&:hover': { background: '#E3F2FD', transform: 'translateY(-2px)' },
              transition: 'all 0.2s',
            }}
          >
            Get Started Free
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

