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

// Comprehensive stopwords to filter out non-meaningful words (including common 2-letter noise words)
const STOPWORDS = new Set([
  // 2-letter noise words (kept to allow short tech terms like 'go', 'c#', 'r')
  'at', 'in', 'of', 'by', 'on', 'to', 'as', 'be', 'do', 'if', 'it', 'is',
  'an', 'or', 'we', 'me', 'he', 'no', 'so', 'up', 'us', 'my', 'ok', 'vs',
  // 3+ letter stopwords
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was',
  'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may',
  'new', 'now', 'old', 'see', 'two', 'way', 'who', 'any', 'use', 'man', 'too',
  'that', 'this', 'with', 'from', 'your', 'have', 'more', 'will', 'must', 'been',
  'about', 'they', 'their', 'there', 'then', 'than', 'when', 'what', 'which',
  'such', 'also', 'each', 'would', 'could', 'should', 'other', 'into', 'over',
  'after', 'well', 'just', 'like', 'able', 'need', 'make', 'some', 'both', 'many',
  'most', 'using', 'used', 'role', 'team', 'good', 'very', 'help', 'look', 'join',
  'take', 'best', 'care', 'time', 'year', 'years', 'work', 'great', 'strong',
  'high', 'level', 'plus', 'nice', 'knowledge', 'ability', 'youll', 'were',
  'dont', 'youre', 'these', 'those', 'through', 'across', 'while',
  'within', 'without', 'between', 'during', 'before', 'above', 'below', 'under',
  'where', 'here', 'same', 'only', 'even', 'back', 'long', 'find', 'ever',
]);

// Normalize common tech abbreviations to canonical forms
const ALIASES = new Map([
  ['js', 'javascript'],
  ['ts', 'typescript'],
  ['py', 'python'],
  ['k8s', 'kubernetes'],
  ['reactjs', 'react'],
  ['react.js', 'react'],
  ['nodejs', 'node'],
  ['node.js', 'node'],
  ['vuejs', 'vue'],
  ['vue.js', 'vue'],
  ['nextjs', 'next'],
  ['next.js', 'next'],
  ['golang', 'go'],
  ['postgres', 'postgresql'],
  ['mongo', 'mongodb'],
  ['ci/cd', 'cicd'],
]);

function normalizeWord(w) {
  return ALIASES.get(w) ?? w;
}

function extractKeywords(text) {
  // Preserve #, +, . and / to correctly handle tokens like c#, c++, .net, ci/cd
  const cleaned = text.toLowerCase().replace(/[^a-z0-9#+./\s]/g, ' ');
  // Allow 2+ character tokens so short but meaningful tech terms (go, c#, r, aws) are not discarded
  const words = cleaned.split(/\s+/).filter(w => w.length > 1 && !STOPWORDS.has(w));
  return new Set(words.map(normalizeWord));
}

function buildSectionTexts(state) {
  const { personalInfo, experience, education, skills, projects, certifications } = state;

  const summaryText = [personalInfo.name, personalInfo.summary].filter(Boolean).join(' ');

  const experienceText = experience.map(e =>
    [e.role, e.company, ...(e.bullets || []).filter(Boolean)].join(' ')
  ).join(' ');

  const skillsText = [...skills.technical, ...skills.soft, ...skills.languages].join(' ');

  const educationText = education.map(e =>
    [e.institution, e.degree, e.field].filter(Boolean).join(' ')
  ).join(' ');

  const projectsText = projects.map(p =>
    [p.name, p.description, ...(p.techStack || [])].filter(Boolean).join(' ')
  ).join(' ');

  const certificationsText = certifications.map(c =>
    [c.name, c.issuer].filter(Boolean).join(' ')
  ).join(' ');

  return { summaryText, experienceText, skillsText, educationText, projectsText, certificationsText };
}

function buildResumeText(state) {
  const { summaryText, experienceText, skillsText, educationText, projectsText, certificationsText } = buildSectionTexts(state);
  return [summaryText, experienceText, skillsText, educationText, projectsText, certificationsText]
    .filter(Boolean).join('\n');
}

function scoreSection(sectionText, jdKeywords) {
  if (jdKeywords.size === 0) return 0;
  if (!sectionText.trim()) return 0;
  const sectionKws = extractKeywords(sectionText);
  let matched = 0;
  for (const kw of jdKeywords) {
    if (sectionKws.has(kw)) matched++;
  }
  return Math.min(100, Math.round((matched / jdKeywords.size) * 100));
}

function generateSuggestions(sectionScores, missing, overallScore) {
  const suggestions = [];

  if (missing.length > 0) {
    const topMissing = missing.slice(0, 6).join(', ');
    suggestions.push(`Incorporate these missing keywords into your resume: ${topMissing}.`);
  }

  if (sectionScores.skills < 60) {
    suggestions.push('Your Skills section is missing key terms from the job description. List the specific tools, frameworks, and technologies the employer mentions.');
  } else if (sectionScores.skills < 80) {
    suggestions.push('Expand your Skills section with more technologies and tools from the job posting to improve keyword coverage.');
  }

  if (sectionScores.experience < 60) {
    suggestions.push("Rewrite your experience bullet points to mirror the job description's language. ATS systems rank resumes higher when they use the employer's exact terminology.");
  } else if (sectionScores.experience < 80) {
    suggestions.push('Quantify your achievements with measurable metrics (e.g., "improved performance by 30%", "reduced costs by $50K") and include more role-specific keywords.');
  }

  if (sectionScores.summary < 50) {
    suggestions.push('Update your professional summary to highlight the key qualifications, skills, and technologies that appear in the job description.');
  }

  if (suggestions.length < 3) {
    if (overallScore >= 75) {
      suggestions.push('Your resume is well-matched. Ensure formatting is ATS-friendly: use a single-column layout, standard fonts, and avoid tables or graphics.');
    } else {
      suggestions.push('Use the exact industry terminology from the job description. Avoid synonyms or abbreviations that ATS parsers may not recognize.');
    }
  }

  if (suggestions.length < 4) {
    suggestions.push('Verify your job titles closely match the position title in the posting, as ATS systems weight title matches heavily.');
  }

  return suggestions;
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

  const handleAnalyze = () => {
    if (!jobDesc.trim()) { setError('Please paste a job description first.'); return; }
    if (!hasResume) { setError('Your resume is empty. Please fill in the Builder first.'); return; }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const jdKeywords = extractKeywords(jobDesc);
      const resumeKeywords = extractKeywords(resumeText);

      const matched = [...jdKeywords].filter(kw => resumeKeywords.has(kw)).slice(0, 15);
      const missing = [...jdKeywords].filter(kw => !resumeKeywords.has(kw)).slice(0, 15);

      const { summaryText, experienceText, skillsText, educationText } = buildSectionTexts(state);
      const sectionScores = {
        summary: scoreSection(summaryText, jdKeywords),
        experience: scoreSection(experienceText, jdKeywords),
        skills: scoreSection(skillsText, jdKeywords),
        education: scoreSection(educationText, jdKeywords),
      };

      // Weighted overall score: skills + experience carry the most weight
      const overallScore = Math.round(
        sectionScores.summary * 0.20 +
        sectionScores.experience * 0.35 +
        sectionScores.skills * 0.35 +
        sectionScores.education * 0.10
      );

      setResult({
        overallScore,
        sections: sectionScores,
        keywordsMatched: matched,
        keywordsMissing: missing,
        suggestions: generateSuggestions(sectionScores, missing, overallScore),
      });
      setLoading(false);
    }, 800);
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
