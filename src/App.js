import './App.css';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import GtinInputPage from './pages/GtinInputPage';

function App() {
  return (
    <PrimeReactProvider>
        <div className="App">
            <GtinInputPage/>
        </div>
    </PrimeReactProvider>
  );
}

export default App;
