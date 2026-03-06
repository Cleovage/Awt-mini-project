import {
  Box, TextField, Typography, Avatar, Button, Grid, Tooltip,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useResume } from '../../context/ResumeContext';

export default function PersonalInfoStep() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;

  const handleChange = (field) => (e) => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: { [field]: e.target.value } });
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be smaller than 2 MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => dispatch({ type: 'SET_PERSONAL_INFO', payload: { photo: reader.result } });
    reader.readAsDataURL(file);
  };

  const fields = [
    { key: 'name', label: 'Full Name', required: true, xs: 12 },
    { key: 'email', label: 'Email Address', required: true, xs: 12, sm: 6 },
    { key: 'phone', label: 'Phone Number', xs: 12, sm: 6 },
    { key: 'location', label: 'Location (City, Country)', xs: 12, sm: 6 },
    { key: 'linkedin', label: 'LinkedIn URL', xs: 12, sm: 6 },
    { key: 'github', label: 'GitHub URL', xs: 12, sm: 6 },
    { key: 'website', label: 'Portfolio / Website', xs: 12, sm: 6 },
  ];

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={3}>Personal Information</Typography>

      {/* Photo upload */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar
          src={personalInfo.photo || undefined}
          sx={{ width: 90, height: 90, border: '3px solid', borderColor: 'primary.light' }}
        />
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Profile photo (optional, appears on resume)
          </Typography>
          <Tooltip title="Upload JPG or PNG, max 2 MB">
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              size="small"
            >
              {personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
              <input type="file" hidden accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} />
            </Button>
          </Tooltip>
          {personalInfo.photo && (
            <Button
              size="small"
              color="error"
              sx={{ ml: 1 }}
              onClick={() => dispatch({ type: 'SET_PERSONAL_INFO', payload: { photo: null } })}
            >
              Remove
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {fields.map(f => (
          <Grid item xs={f.xs} sm={f.sm} key={f.key}>
            <TextField
              label={f.label}
              value={personalInfo[f.key] || ''}
              onChange={handleChange(f.key)}
              required={f.required}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <TextField
            label="Professional Summary"
            value={personalInfo.summary || ''}
            onChange={handleChange('summary')}
            multiline
            rows={4}
            fullWidth
            placeholder="Write 2–4 sentences about your expertise, key skills, and career goals..."
          />
        </Grid>
      </Grid>
    </Box>
  );
}
