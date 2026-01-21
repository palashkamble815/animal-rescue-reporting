import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AnimalReportsPage from './pages/AnimalReportsPage';
import AnimalReportFormPage from './pages/AnimalReportFormPage';
import AdoptionPage from './pages/AdoptionPage';
import AdoptionFormPage from './pages/AdoptionFormPage';
import LostFoundPage from './pages/LostFoundPage';
import LostFoundFormPage from './pages/LostFoundFormPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import SuccessStoryFormPage from './pages/SuccessStoryFormPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage';
import NGORepositoryPage from './pages/NGORepositoryPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reports" element={<AnimalReportsPage />} />
          <Route path="/reports/new" element={<PrivateRoute><AnimalReportFormPage /></PrivateRoute>} />
          <Route path="/adoptions" element={<AdoptionPage />} />
          <Route path="/adoptions/new" element={<PrivateRoute><AdoptionFormPage /></PrivateRoute>} />
          <Route path="/adoptions/edit/:id" element={<PrivateRoute><AdoptionFormPage /></PrivateRoute>} />
          <Route path="/lost-and-found" element={<LostFoundPage />} />
          <Route path="/lost-and-found/new" element={<PrivateRoute><LostFoundFormPage /></PrivateRoute>} />
          <Route path="/lost-and-found/edit/:id" element={<PrivateRoute><LostFoundFormPage /></PrivateRoute>} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/success-stories/new" element={<PrivateRoute><SuccessStoryFormPage /></PrivateRoute>} />
          <Route path="/success-stories/edit/:id" element={<PrivateRoute><SuccessStoryFormPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/ngo/reports" element={<NGORepositoryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;