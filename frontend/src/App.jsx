
import ATSScore from "./pages/ATSScore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import CareerAnalysis from "./pages/CareerAnalysis";
import JobMatch from "./pages/JobMatch";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import History from "./pages/History";
import CareerRoadmap from "./pages/CareerRoadmap";
import InterviewPrep from "./pages/InterviewPrep";
import MockInterview from "./pages/MockInterview";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard
                 />



              </Layout>
              
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Layout>
                <UploadResume />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-analysis"
          element={
            <ProtectedRoute>
              <Layout>
                <CareerAnalysis />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-match"
          element={
            <ProtectedRoute>
              <Layout>
                <JobMatch />
              </Layout>
            </ProtectedRoute>
          }
        />


        <Route
          path="/ats-score"
          element={
            <ProtectedRoute>
              <Layout>
                <ATSScore />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/history"
  element={
    <ProtectedRoute>
      <Layout>
        <History />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/career-roadmap"
  element={
    <ProtectedRoute>
      <Layout>
        <CareerRoadmap />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/interview-prep"
  element={
    <ProtectedRoute>
      <Layout>
        <InterviewPrep />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/mock-interview"
  element={
    <ProtectedRoute>
      <Layout>
        <MockInterview />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;