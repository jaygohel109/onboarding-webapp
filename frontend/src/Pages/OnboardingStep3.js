import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Onboardingpage.css"; // Import custom CSS file

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState([]);

  useEffect(() => {
    // Load Admin Configurations from localStorage
    const step3Config = JSON.parse(localStorage.getItem("step3Fields")) || ["street", "city", "state", "zip"];
    setFields(step3Config);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("onboardingStep3Data", JSON.stringify(formData));
    alert("Onboarding Complete!");
    navigate("/");
  };

  return (
    <div className="onboarding-step2-container">
      <div className="onboarding-step2-card">
        <h2 className="onboarding-heading">Onboarding - Step 3</h2>

        {fields.includes("aboutMe") && (
          <textarea
            name="aboutMe"
            placeholder="Tell us about yourself..."
            className="onboarding-input"
            value={formData.aboutMe}
            onChange={handleChange}
          />
        )}

        {fields.includes("street") && (
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className="onboarding-input"
            value={formData.street}
            onChange={handleChange}
          />
        )}

        {fields.includes("city") && (
          <input
            type="text"
            name="city"
            placeholder="City"
            className="onboarding-input"
            value={formData.city}
            onChange={handleChange}
          />
        )}

        {fields.includes("state") && (
          <input
            type="text"
            name="state"
            placeholder="State"
            className="onboarding-input"
            value={formData.state}
            onChange={handleChange}
          />
        )}

        {fields.includes("zip") && (
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            className="onboarding-input"
            value={formData.zip}
            onChange={handleChange}
          />
        )}

        {fields.includes("birthdate") && (
          <input
            type="date"
            name="birthdate"
            className="onboarding-input"
            value={formData.birthdate}
            onChange={handleChange}
          />
        )}

        <button
          onClick={handleSubmit}
          className="onboarding-btn"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
