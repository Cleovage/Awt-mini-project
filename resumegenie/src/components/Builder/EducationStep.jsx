import {
  Box, Typography, TextField, Button, Card, CardContent,
  IconButton, Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../context/ResumeContext';

export default function EducationStep() {
  const { state, dispatch } = useResume();
  const { education } = state;

  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, field, value } });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Education</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch({ type: 'ADD_EDUCATION' })}
        >
          Add Education
        </Button>
      </Box>

      {education.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography>No education added yet.</Typography>
        </Box>
      )}

      {education.map((edu, idx) => (
        <Card key={edu.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                Education #{idx + 1}
              </Typography>
              <IconButton
                color="error"
                size="small"
                onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id })}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Institution / University"
                  value={edu.institution}
                  onChange={(e) => update(edu.id, 'institution', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Degree (e.g. Bachelor of Science)"
                  value={edu.degree}
                  onChange={(e) => update(edu.id, 'degree', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Field of Study / Major"
                  value={edu.field}
                  onChange={(e) => update(edu.id, 'field', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Start Date"
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => update(edu.id, 'startDate', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="End Date"
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => update(edu.id, 'endDate', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) => update(edu.id, 'gpa', e.target.value)}
                  fullWidth
                  placeholder="e.g. 3.8 / 4.0"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
