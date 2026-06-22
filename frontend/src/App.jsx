import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateOpportunity from './pages/CreateOpportunity';
import EditOpportunity from './pages/EditOpportunity';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes - no navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes - with navbar */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <CreateOpportunity />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <EditOpportunity />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;