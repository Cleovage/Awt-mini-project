import { useState, useRef } from 'react';
import {
  Box, Typography, Button, Paper, LinearProgress, Alert, Chip,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { extractTextFromPDF } from '../../utils/pdfParser';
import { useResume } from '../../context/ResumeContext';

export default function ResumeUploader() {
  const { dispatch } = useResume();
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [dragging, setDragging] = useState(false);

  const processFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      setStatus('error');
      return;
    }
    setFileName(file.name);
    setError('');
    setStatus('extracting');

    try {
      const text = await extractTextFromPDF(file);
      if (!text.trim()) throw new Error('Could not extract text from PDF.');
      
      setStatus('parsing');
      
      // Map the full extracted text into the summary field for reference
      const mockResult = {
        personalInfo: { summary: text.trim() },
        experience: [],
        education: [],
        skills: { technical: [], soft: [], languages: [] },
        projects: [],
        certifications: []
      };

      setTimeout(() => {
        dispatch({ type: 'LOAD_STATE', payload: mockResult });
        setStatus('done');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Parsing failed.');
      setStatus('error');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  const isLoading = status === 'extracting' || status === 'parsing';

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Paper
        variant="outlined"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        sx={{
          p: 3,
          border: '2px dashed ' + (dragging ? '#1565C0' : '#ccc'),
          background: dragging ? 'rgba(21, 101, 192, 0.05)' : 'transparent',
          borderRadius: 3,
          textAlign: 'center',
          transition: 'all 0.2s',
          cursor: isLoading ? 'default' : 'pointer',
        }}
        onClick={() => !isLoading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          hidden
          onChange={handleChange}
        />

        {status === 'idle' && (
          <>
            <UploadFileIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography fontWeight={600}>Drag & Drop your PDF resume here</Typography>
            <Typography variant="body2" color="text.secondary">or click to browse (PDF only, max 10 MB)</Typography>
            
            <Box mt={2}>
              <Button variant="outlined" size="small" startIcon={<UploadFileIcon />}>
                Browse File
              </Button>
            </Box>
          </>
        )}

        {status === 'extracting' && (
          <>
            <Typography fontWeight={600} mb={1}>Extracting text from PDF...</Typography>
            <LinearProgress sx={{ borderRadius: 2 }} />
          </>
        )}

        {status === 'parsing' && (
          <>
            <Typography fontWeight={600} mb={1}>Processing your resume...</Typography>
            <LinearProgress sx={{ borderRadius: 2 }} />
          </>
        )}

        {status === 'done' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />
            <Typography fontWeight={600} color="success.main">
              Resume extracted successfully!
            </Typography>
            <Chip label={fileName} size="small" icon={<UploadFileIcon />} />
            <Typography variant="caption" color="text.secondary">
              Extracted text has been placed in your summary.
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => { e.stopPropagation(); setStatus('idle'); setFileName(''); }}
            >
              Upload Different File
            </Button>
          </Box>
        )}

        {status === 'error' && (
          <Box onClick={(e) => e.stopPropagation()}>
            <Alert severity="error" sx={{ textAlign: 'left' }}>
              <strong>Error:</strong> {error}
            </Alert>
            <Button
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => { setStatus('idle'); setError(''); }}
            >
              Try Again
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
