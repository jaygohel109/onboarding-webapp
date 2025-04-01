import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/StepHeader.css"; // Import CSS for styling

const steps = [
  { label: "Step 1", path: "/onboarding" },
  { label: "Step 2", path: "/onboarding-step2" },
  { label: "Step 3", path: "/onboarding-step3" },
];

const StepHeader = () => {
  const location = useLocation();

  return (
    <div className="step-header">
      {steps.map((step, index) => {
        const isActive = location.pathname === step.path;
        return (
          <div key={index} className={`step-item ${isActive ? "active" : ""}`}>
            <Link to={step.path} className="step-link">
              {step.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default StepHeader;
