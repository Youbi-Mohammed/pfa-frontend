import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './app/store.tsx';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
       <Provider store={store}>
       <App />
       </Provider>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
