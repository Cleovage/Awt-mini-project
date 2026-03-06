import { Box, Typography, Divider, Chip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m) - 1]} ${y}`;
};

const SectionTitle = ({ children }) => (
  <Box sx={{ mt: 2.5, mb: 1 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: '#1565C0',
        fontSize: '0.8rem',
        borderBottom: '2px solid #1565C0',
        pb: 0.3,
        display: 'inline-block',
        width: '100%',
      }}
    >
      {children}
    </Typography>
  </Box>
);

export default function ClassicTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    personalInfo.email && { icon: <EmailIcon sx={{ fontSize: 13 }} />, text: personalInfo.email },
    personalInfo.phone && { icon: <PhoneIcon sx={{ fontSize: 13 }} />, text: personalInfo.phone },
    personalInfo.location && { icon: <LocationOnIcon sx={{ fontSize: 13 }} />, text: personalInfo.location },
    personalInfo.linkedin && { icon: <LinkedInIcon sx={{ fontSize: 13 }} />, text: personalInfo.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\//i, 'linkedin.com/') },
    personalInfo.github && { icon: <GitHubIcon sx={{ fontSize: 13 }} />, text: personalInfo.github.replace(/https?:\/\/(www\.)?github\.com\//i, 'github.com/') },
    personalInfo.website && { icon: <LanguageIcon sx={{ fontSize: 13 }} />, text: personalInfo.website },
  ].filter(Boolean);

  return (
    <Box
      className="resume-preview-root"
      sx={{
        width: '210mm',
        minHeight: '297mm',
        background: '#fff',
        p: '20mm 18mm',
        boxSizing: 'border-box',
        fontFamily: "'Inter', 'Arial', sans-serif",
        fontSize: '11px',
        color: '#1a1a1a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
        {personalInfo.photo && (
          <Box
            component="img"
            src={personalInfo.photo}
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #1565C0',
              flexShrink: 0,
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 700, color: '#0D47A1', lineHeight: 1.2 }}>
            {personalInfo.name || 'Your Name'}
          </Typography>
          {contactItems.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 0.8 }}>
              {contactItems.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.4, color: '#444' }}>
                  {item.icon}
                  <Typography sx={{ fontSize: '10px' }}>{item.text}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <>
          <SectionTitle>Professional Summary</SectionTitle>
          <Typography sx={{ fontSize: '11px', lineHeight: 1.6, color: '#333' }}>
            {personalInfo.summary}
          </Typography>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Work Experience</SectionTitle>
          {experience.map((exp) => (
            <Box key={exp.id} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>{exp.role}</Typography>
                <Typography sx={{ fontSize: '10px', color: '#666' }}>
                  {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#1565C0', fontWeight: 600 }}>{exp.company}</Typography>
              {exp.bullets?.filter(b => b.trim()).length > 0 && (
                <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 0.5 }}>
                  {exp.bullets.filter(b => b.trim()).map((b, i) => (
                    <Box component="li" key={i} sx={{ fontSize: '11px', color: '#333', mb: 0.3, lineHeight: 1.5 }}>
                      {b}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <Box key={edu.id} sx={{ mb: 1.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                </Typography>
                <Typography sx={{ fontSize: '10px', color: '#666' }}>
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#1565C0', fontWeight: 600 }}>{edu.institution}</Typography>
              {edu.gpa && <Typography sx={{ fontSize: '10px', color: '#555' }}>GPA: {edu.gpa}</Typography>}
            </Box>
          ))}
        </>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {skills.technical.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#555', minWidth: 80 }}>Technical:</Typography>
                {skills.technical.map(s => (
                  <Box key={s} sx={{ background: '#E3F2FD', borderRadius: '4px', px: 0.8, py: 0.2, fontSize: '10px', color: '#1565C0' }}>
                    {s}
                  </Box>
                ))}
              </Box>
            )}
            {skills.soft.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#555', minWidth: 80 }}>Soft Skills:</Typography>
                {skills.soft.map(s => (
                  <Box key={s} sx={{ background: '#E8F5E9', borderRadius: '4px', px: 0.8, py: 0.2, fontSize: '10px', color: '#2E7D32' }}>
                    {s}
                  </Box>
                ))}
              </Box>
            )}
            {skills.languages.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#555', minWidth: 80 }}>Languages:</Typography>
                {skills.languages.map(s => (
                  <Box key={s} sx={{ background: '#FFF3E0', borderRadius: '4px', px: 0.8, py: 0.2, fontSize: '10px', color: '#E65100' }}>
                    {s}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((p) => (
            <Box key={p.id} sx={{ mb: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '12px' }}>{p.name}</Typography>
                {p.url && (
                  <Typography sx={{ fontSize: '10px', color: '#1565C0' }}>{p.url}</Typography>
                )}
              </Box>
              {p.techStack.length > 0 && (
                <Typography sx={{ fontSize: '10px', color: '#666', mb: 0.3 }}>
                  Tech: {p.techStack.join(', ')}
                </Typography>
              )}
              {p.description && (
                <Typography sx={{ fontSize: '11px', color: '#333', lineHeight: 1.5 }}>{p.description}</Typography>
              )}
            </Box>
          ))}
        </>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((cert) => (
            <Box key={cert.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '11px' }}>{cert.name}</Typography>
                {cert.issuer && (
                  <Typography sx={{ fontSize: '10px', color: '#666' }}>{cert.issuer}</Typography>
                )}
              </Box>
              {cert.date && (
                <Typography sx={{ fontSize: '10px', color: '#666' }}>{formatDate(cert.date)}</Typography>
              )}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}
