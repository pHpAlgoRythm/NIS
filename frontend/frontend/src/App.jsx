import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const AuthPage = lazy(() => import("./pages/AuthPage"));
const DashBoard = lazy(() => import("./pages/DashBoard"));


const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashBoard/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
