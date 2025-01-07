import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <PrimeReactProvider>
          <App />
      </PrimeReactProvider>
  </BrowserRouter>,
)
