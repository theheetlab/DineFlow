import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ServerError = lazy(() => import('./pages/ServerError'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const Login = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const MenuManagement = lazy(() => import('./pages/admin/MenuManagement'));
const ReservationManagement = lazy(() => import('./pages/admin/ReservationManagement'));
const CustomerManagement = lazy(() => import('./pages/admin/CustomerManagement'));
const TestimonialManagement = lazy(() => import('./pages/admin/TestimonialManagement'));
const ContactManagement = lazy(() => import('./pages/admin/ContactManagement'));
const ActivityLog = lazy(() => import('./pages/admin/ActivityLog'));

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <LoadingSpinner text="Loading..." />
  </div>
);

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/menu" element={<PublicLayout><Menu /></PublicLayout>} />
                <Route path="/reservation" element={<PublicLayout><Reservation /></PublicLayout>} />
                <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

                <Route path="/admin/login" element={<Login />} />

                <Route path="/500" element={<PublicLayout><ServerError /></PublicLayout>} />
                <Route path="/unauthorized" element={<PublicLayout><Unauthorized /></PublicLayout>} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="menu" element={<MenuManagement />} />
                  <Route path="reservations" element={<ReservationManagement />} />
                  <Route path="customers" element={<CustomerManagement />} />
                  <Route path="testimonials" element={<TestimonialManagement />} />
                  <Route path="contacts" element={<ContactManagement />} />
                  <Route path="activity" element={<ActivityLog />} />
                </Route>

                <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
              </Routes>
            </Suspense>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
