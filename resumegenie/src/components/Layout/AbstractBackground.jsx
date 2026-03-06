import { Box, useTheme } from '@mui/material';

const DOTS = [
  { top: '15%', left: '8%', size: 6, delay: '0s', dur: '4s' },
  { top: '70%', left: '5%', size: 4, delay: '1.2s', dur: '5s' },
  { top: '40%', left: '92%', size: 5, delay: '0.5s', dur: '3.5s' },
  { top: '80%', left: '85%', size: 7, delay: '2s', dur: '6s' },
  { top: '25%', left: '50%', size: 3, delay: '0.8s', dur: '4.5s' },
  { top: '60%', left: '70%', size: 5, delay: '1.5s', dur: '5.5s' },
  { top: '10%', left: '75%', size: 4, delay: '0.3s', dur: '3.8s' },
  { top: '90%', left: '40%', size: 6, delay: '1.8s', dur: '4.2s' },
];

export default function AbstractBackground() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent1 = isDark ? 'rgba(79,195,247,0.18)' : 'rgba(3,155,229,0.12)';
  const accent2 = isDark ? 'rgba(186,104,200,0.14)' : 'rgba(142,36,170,0.09)';
  const accent3 = isDark ? 'rgba(102,187,106,0.10)' : 'rgba(46,125,50,0.07)';
  const ringColor = isDark ? 'rgba(79,195,247,0.07)' : 'rgba(3,155,229,0.06)';
  const dotColor = isDark ? 'rgba(79,195,247,0.6)' : 'rgba(3,155,229,0.5)';

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: isDark
          ? 'linear-gradient(160deg, #090B10 0%, #0D1420 60%, #0B1018 100%)'
          : 'linear-gradient(160deg, #F4F7FC 0%, #EBF1FA 60%, #E2EAF4 100%)',
      }}
    >
      {/* Blob 1 — top-left cyan */}
      <Box sx={{
        position: 'absolute', top: '-12%', left: '-12%',
        width: '52vw', height: '52vw',
        background: `radial-gradient(circle, ${accent1} 0%, transparent 65%)`,
        borderRadius: '50%',
        animation: 'blob1 22s infinite ease-in-out alternate',
        '@keyframes blob1': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '40%': { transform: 'translate(40px,-60px) scale(1.12)' },
          '70%': { transform: 'translate(-25px,30px) scale(0.88)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
      }} />

      {/* Blob 2 — bottom-right purple */}
      <Box sx={{
        position: 'absolute', bottom: '-12%', right: '-12%',
        width: '62vw', height: '62vw',
        background: `radial-gradient(circle, ${accent2} 0%, transparent 65%)`,
        borderRadius: '50%',
        animation: 'blob2 28s infinite ease-in-out alternate',
        '@keyframes blob2': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '35%': { transform: 'translate(-50px,-40px) scale(1.18)' },
          '70%': { transform: 'translate(30px,55px) scale(0.82)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
      }} />

      {/* Blob 3 — center-right green accent */}
      <Box sx={{
        position: 'absolute', top: '30%', right: '15%',
        width: '30vw', height: '30vw',
        background: `radial-gradient(circle, ${accent3} 0%, transparent 60%)`,
        borderRadius: '50%',
        animation: 'blob3 18s infinite ease-in-out alternate',
        '@keyframes blob3': {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(20px,-40px) scale(1.08)' },
          '100%': { transform: 'translate(-15px,25px) scale(0.95)' },
        },
      }} />

      {/* Orbital rings — SVG circles */}
      <Box
        component="svg"
        viewBox="0 0 800 800"
        sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '900px', height: '900px',
          transform: 'translate(-50%, -50%)',
          opacity: isDark ? 1 : 0.7,
          animation: 'spin 60s linear infinite',
          '@keyframes spin': { '100%': { transform: 'translate(-50%,-50%) rotate(360deg)' } },
        }}
      >
        <circle cx="400" cy="400" r="200" fill="none" stroke={ringColor} strokeWidth="1" strokeDasharray="8 14" />
        <circle cx="400" cy="400" r="310" fill="none" stroke={ringColor} strokeWidth="0.8" strokeDasharray="5 18" />
        <circle cx="400" cy="400" r="380" fill="none" stroke={ringColor} strokeWidth="0.5" strokeDasharray="3 22" />
        {/* Glowing dot on ring 1 */}
        <circle cx="600" cy="400" r="5" fill={dotColor} />
        {/* Glowing dot on ring 2 */}
        <circle cx="400" cy="90" r="4" fill={dotColor} opacity="0.7" />
      </Box>

      {/* Floating glowing dots */}
      {DOTS.map((d, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: dotColor,
            boxShadow: `0 0 ${d.size * 3}px ${d.size}px ${dotColor}`,
            animation: `pulse${i} ${d.dur} ${d.delay} infinite ease-in-out alternate`,
            [`@keyframes pulse${i}`]: {
              '0%': { opacity: 0.2, transform: 'scale(1)' },
              '100%': { opacity: 0.9, transform: 'scale(1.6)' },
            },
          }}
        />
      ))}

      {/* Hex grid overlay */}
      <Box
        sx={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          opacity: isDark ? 0.35 : 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0-4.7L52.3 48V19.7L28 4.7 3.7 19.7V48L28 61.3z' fill='%239C92AC' fill-opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />
    </Box>
  );
}
