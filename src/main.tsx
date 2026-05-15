// i18n must initialize before any feature content files are evaluated
import './shared/i18n/config';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(<App />);
