import React from 'react';
import { createRoot } from 'react-dom/client';  // Import de createRoot
import { Provider } from 'react-redux';

import App from './App';


const root = createRoot(document.getElementById('root')); // Créer le root
root.render(
    <App />

);
