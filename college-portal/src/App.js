import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import StudentDashboard from "./Pages/StudentDashboard";
import StaffDashboard from "./Pages/StaffDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
