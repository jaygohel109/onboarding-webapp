import { useState, useEffect } from "react";
import "../CSS/AdminPanel.css"; // Import the custom CSS file

const AdminPanel = () => {
  const [step2Fields, setStep2Fields] = useState([]);
  const [step3Fields, setStep3Fields] = useState([]);
  const [fieldRequirements, setFieldRequirements] = useState({});

  const allFields = [
    { id: "aboutMe", label: "About Me" },
    { id: "birthdate", label: "Birthdate" },
    { id: "street", label: "Street Address" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "zip", label: "ZIP Code" },
  ];

  useEffect(() => {
    // Load existing config from localStorage
    const savedStep2 = JSON.parse(localStorage.getItem("step2Fields")) || ["aboutMe", "birthdate"];
    const savedStep3 = JSON.parse(localStorage.getItem("step3Fields")) || ["street", "city", "state", "zip"];
    const savedFieldRequirements = JSON.parse(localStorage.getItem("fieldRequirements")) || {};
    setStep2Fields(savedStep2);
    setStep3Fields(savedStep3);
    setFieldRequirements(savedFieldRequirements);
  }, []);

  const handleFieldChange = (step, fieldId) => {
    // Function to update fields
    const updateFields = (currentStepFields, otherStepFields, fieldId) => {
      // If field is checked, add to the current step and remove from the other step
      if (currentStepFields.includes(fieldId)) {
        return currentStepFields.filter((id) => id !== fieldId); // Remove from current step
      } else {
        const updatedOtherStepFields = otherStepFields.filter((id) => id !== fieldId); // Remove from other step
        return [...currentStepFields, fieldId]; // Add to current step
      }
    };

    if (step === 2) {
      setStep2Fields((prevFields) => {
        const updatedFields = updateFields(prevFields, step3Fields, fieldId);
        // Instant update of step 2 and remove from step 3
        setStep3Fields((prevStep3Fields) => prevStep3Fields.filter((id) => id !== fieldId));
        return updatedFields;
      });
    }

    if (step === 3) {
      setStep3Fields((prevFields) => {
        const updatedFields = updateFields(prevFields, step2Fields, fieldId);
        // Instant update of step 3 and remove from step 2
        setStep2Fields((prevStep2Fields) => prevStep2Fields.filter((id) => id !== fieldId));
        return updatedFields;
      });
    }
  };
  const handleRequiredChange = (fieldId) => {
    setFieldRequirements((prev) => {
      const newRequirements = { ...prev, [fieldId]: !prev[fieldId] }; // Toggle the required status
      localStorage.setItem("fieldRequirements", JSON.stringify(newRequirements));
      return newRequirements;
    });
  };
  
  const handleSave = () => {
    localStorage.setItem("step2Fields", JSON.stringify(step2Fields));
    localStorage.setItem("step3Fields", JSON.stringify(step3Fields));
    alert("Onboarding fields updated!");
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-card">
        <h2 className="admin-panel-heading">Admin Panel</h2>

        <h3 className="subheading">Step 2 Fields</h3>
        {allFields.map(({ id, label }) => (
          <div key={id} className="field-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={step2Fields.includes(id)}
                onChange={() => handleFieldChange(2, id)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{label}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={fieldRequirements[id] || false}
                onChange={() => handleRequiredChange(id)}
                className="checkbox-input"
              />
              <span className="checkbox-text">Required</span>
            </label>
          </div>
        ))}

        <h3 className="subheading">Step 3 Fields</h3>
        {allFields.map(({ id, label }) => (
          <div key={id} className="field-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={step3Fields.includes(id)}
                onChange={() => handleFieldChange(3, id)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{label}</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={fieldRequirements[id] || false}
                onChange={() => handleRequiredChange(id)}
                className="checkbox-input"
              />
              <span className="checkbox-text">Required</span>
            </label>
          </div>
        ))}


        <button onClick={handleSave} className="save-btn">
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
