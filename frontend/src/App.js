import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Onboarding from "./Pages/OnboardingPage";
import OnboardingStep2 from "./Pages/OnboardingStep2";
import OnboardingStep3 from "./Pages/OnboardingStep3";
import AdminPanel from "./Pages/AdminPanel";
import OnboardingData from "./Pages/AllData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<OnboardingData />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/onboarding-step2" element={<OnboardingStep2 />} />
        <Route path="/onboarding-step3" element={<OnboardingStep3 />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
