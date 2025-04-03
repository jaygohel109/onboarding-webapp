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
  const [errors, setErrors] = useState({});
  const [fieldRequirements, setFieldRequirements] = useState({});
  const [submitError, setSubmitError] = useState(null);  // For handling form submission errors

  useEffect(() => {
    // Load Admin Configurations from localStorage
    const step3Config = JSON.parse(localStorage.getItem("step3FieldNames")) || ["street", "city", "state", "zip"];
    setFields(step3Config);

    // Load Step 2 data from localStorage to merge with Step 3
    const step2Data = JSON.parse(localStorage.getItem("onboardingStep2Data")) || {};
    setFormData(step2Data); // Merge Step 2 data into formData

    const fieldRequirements = JSON.parse(localStorage.getItem("fieldRequirements")) || {};
    setFieldRequirements(fieldRequirements); 
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitError(null);
  
    // Validation logic to check if required fields are filled
    const newErrors = {};
    fields.forEach((field) => {
      if (fieldRequirements[field] && !formData[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });
  
    // If there are errors, show them and STOP form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); // Reset loading state
      return; // Stop execution here
    } else {
      setErrors({}); // Clear errors if none
    }
  
    try {
      localStorage.setItem("onboardingStep3Data", JSON.stringify(formData));
  
      const response = await api.post("/onboarding/step2", formData);
  
      if (response.data.message === "Onboarding data saved successfully!") {
        alert("Onboarding Complete!");
        navigate("/"); // Redirect to the home page
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
            <div className="form-group">
              <label className="onboarding-label">About Me</label>
              <textarea
                name="aboutMe"
                placeholder="Tell us about yourself..."
                className="onboarding-input"
                value={formData.aboutMe || ""}
                onChange={handleChange}
              />
              {errors.aboutMe && <p className="error-text">{errors.aboutMe}</p>}
            </div>
          )}

          {fields.includes("street") && (
            <div className="form-group">
              <label className="onboarding-label">Street Address</label>
              <input
                type="text"
                name="street"
                placeholder="Street Address"
                className="onboarding-input"
                value={formData.street || ""}
                onChange={handleChange}
              />
              {errors.street && <p className="error-text">{errors.street}</p>}
            </div>
          )}

          {fields.includes("city") && (
            <div className="form-group">
              <label className="onboarding-label">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="onboarding-input"
                value={formData.city || ""}
                onChange={handleChange}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
          )}

          {fields.includes("state") && (
            <div className="form-group">
              <label className="onboarding-label">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                className="onboarding-input"
                value={formData.state || ""}
                onChange={handleChange}
              />
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>
          )}

          {fields.includes("zip") && (
            <div className="form-group">
              <label className="onboarding-label">ZIP Code</label>
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                className="onboarding-input"
                value={formData.zip || ""}
                onChange={handleChange}
              />
              {errors.zip && <p className="error-text">{errors.zip}</p>}
            </div>
          )}

          {fields.includes("birthdate") && (
            <div className="form-group">
              <label className="onboarding-label">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                className="onboarding-input"
                value={formData.birthdate || ""}
                onChange={handleChange}
              />
              {errors.birthdate && <p className="error-text">{errors.birthdate}</p>}
            </div>
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
