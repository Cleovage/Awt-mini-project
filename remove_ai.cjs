const fs = require('fs');

let navbar = fs.readFileSync('src/components/Layout/Navbar.jsx', 'utf-8');
navbar = navbar.replace(/\s*\{ label: 'Settings', path: '\/settings', icon: <SettingsIcon \/> \},/g, '');
navbar = navbar.replace(/import SettingsIcon from '@mui\/icons-material\/Settings';\n/g, '');
fs.writeFileSync('src/components/Layout/Navbar.jsx', navbar);

let uploader = fs.readFileSync('src/components/Parser/ResumeUploader.jsx', 'utf-8');
// remove AI imports
uploader = uploader.replace(/import { callAIJson } from '..\/..\/services\/aiService';\n/, '');
uploader = uploader.replace(/import AutoAwesomeIcon from '@mui\/icons-material\/AutoAwesome';\n/, '');

// redefine PARSE_PROMPT logic to just be local parsing or removal
uploader = uploader.replace(/const PARSE_PROMPT \=[\s\S]*?\]\\n\}\\n\}\\n\}\\n\\"\\;/g, '');

const mockProcess = \
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
      // Simple mock parser: just put the raw text in the summary since we removed AI
      const mockResult = {
        personalInfo: { summary: text.substring(0, 1000) + (text.length > 1000 ? '...' : '') }
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
\;

uploader = uploader.replace(/const processFile = async \(file\) => \{[\s\S]*?setStatus\('error'\);\n    \}\n  \};/, mockProcess);

// remove the enhance switch
uploader = uploader.replace(/const \[enhance, setEnhance\] = useState\(true\);\n/, '');
uploader = uploader.replace(/<Box onClick=\{\(e\) => e\.stopPropagation\(\)\}[\s\S]*?<\/Box>/, '');
// replace AI parsing text
uploader = uploader.replace(/\{enhance \? 'AI is analyzing & rewriting your resume\.\.\.' : 'AI is extracting your resume\.\.\.'\}/g, \"'Extracting your resume data...' \");
uploader = uploader.replace(/<AutoAwesomeIcon sx=\{\{ fontSize: 36, color: 'primary.main', mb: 1 \}\} \/>/, '');
uploader = uploader.replace(/Resume parsed & enhanced successfully!/, 'Resume extracted successfully!');

fs.writeFileSync('src/components/Parser/ResumeUploader.jsx', uploader);
console.log('DONE UPLOADER');
