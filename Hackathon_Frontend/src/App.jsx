import { BrowserRouter, Routes, Route } from 'react-router-dom'; // purpose: main page to link from admin or greensense dashboard
import { Dashboard } from './components/layout/Dashboard.jsx';
import { AdminPage } from './components/layout/RouterAdmin.jsx';
// direction admin panel for React app, making references to admin alongside added in sub webpages from admin page

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage />} /> {/* Admin start page part of app*/}
          <Route path="/greensense-dashboard" element={<Dashboard />} />  {/* GreenSense App part of app */}

        </Routes>
      </BrowserRouter>
  );
}

export default App;
