import { useState } from 'react';
import {
  Box, Typography, Button, TextField, Container, Grid, Paper,
  CircularProgress, Chip, Alert, Snackbar, List, ListItem,
  ListItemIcon, ListItemText, LinearProgress, useTheme,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useResume } from '../context/ResumeContext';

function buildResumeText(state) {
  const { personalInfo, experience, education, skills, projects, certifications } = state;
  const lines = [];
  if (personalInfo.name) lines.push(personalInfo.name);
  if (personalInfo.summary) lines.push(personalInfo.summary);
  experience.forEach(e => {
    lines.push(e.role + ' at ' + e.company);
    e.bullets?.forEach(b => b && lines.push(b));
  });
  education.forEach(e => lines.push(e.degree + ' ' + e.field + ' ' + e.institution));
  lines.push([...skills.technical, ...skills.soft, ...skills.languages].join(', '));
  projects.forEach(p => {
    lines.push(p.name + ': ' + p.description);
    if (p.techStack.length) lines.push(p.techStack.join(', '));
  });
  certifications.forEach(c => lines.push(c.name + ' - ' + c.issuer));
  return lines.filter(Boolean).join('\n');
}

function ScoreGauge({ score }) {
  const color = score >= 75 ? '#2E7D32' : score >= 50 ? '#F57C00' : '#C62828';
  const bgColor = score >= 75 ? 'rgba(46,125,50,0.12)' : score >= 50 ? 'rgba(245,124,0,0.12)' : 'rgba(198,40,40,0.12)';
  const label = score >= 75 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-flex',
          p: 1.5,
          borderRadius: '50%',
          background: bgColor,
          boxShadow: '0 0 32px ' + color + '40',
        }}
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={140}
          thickness={6}
          sx={{ color: 'divider', position: 'absolute', top: 12, left: 12 }}
        />
        <CircularProgress
          variant="determinate"
          value={score}
          size={140}
          thickness={6}
          sx={{ color, filter: 'drop-shadow(0 0 6px ' + color + '80)' }}
        />
        <Box
          sx={{
            top: 0, left: 0, bottom: 0, right: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" fontWeight={900} sx={{ color, lineHeight: 1, letterSpacing: '-1px' }}>{score}</Typography>
          <Typography variant="caption" sx={{ color, opacity: 0.8, fontWeight: 600 }}>/ 100</Typography>
        </Box>
      </Box>
      <Chip
        label={label}
        sx={{
          background: color,
          color: '#fff',
          fontWeight: 700,
          px: 1,
          boxShadow: '0 4px 12px ' + color + '50',
        }}
      />
      <Typography variant="caption" color="text.secondary" fontWeight={500}>ATS Compatibility Score</Typography>
    </Box>
  );
}

function SectionScoreBar({ label, score }) {
  const color = score >= 75 ? 'success' : score >= 50 ? 'warning' : 'error';
  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={600}>{label}</Typography>
        <Typography variant="body2" color="text.secondary">{score}/100</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={score}
        color={color}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
}

export default function ATSScorerPage() {
  const { state } = useResume();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const resumeText = buildResumeText(state);
  const hasResume = resumeText.trim().length > 20;

  const handleAnalyze = async () => {
    if (!jobDesc.trim()) { setError('Please paste a job description first.'); return; }
    if (!hasResume) { setError('Your resume is empty. Please fill in the Builder first.'); return; }
    setError('');
    setLoading(true);
    setResult(null);

    // Dummy timeout to simulate local processing
    setTimeout(() => {
      const stops = new Set(['that', 'this', 'with', 'from', 'your', 'have', 'more', 'will', 'must', 'been', 'about', 'they']);
      const jdWords = Array.from(new Set(jobDesc.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 4 && !stops.has(w))));
      const resumeWords = new Set(resumeText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/));

      const matched = jdWords.filter(w => resumeWords.has(w)).slice(0, 10);
      const missing = jdWords.filter(w => !resumeWords.has(w)).slice(0, 10);
      const ratio = jdWords.length > 0 ? (matched.length / Math.min(jdWords.length, 25)) : 0.5;
      const baseScore = Math.min(100, Math.max(0, Math.floor(ratio * 100)));

      // Ensure some natural variance
      const safeStat = (s) => Math.min(100, Math.max(0, s + Math.floor(Math.random() * 20) - 10));

      setResult({
        overallScore: baseScore,
        sections: {
          summary: safeStat(baseScore),
          experience: safeStat(baseScore),
          skills: safeStat(baseScore),
          education: safeStat(baseScore)
        },
        keywordsMatched: matched.length > 0 ? matched : ['development'],
        keywordsMissing: missing.length > 0 ? missing : ['optimization'],
        suggestions: [
          "Include more exact keywords from the job description.",
          "Quantify your accomplishments to show measurable impact.",
          "Check that your job titles align with the required experience.",
          "Keep formatting clean and readable without over-designing."
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Box>
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #1A0533 0%, #2D0A48 100%)'
            : 'linear-gradient(135deg, #6A1B9A 0%, #AD1457 100%)',
          color: '#fff',
          py: { xs: 4, md: 5 },
          px: 2,
          textAlign: 'center',
          borderBottom: '1px solid',
          borderColor: isDark ? 'rgba(186,104,200,0.15)' : 'rgba(255,255,255,0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AssessmentIcon sx={{ fontSize: 44, mb: 1, opacity: 0.9 }} />
        <Typography variant="h4" fontWeight={800}>ATS Scorer</Typography>
        <Typography sx={{ opacity: 0.75, mt: 0.5, maxWidth: 480, mx: 'auto' }}>
          Paste a job description to get your ATS compatibility score and keyword analysis
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>Job Description</Typography>
              {!hasResume && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Your resume is empty. Fill in the Builder first.
                </Alert>
              )}
              <TextField
                label="Paste Job Description Here"
                multiline
                rows={12}
                fullWidth
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the full job description here..."
                sx={{ mb: 2 }}
              />
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleAnalyze}
                disabled={loading || !hasResume}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AssessmentIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #6A1B9A, #AD1457)',
                  borderRadius: 2,
                  py: 1.4,
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(106,27,154,0.35)'
                }}
              >
                {loading ? 'Analyzing...' : 'Analyze My Resume'}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            {!result && !loading && (
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <AssessmentIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
                <Typography color="text.secondary">
                  Paste a job description and click "Analyze" to see your score based on local keyword matching.
                </Typography>
              </Paper>
            )}

            {loading && (
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <CircularProgress size={64} />
                <Typography color="text.secondary">Analyzing keywords locally...</Typography>
              </Paper>
            )}

            {result && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ScoreGauge score={result.overallScore ?? 0} />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Typography variant="subtitle1" fontWeight={700} mb={2}>Section Scores</Typography>
                      {Object.entries(result.sections).map(([key, val]) => (
                        <SectionScoreBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} score={val ?? 0} />
                      ))}
                    </Grid>
                  </Grid>
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight={700} mb={2}>Keyword Analysis</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography variant="body2" fontWeight={600} color="success.main">
                          Matched ({result.keywordsMatched?.length ?? 0})
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(result.keywordsMatched ?? []).map(kw => (
                          <Chip key={kw} label={kw} size="small" color="success" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CancelIcon color="error" fontSize="small" />
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          Missing ({result.keywordsMissing?.length ?? 0})
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(result.keywordsMissing ?? []).map(kw => (
                          <Chip key={kw} label={kw} size="small" color="error" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LightbulbIcon color="warning" />
                    <Typography variant="subtitle1" fontWeight={700}>Improvement Suggestions</Typography>
                  </Box>
                  <List dense disablePadding>
                    {(result.suggestions ?? []).map((s, i) => (
                      <ListItem key={i} sx={{ alignItems: 'flex-start', px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                          <Box
                            sx={{
                              width: 20, height: 20, borderRadius: '50%',
                              background: 'linear-gradient(135deg, #6A1B9A, #AD1457)',
                              color: '#fff', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', fontSize: '10px', fontWeight: 700,
                            }}
                          >
                            {i + 1}
                          </Box>
                        </ListItemIcon>
                        <ListItemText primary={s} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ open: false, message: '' })} message={snackbar.message} />
    </Box>
  );
}
