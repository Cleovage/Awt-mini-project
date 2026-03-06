import { useState } from 'react';
import {
  Box, Typography, Chip, TextField, Button, Paper, Divider, Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useResume } from '../../context/ResumeContext';

function SkillChipInput({ label, skills, category }) {
  const { dispatch } = useResume();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) { setInput(''); return; }
    dispatch({ type: 'SET_SKILLS', payload: { [category]: [...skills, trimmed] } });
    setInput('');
  };

  const handleRemove = (skill) => {
    dispatch({ type: 'SET_SKILLS', payload: { [category]: skills.filter(s => s !== skill) } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); handleAdd(); }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="subtitle2" fontWeight={600} mb={1.5}>{label}</Typography>
      <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap', minHeight: 36 }}>
        {skills.map(s => (
          <Chip
            key={s}
            label={s}
            onDelete={() => handleRemove(s)}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
        {skills.length === 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
            Add your first skill below
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          size="small"
          fullWidth
        />
        <Button variant="contained" size="small" onClick={handleAdd} startIcon={<AddIcon />}>
          Add
        </Button>
      </Box>
    </Paper>
  );
}

export default function SkillsStep() {
  const { state } = useResume();
  const { skills } = state;

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>Skills</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Type a skill and press <strong>Enter</strong> or <strong>comma</strong> to add it. Add as many as you like.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SkillChipInput label="Technical Skills" skills={skills.technical} category="technical" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkillChipInput label="Soft Skills" skills={skills.soft} category="soft" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SkillChipInput label="Languages" skills={skills.languages} category="languages" />
        </Grid>
      </Grid>
    </Box>
  );
}
