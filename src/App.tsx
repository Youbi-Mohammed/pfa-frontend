// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Student from './dashboards/Student';
import EncadrantDashboard from './pages/EncadrantDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Unauthorized from './components/PrivateRoute/Unauthorized';
// import CreateProjectForm from './pages/SaisirProject';
import TokenTest from './pages/TokenTest';
import UserProfileTest from './pages/TokenTest';
import TestConnection from './pages/DebugTest';
import DataFetcher from './pages/DebugTest';
import ProjectCreateForm from './pages/SaisirProject';
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

          {/* 🔒 Admin seulement (roleId = 1) */}
      <Route element={<PrivateRoute allowedRoles={1} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/token-test" element={<TokenTest />} />
        <Route path="/test-auth" element={<UserProfileTest />} />
        <Route path="test-connection" element={<DataFetcher />} />
        <Route path="create-project" element={<ProjectCreateForm/>}/>
        </Route>

      {/* 🔒 Étudiant seulement (roleId = 2) */}
      <Route element={<PrivateRoute allowedRoles={2} />}>
        <Route path="/encadrant" element={<EncadrantDashboard />} />
        {/* <Route path="/create-project" element={<CreateProjectForm />} /> */}
        {/* <Route path="/test-auth" element={<UserProfileTest />} />
        <Route path="/token-test" element={<TokenTest />} />
        <Route path="test-connection" element={<DataFetcher  />} /> */}
         <Route path="/token-test" element={<TokenTest />} />
        <Route path="/test-auth" element={<UserProfileTest />} />
        <Route path="test-connection" element={<DataFetcher />} />
        <Route path="create-project" element={<ProjectCreateForm/>}/>

      </Route>

      {/* 🔒 Encadrant seulement (roleId = 3) */}
      <Route element={<PrivateRoute allowedRoles={3} />}>
        <Route path="/student" element={<Student />} />
        {/* <Route path="/test-auth" element={<UserProfileTest />} />
        <Route path="/token-test" element={<TokenTest />} />
        <Route path="test-connection" element={<DataFetcher  />} /> */}
        <Route path="/token-test" element={<TokenTest />} />
        <Route path="/test-auth" element={<UserProfileTest />} />
        <Route path="test-connection" element={<DataFetcher />} />
        <Route path="create-project" element={<ProjectCreateForm/>}/>
      </Route>
        </Routes>
      </div>
    </Router>
  );
};
export default App;
