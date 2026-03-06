import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Card, CardContent,
  IconButton, Grid, Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../context/ResumeContext';

export default function ProjectsStep() {
  const { state, dispatch } = useResume();
  const { projects } = state;
  const [techInputs, setTechInputs] = useState({});

  const update = (id, field, value) =>
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, field, value } });

  const addTech = (id, tech) => {
    const trimmed = tech.trim();
    if (!trimmed) return;
    const proj = projects.find(p => p.id === id);
    if (proj && !proj.techStack.includes(trimmed)) {
      update(id, 'techStack', [...proj.techStack, trimmed]);
    }
    setTechInputs(prev => ({ ...prev, [id]: '' }));
  };

  const removeTech = (id, tech) => {
    const proj = projects.find(p => p.id === id);
    if (proj) update(id, 'techStack', proj.techStack.filter(t => t !== tech));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch({ type: 'ADD_PROJECT' })}
        >
          Add Project
        </Button>
      </Box>

      {projects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          <Typography>No projects added yet.</Typography>
        </Box>
      )}

      {projects.map((p, idx) => (
        <Card key={p.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                Project #{idx + 1}
              </Typography>
              <IconButton
                color="error"
                size="small"
                onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: p.id })}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  value={p.name}
                  onChange={(e) => update(p.id, 'name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project URL / GitHub Link"
                  value={p.url}
                  onChange={(e) => update(p.id, 'url', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={p.description}
                  onChange={(e) => update(p.id, 'description', e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Describe what the project does, your role, and impact..."
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
                  Tech Stack
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {p.techStack.map(t => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      color="secondary"
                      onDelete={() => removeTech(p.id, t)}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    value={techInputs[p.id] || ''}
                    onChange={(e) => setTechInputs(prev => ({ ...prev, [p.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault();
                        addTech(p.id, techInputs[p.id] || '');
                      }
                    }}
                    placeholder="React, Node.js, Python..."
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => addTech(p.id, techInputs[p.id] || '')}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
