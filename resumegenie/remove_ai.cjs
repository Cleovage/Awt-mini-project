const fs = require('fs');

let navbar = fs.readFileSync('src/components/Layout/Navbar.jsx', 'utf-8');
navbar = navbar.replace(/\s*\{ label: 'Settings', path: '\/settings', icon: <SettingsIcon \/> \},/g, '');
navbar = navbar.replace(/import SettingsIcon from '@mui\/icons-material\/Settings';\n/g, '');
fs.writeFileSync('src/components/Layout/Navbar.jsx', navbar);

let uploader = fs.readFileSync('src/components/Parser/ResumeUploader.jsx', 'utf-8');
uploader = uploader.replace(/import { callAIJson } from '..\/..\/services\/aiService';\n/, '');
uploader = uploader.replace(/import AutoAwesomeIcon from '@mui\/icons-material\/AutoAwesome';\n/, '');

const mockProcessMatch = uploader.match(/const processFile = async \(file\) => \{[\s\S]*?setStatus\('error'\);\n    \}\n  \};/);
if (mockProcessMatch) {
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
      
      // Removed AI. Dummy set extracted text to summary
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
  uploader = uploader.replace(mockProcessMatch[0], mockProcess);
}

uploader = uploader.replace(/const \[enhance, setEnhance\] = useState\(true\);\n/, '');
uploader = uploader.replace(/<Box onClick=\{\(e\) => e\.stopPropagation\(\)\}[\s\S]*?<\/Box>/, '');
uploader = uploader.replace(/\{enhance \? 'AI is analyzing & rewriting your resume\.\.\.' : 'AI is extracting your resume\.\.\.'\}/g, \"'Extracting your resume data...' \");
uploader = uploader.replace(/<AutoAwesomeIcon sx=\{\{ fontSize: 36, color: 'primary\.main', mb: 1 \}\} \/>\n/g, '');
uploader = uploader.replace(/Resume parsed & enhanced successfully!/, 'Resume extracted successfully!');

// remove PARSE_PROMPT:
uploader = uploader.replace(/const PARSE_PROMPT = \([\s\S]*?\]\\n\}\\n\}\\n\}\\n\\"\\;/g, '');

fs.writeFileSync('src/components/Parser/ResumeUploader.jsx', uploader);
console.log('DONE UPLOADER');
