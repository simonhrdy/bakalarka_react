import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "./layout/Home";
import MatchDetail from "./layout/Match/MatchDetail";
import ResetPassword from "./layout/Auth/ResetPassword";
import LeagueDetail from "./layout/League";
import BaseLayout from "./layout/BaseLayout";
import TeamDetail from "./layout/Team";
import PlayerDetail from "./layout/Player";

function App() {
    return (
        <BrowserRouter>
            <BaseLayout>
                <Routes>
                    <Route path="/:sport" element={<Home />} />
                    <Route path="/" element={<Navigate to="/fotbal" replace />} />
                    <Route path="/match/:id" element={<MatchDetail />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/league/:id" element={<LeagueDetail />} />
                    <Route path="/team/:id" element={<TeamDetail />} />
                    <Route path="/player/:id" element={<PlayerDetail />} />
                </Routes>
            </BaseLayout>
        </BrowserRouter>
    );
}

export default App;
