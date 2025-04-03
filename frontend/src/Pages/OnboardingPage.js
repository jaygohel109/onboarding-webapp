import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import the Axios instance
import "../CSS/Onboarding.css"; // Import custom CSS
import StepHeader from "../Components/StepHeader"; // Import the StepHeader component

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch fields for step 2 and step 3
  const fetchFields = async () => {
    try {
      // Call the API to get field requirements (for step 2 and step 3)
      const response = await api.get("/fields");
  
      // Filter fields based on page number
      const step2Fields = response.data.filter(field => field.page === 2);
      const step3Fields = response.data.filter(field => field.page === 3);
  
      // Extract only the field names for each page
      const step2FieldNames = step2Fields.map(field => field.name);
      const step3FieldNames = step3Fields.map(field => field.name);
  
      // Store field names separately in localStorage
      localStorage.setItem("step2FieldNames", JSON.stringify(step2FieldNames));
      localStorage.setItem("step3FieldNames", JSON.stringify(step3FieldNames));
  
      // Store all field data together in one variable
      const allFieldsData = [...step2Fields, ...step3Fields];
      localStorage.setItem("allFieldsData", JSON.stringify(allFieldsData));

      // Store field requirements (is_required) in a separate variable
      const fieldRequirements = response.data.reduce((acc, field) => {
        acc[field.name] = field.is_required;
        return acc;
      }, {});

      // Store field requirements in localStorage
      localStorage.setItem("fieldRequirements", JSON.stringify(fieldRequirements));
  
    } catch (err) {
      console.error("Error fetching fields:", err);
    }
  };

  // Call fetchFields when the component mounts
  useEffect(() => {
    fetchFields();
  }, []);

  const handleNext = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Step 1: Register the user
      await api.post("/users", { username: email, password });

      // Step 2: Automatically log in the user
      const loginResponse = await api.post("/login", new URLSearchParams({
        username: email,
        password,
      }));

      // Step 3: Store the token for authentication
      localStorage.setItem("token", loginResponse.data.access_token);
      localStorage.setItem("email", email); // Persist email across steps

      // Step 4: Navigate to onboarding step 2
      navigate("/onboarding-step2");
    } catch (err) {
      setError(err.response?.data?.detail || "User already exists or invalid credentials.");
    }
  };

  return (
    <div>
      <StepHeader /> {/* Show Stepper Header */}
      <div className="onboarding-container">
        <div className="onboarding-card">
          <h2 className="onboarding-heading">Step 1: Account Setup</h2>
          {error && <p className="error-message">{error}</p>}
          <label className="onboarding-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="onboarding-label">Password</label>
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
