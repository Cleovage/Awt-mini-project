import { useState } from 'react';
import {
  Box, Stepper, Step, StepLabel, Button, Paper, Typography,
  Container, LinearProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import PersonalInfoStep from './PersonalInfoStep';
import ExperienceStep from './ExperienceStep';
import EducationStep from './EducationStep';
import SkillsStep from './SkillsStep';
import ProjectsStep from './ProjectsStep';
import CertificationsStep from './CertificationsStep';

const STEPS = [
  { label: 'Personal Info', component: <PersonalInfoStep /> },
  { label: 'Experience', component: <ExperienceStep /> },
  { label: 'Education', component: <EducationStep /> },
  { label: 'Skills', component: <SkillsStep /> },
  { label: 'Projects', component: <ProjectsStep /> },
  { label: 'Certifications', component: <CertificationsStep /> },
];

export default function BuilderStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const isLast = activeStep === STEPS.length - 1;
  const progress = ((activeStep + 1) / STEPS.length) * 100;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Progress bar */}
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Step {activeStep + 1} of {STEPS.length}
          </Typography>
          <Typography variant="caption" color="primary" fontWeight={600}>
            {Math.round(progress)}% complete
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {STEPS.map((s, i) => (
            <Step key={s.label} completed={i < activeStep}>
              <StepLabel
                sx={{
                  cursor: i < activeStep ? 'pointer' : 'default',
                  '& .MuiStepLabel-label': { fontSize: { xs: '0.65rem', sm: '0.8rem' } },
                }}
                onClick={() => i < activeStep && setActiveStep(i)}
              >
                {s.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step content */}
        <Box>{STEPS[activeStep].component}</Box>
      </Paper>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => setActiveStep(s => s - 1)}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        {isLast ? (
          <Button
            variant="contained"
            color="success"
            endIcon={<CheckCircleIcon />}
            onClick={() => navigate('/preview')}
          >
            Finish &amp; Preview
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => setActiveStep(s => s + 1)}
          >
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
}
