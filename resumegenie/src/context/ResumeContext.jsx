import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'resumegenie_state';

const defaultState = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    summary: '',
    photo: null,
  },
  experience: [],
  education: [],
  skills: { technical: [], soft: [], languages: [] },
  projects: [],
  certifications: [],
};

function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'SET_EXPERIENCE':
      return { ...state, experience: action.payload };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: Date.now(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] },
        ],
      };
    case 'UPDATE_EXPERIENCE': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        experience: state.experience.map(exp =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      };
    }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter(e => e.id !== action.payload) };
    case 'SET_EDUCATION':
      return { ...state, education: action.payload };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [
          ...state.education,
          { id: Date.now(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' },
        ],
      };
    case 'UPDATE_EDUCATION': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        education: state.education.map(edu =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      };
    }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter(e => e.id !== action.payload) };
    case 'SET_SKILLS':
      return { ...state, skills: { ...state.skills, ...action.payload } };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: Date.now(), name: '', url: '', techStack: [], description: '' },
        ],
      };
    case 'UPDATE_PROJECT': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        projects: state.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
      };
    }
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter(p => p.id !== action.payload) };
    case 'SET_CERTIFICATIONS':
      return { ...state, certifications: action.payload };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [
          ...state.certifications,
          { id: Date.now(), name: '', issuer: '', date: '' },
        ],
      };
    case 'UPDATE_CERTIFICATION': {
      const { id, field, value } = action.payload;
      return {
        ...state,
        certifications: state.certifications.map(c =>
          c.id === id ? { ...c, [field]: value } : c
        ),
      };
    }
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter(c => c.id !== action.payload) };
    case 'LOAD_STATE':
      return { ...defaultState, ...action.payload };
    case 'RESET':
      return defaultState;
    default:
      return state;
  }
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, undefined, loadFromStorage);

  // Persist on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used inside ResumeProvider');
  return ctx;
}
