import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ExperiencesPage from './pages/ExperiencesPage';
import GiftedPage from './pages/GiftedPage';
import ClubPage from './pages/ClubPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/gifted" element={<GiftedPage />} />
          <Route path="/club" element={<ClubPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
