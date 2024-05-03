import React, { useEffect } from "react";
import "./App.css";

import { Toaster } from "@/components/ui/Toaster";

import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import Sidebar from "@/layouts/Sidebar";

import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Course from "./pages/Course";

function App() {
  return (
    <div id="app">
      <Routes>
        {/* Main aplication */}
        <Route path="/*" element={<MainRouter />} />
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function MainRouter() {
  return (
    <div className="flex h-screen">
      <Sidebar className="" />

      <div className="w-full h-full p-4 bg-[#1f202f] overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
