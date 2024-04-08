import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom";
import {
    Login, Register
} from "./pages";
import Sidebar from "@/layouts/Sidebar";

import Settings from './pages/Settings';

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
            <Sidebar className="basis-1/6 min-w-[250px]" />

            <div className="w-full h-full">
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/settings" element={<Settings/>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
