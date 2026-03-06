import {
  Box, Typography, TextField, Button, Card, CardContent, IconButton, Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../context/ResumeContext';

export default function CertificationsStep() {
  const { state, dispatch } = useResume();
  const { certifications } = state;

  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, field, value } });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Certifications</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch({ type: 'ADD_CERTIFICATION' })}
        >
          Add Certification
        </Button>
      </Box>

      {certifications.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography>No certifications added yet.</Typography>
        </Box>
      )}

      {certifications.map((cert, idx) => (
        <Card key={cert.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                Certification #{idx + 1}
              </Typography>
              <IconButton
                color="error"
                size="small"
                onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: cert.id })}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Certification Name"
                  value={cert.name}
                  onChange={(e) => update(cert.id, 'name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) => update(cert.id, 'issuer', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Date"
                  type="month"
                  value={cert.date}
                  onChange={(e) => update(cert.id, 'date', e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
