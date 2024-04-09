import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom";
import {
    Login, Register
} from "./pages";
import Sidebar from "@/layouts/Sidebar";

import Dashboard from "@/pages/Dashboard";
import Settings from '@/pages/Settings';

function App() {
    return (
        <div id="app">
            <Routes>
                {/* Main aplication */}
                <Route path="/*" element={<MainRouter/>} />
                {/* Auth pages */}
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
}

function MainRouter() {
    return(
        <div className="flex">
            <Sidebar className="" />

            <div className="w-full h-full">
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/settings" element={<Settings/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
