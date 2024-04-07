import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import {
    Login, Register
} from "./pages";

function App() {
    return (
        <div id="app">
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
}

export default App;
