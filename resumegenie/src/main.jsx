import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import App from './App.jsx';
import { ResumeProvider } from './context/ResumeContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
