import "./App.css";

import { useState, useEffect } from "react";
import AuthContext from "./context/AuthContext";
import { Toaster } from "@/components/ui/Toaster";
import { UserSchema } from "@/schema";
import get from "@/utils/get";

import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "@/layouts/Sidebar";

// Page imports
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Invite from "@/pages/Invite";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Assignments from "./pages/Assignments";
import Assignment from "./pages/Assignment";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";
import Exams from "./pages/Exams";
import Exam from "./pages/Exam";
import StudySets from "./pages/StudySets";
import StudySet from "./pages/StudySet";
import Documents from "./pages/Documents";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div id="app">
      <Routes>
        {/* Main aplication */}
        <Route path="/*" element={<MainRouter />} />
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </div>
  );
}

function MainRouter() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    get(
      (data: UserSchema | null) => {
        if (data) setUser(data);
        else {
          setUser(null);
          navigate("/login");
        }
      },
      "user",
      "/users/current"
    );
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      <AuthContext.Provider value={{ user: user, setUser: setUser }}>
        <Sidebar className="" />

        <div className="w-full h-full p-4 bg-[#1f202f] overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Courses routes */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<Course />} />

            {/* Assignments routes */}
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/assignments/:id" element={<Assignment />} />

            {/* AI Functions routes */}
            <Route path="/assignments/:id/chats" element={<Chats />} />
            <Route path="/assignments/:id/chats/:chatId" element={<Chat />} />

            {/* Exams routes */}
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:id" element={<Exam />} />

            {/* Study sets routes */}
            <Route path="/study-sets" element={<StudySets />}></Route>
            <Route path="/study-sets/:id" element={<StudySet />}></Route>

            {/* Documents route */}
            <Route path="/documents" element={<Documents />}></Route>

            {/* Schedule route */}
            <Route path="/schedule" element={<Schedule />}></Route>

            {/* Settings route */}
            <Route path="/settings" element={<Settings />} />

            {/* Checkout page */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Catch all 404 page */}
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
