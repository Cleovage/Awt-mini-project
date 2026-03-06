import {
  Box, Typography, TextField, Button, Card, CardContent,
  IconButton, Checkbox, FormControlLabel, Divider, Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useResume } from '../../context/ResumeContext';

function BulletList({ bullets, onChange }) {
  const handleBullet = (idx, val) => {
    const updated = [...bullets];
    updated[idx] = val;
    onChange(updated);
  };
  const addBullet = () => onChange([...bullets, '']);
  const removeBullet = (idx) => onChange(bullets.filter((_, i) => i !== idx));

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
        Key Responsibilities / Achievements
      </Typography>
      {bullets.map((b, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <DragHandleIcon fontSize="small" color="disabled" />
          <TextField
            value={b}
            onChange={(e) => handleBullet(idx, e.target.value)}
            fullWidth
            size="small"
            placeholder={`Bullet point ${idx + 1}...`}
          />
          <IconButton size="small" color="error" onClick={() => removeBullet(idx)} disabled={bullets.length <= 1}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
      <Button size="small" startIcon={<AddIcon />} onClick={addBullet} sx={{ mt: 0.5 }}>
        Add Bullet
      </Button>
    </Box>
  );
}

export default function ExperienceStep() {
  const { state, dispatch } = useResume();
  const { experience } = state;

  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, field, value } });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Work Experience</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })}
        >
          Add Experience
        </Button>
      </Box>

      {experience.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography>No experience added yet. Click "Add Experience" to get started.</Typography>
        </Box>
      )}

      {experience.map((exp, idx) => (
        <Card key={exp.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                Experience #{idx + 1}
              </Typography>
              <IconButton
                color="error"
                size="small"
                onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id })}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Title / Role"
                  value={exp.role}
                  onChange={(e) => update(exp.id, 'role', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Company / Organization"
                  value={exp.company}
                  onChange={(e) => update(exp.id, 'company', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Start Date"
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => update(exp.id, 'startDate', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="End Date"
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => update(exp.id, 'endDate', e.target.value)}
                  fullWidth
                  disabled={exp.current}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exp.current}
                      onChange={(e) => update(exp.id, 'current', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Currently working here"
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <BulletList
              bullets={exp.bullets}
              onChange={(v) => update(exp.id, 'bullets', v)}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
