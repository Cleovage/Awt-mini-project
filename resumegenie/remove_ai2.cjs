const fs = require('fs');

let ats = fs.readFileSync('src/pages/ATSScorerPage.jsx', 'utf-8');

// remove AI import
ats = ats.replace(/import \{ callAIJson \} from '\.\.\/services\/aiService';\n/, '');

// replace handleAnalyze function
const handleAnalyzeMatch = ats.match(/const handleAnalyze = async \(\) => \{[\s\S]*?finally \{\n\s*setLoading\(false\);\n\s*\}\n  \};/);
if (handleAnalyzeMatch) {
const replacement = \
  const handleAnalyze = async () => {
    if (!jobDesc.trim()) { setError('Please paste a job description first.'); return; }
    if (!hasResume) { setError('Your resume is empty. Please fill in the Builder first.'); return; }
    setError('');
    setLoading(true);
    setResult(null);

    setTimeout(() => {
        const stops = new Set(['that', 'this', 'with', 'from', 'your', 'have', 'more', 'will', 'must', 'been']);
        const jdWords = Array.from(new Set(jobDesc.toLowerCase().replace(/[^a-z0-9\\s]/g, '').split(' ').filter(w => w.length > 4 && !stops.has(w))));
        const resumeWords = new Set(resumeText.toLowerCase().replace(/[^a-z0-9\\s]/g, '').split(' '));

        const matched = jdWords.filter(w => resumeWords.has(w)).slice(0, 10);
        const missing = jdWords.filter(w => !resumeWords.has(w)).slice(0, 10);
        const ratio = jdWords.length > 0 ? matched.length / Math.min(jdWords.length, 25) : 0.5;
        const score = Math.min(100, Math.max(0, Math.floor(ratio * 100)));

        const safeStat = (s) => Math.min(100, Math.max(0, s + Math.floor(Math.random() * 20) - 10));

        setResult({
            overallScore: score,
            sections: {
                summary: safeStat(score),
                experience: safeStat(score),
                skills: safeStat(score),
                education: safeStat(score)
            },
            keywordsMatched: matched.length > 0 ? matched : ['development'],
            keywordsMissing: missing.length > 0 ? missing : ['optimization'],
            suggestions: [
                "Include more verbatim keywords from the job description.",
                "Quantify your experience outcomes with metrics.",
                "Align your summary directly with the top requirements.",
                "Remove outdated skills that don't match the listing."
            ],
            improvedSummary: null
        });
        setLoading(false);
    }, 1500);
  };
\;
  ats = ats.replace(handleAnalyzeMatch[0], replacement);
}

// Remove Improved summary application if they press it
ats = ats.replace(/const handleApplySummary = \(\) => \{[\s\S]*?\}\;\n\n/g, '');
// Remove Improved summary visual blocks
ats = ats.replace(/\{\/\* Improved summary \*\/\}[\s\S]*?<\/Paper>\n\s*\)\}/, '');

fs.writeFileSync('src/pages/ATSScorerPage.jsx', ats);
console.log('DONE ATS Scorer');
