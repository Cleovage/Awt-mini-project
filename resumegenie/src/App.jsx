import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import ATSScorerPage from './pages/ATSScorerPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/ats-scorer" element={<ATSScorerPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
