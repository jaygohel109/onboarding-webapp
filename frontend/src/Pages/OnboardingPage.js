import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Onboarding.css"; // Import the custom CSS file

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Save data to local storage (to persist across steps)
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Navigate to the next step (Step 2)
    navigate("/onboarding-step2");
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <h2 className="onboarding-heading">Step 1: Account Setup</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleNext} className="next-btn">
          Next →
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
