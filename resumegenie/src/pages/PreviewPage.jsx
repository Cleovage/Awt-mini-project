import { useRef, useState } from 'react';
import {
  Box, Typography, Button, Container, CircularProgress, Alert, Paper, Divider,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ClassicTemplate from '../components/Preview/ClassicTemplate';
import { exportToPDF } from '../utils/pdfExport';

export default function PreviewPage() {
  const { state } = useResume();
  const previewRef = useRef(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const navigate = useNavigate();

  const hasContent = state.personalInfo.name || state.experience.length > 0;

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    setExportError('');
    try {
      const filename = state.personalInfo.name
        ? `${state.personalInfo.name.replace(/\s+/g, '_')}_Resume`
        : 'Resume';
      await exportToPDF(previewRef.current, filename);
    } catch (err) {
      setExportError('PDF export failed. Please try again.');
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1565C0 0%, #00ACC1 100%)',
          color: '#fff',
          py: 4,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight={700}>Resume Preview</Typography>
        <Typography sx={{ opacity: 0.85, mt: 0.5 }}>
          Review your resume and export it as a PDF
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Action bar */}
        <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate('/builder')}
          >
            Edit Resume
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={exporting ? <CircularProgress size={16} color="inherit" /> : <DownloadIcon />}
            onClick={handleExport}
            disabled={exporting || !hasContent}
          >
            {exporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          {exportError && <Alert severity="error" sx={{ ml: 2 }}>{exportError}</Alert>}
        </Paper>

        {!hasContent && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Your resume is empty. <strong>Go to Builder</strong> to fill in your information first.
          </Alert>
        )}

        {/* Preview */}
        <Box sx={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Box ref={previewRef}>
            <ClassicTemplate data={state} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
