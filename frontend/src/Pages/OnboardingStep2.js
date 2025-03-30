import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Onboardingpage.css"; // Import the custom CSS file

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [fieldRequirements, setFieldRequirements] = useState({});

  useEffect(() => {
    // Load Admin Configurations from localStorage
    const step2Config = JSON.parse(localStorage.getItem("step2Fields")) || ["aboutMe", "birthdate"];
    setFields(step2Config);

    const fieldRequirements = JSON.parse(localStorage.getItem("fieldRequirements")) || {};
    setFieldRequirements(fieldRequirements); 
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    // Validation logic to check if required fields are filled
    const newErrors = {};
    fields.forEach((field) => {
      // Check if the field is required and empty
      if (fieldRequirements[field] && !formData[field]?.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    // If there are errors, show them and do not navigate
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      localStorage.setItem("onboardingStep2Data", JSON.stringify(formData));
      navigate("/onboarding-step3");
    }
  };

  return (
    <div className="onboarding-step2-container">
      <div className="onboarding-step2-card">
        <h2 className="onboarding-heading">Onboarding - Step 2</h2>

        {fields.includes("aboutMe") && (
          <div className="form-group">
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
          onClick={handleNext}
          className="onboarding-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
