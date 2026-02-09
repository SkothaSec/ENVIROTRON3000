import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Landing } from './pages/Landing';
import { Simulator } from './pages/Simulator';
import { Dashboard } from './pages/Dashboard';
import { Credits } from './pages/Credits';
import { ROUTES } from './lib/constants';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.LANDING} element={<Landing />} />
          <Route path={ROUTES.HOME} element={<Simulator />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.CREDITS} element={<Credits />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}