import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import StudentDetails from "./components/StudentDetails";
import EditStudent from "./components/EditStudent";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ make sure this exists and is imported correctly

const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />

          {/* ✅ Protected Route for Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected Route for Class Teacher */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
