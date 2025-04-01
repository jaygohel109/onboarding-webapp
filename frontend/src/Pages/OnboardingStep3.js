import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";  // Import your axios instance
import "../CSS/Onboardingpage.css"; // Import custom CSS file
import StepHeader from "../Components/StepHeader"; // Import the StepHeader component

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);  // For handling form submission errors

  useEffect(() => {
    // Load Admin Configurations from localStorage
    const step3Config = JSON.parse(localStorage.getItem("step3Fields")) || ["street", "city", "state", "zip"];
    setFields(step3Config);

    // Load Step 2 data from localStorage to merge with Step 3
    const step2Data = JSON.parse(localStorage.getItem("onboardingStep2Data")) || {};
    setFormData(step2Data); // Merge Step 2 data into formData
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError(null);

    try {
      // Merge Step 3 data with the already existing Step 2 data
      localStorage.setItem("onboardingStep3Data", JSON.stringify(formData));
      
      // Submit the final merged onboarding data to the backend
      const response = await api.post("/onboarding/step2", formData);

      if (response.data.message === "Onboarding data saved successfully!") {
        alert("Onboarding Complete!");
        navigate("/");  // Redirect to the home page after completion
      } else {
        setSubmitError("Error saving onboarding data. Please try again.");
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting the data.");
      console.error("Error submitting onboarding step3:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepHeader />
      <div className="onboarding-step2-container">
        <div className="onboarding-step2-card">
          <h2 className="onboarding-heading">Onboarding - Step 3</h2>

          {fields.includes("aboutMe") && (
            <textarea
              name="aboutMe"
              placeholder="Tell us about yourself..."
              className="onboarding-input"
              value={formData.aboutMe || ""}
              onChange={handleChange}
            />
          )}

          {fields.includes("street") && (
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              className="onboarding-input"
              value={formData.street || ""}
              onChange={handleChange}
            />
          )}

          {fields.includes("city") && (
            <input
              type="text"
              name="city"
              placeholder="City"
              className="onboarding-input"
              value={formData.city || ""}
              onChange={handleChange}
            />
          )}

          {fields.includes("state") && (
            <input
              type="text"
              name="state"
              placeholder="State"
              className="onboarding-input"
              value={formData.state || ""}
              onChange={handleChange}
            />
          )}

          {fields.includes("zip") && (
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              className="onboarding-input"
              value={formData.zip || ""}
              onChange={handleChange}
            />
          )}

          {fields.includes("birthdate") && (
            <input
              type="date"
              name="birthdate"
              className="onboarding-input"
              value={formData.birthdate || ""}
              onChange={handleChange}
            />
          )}

          <button
            onClick={handleSubmit}
            className="onboarding-btn"
            disabled={loading}  // Disable the button while loading
          >
            {loading ? "Submitting..." : "Submit Form"}
          </button>

          {submitError && <p className="error-text">{submitError}</p>} {/* Display any submission errors */}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep3;
