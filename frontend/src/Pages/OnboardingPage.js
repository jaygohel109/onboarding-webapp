import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import the Axios instance
import "../CSS/Onboarding.css"; // Import custom CSS
import StepHeader from "../Components/StepHeader"; // Import the StepHeader component

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Step 1: Register the user
      await api.post("/users/", { username: email, password });

      // Step 2: Automatically log in the user
      const loginResponse = await api.post("/login/", new URLSearchParams({
        username: email,
        password,
      }));

      // Step 3: Store the token for authentication
      localStorage.setItem("token", loginResponse.data.access_token);
      localStorage.setItem("email", email); // Persist email across steps

      // Step 4: Navigate to onboarding step 2
      navigate("/onboarding-step2");
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred during onboarding.");
    }
  };

  return (
    <div>
      <StepHeader /> {/* Show Stepper Header */}
      <div className="onboarding-container">
        <div className="onboarding-card">
          <h2 className="onboarding-heading">Step 1: Account Setup</h2>
          {error && <p className="error-message">{error}</p>}
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
    </div>
  );
};

export default Onboarding;
