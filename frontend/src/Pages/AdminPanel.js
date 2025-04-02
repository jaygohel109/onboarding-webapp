import { useState, useEffect } from "react";
import "../CSS/AdminPanel.css";
import api from "../api";

const AdminPanel = () => {
  const [step2Fields, setStep2Fields] = useState([]);
  const [step3Fields, setStep3Fields] = useState([]);
  const [fieldRequirements, setFieldRequirements] = useState({});
  const allFieldsdata = JSON.parse(localStorage.getItem("allFieldsData")) || [];

  const allFields = [
    { id: "aboutMe", label: "About Me" },
    { id: "birthdate", label: "Birthdate" },
    { id: "street", label: "Street Address" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "zip", label: "ZIP Code" },
  ];

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

    const savedStep2 = JSON.parse(localStorage.getItem("step2FieldNames")) || ["aboutMe", "birthdate"];
    const savedStep3 = JSON.parse(localStorage.getItem("step3FieldNames")) || ["street", "city", "state", "zip"];
    const savedFieldRequirements = JSON.parse(localStorage.getItem("fieldRequirements")) || {};

    setStep2Fields(savedStep2);
    setStep3Fields(savedStep3);
    setFieldRequirements(savedFieldRequirements);
  }, []);

  // useEffect(() => {
  //   // Load from localStorage
  //   const savedStep2 = JSON.parse(localStorage.getItem("step2FieldNames")) || ["aboutMe", "birthdate"];
  //   const savedStep3 = JSON.parse(localStorage.getItem("step3FieldNames")) || ["street", "city", "state", "zip"];
  //   const savedFieldRequirements = JSON.parse(localStorage.getItem("fieldRequirements")) || {};

  //   setStep2Fields(savedStep2);
  //   setStep3Fields(savedStep3);
  //   setFieldRequirements(savedFieldRequirements);
  // }, []);

  const handleFieldChange = (step, fieldId) => {
    const updateFields = (currentStepFields, otherStepFields, fieldId) => {
      if (currentStepFields.includes(fieldId)) {
        return currentStepFields.filter((id) => id !== fieldId); // Remove field
      } else {
        return [...currentStepFields, fieldId]; // Add field
      }
    };

    if (step === 2) {
      setStep2Fields((prevFields) => {
        const updatedFields = updateFields(prevFields, step3Fields, fieldId);
        setStep3Fields((prev) => prev.filter((id) => id !== fieldId)); // Remove from Step 3
        return updatedFields;
      });
    }

    if (step === 3) {
      setStep3Fields((prevFields) => {
        const updatedFields = updateFields(prevFields, step2Fields, fieldId);
        setStep2Fields((prev) => prev.filter((id) => id !== fieldId)); // Remove from Step 2
        return updatedFields;
      });
    }

    // Remove Required flag only if field is removed from both steps
    setFieldRequirements((prev) => {
      const newRequirements = { ...prev };
      if (!step2Fields.includes(fieldId) && !step3Fields.includes(fieldId)) {
        delete newRequirements[fieldId];
      }
      return newRequirements;
    });
  };

  const handleRequiredChange = (fieldId) => {
    setFieldRequirements((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId], // Toggle required flag
    }));
  };

  const handleSave = async () => {
    // Prepare the fields data with _id from localStorage
    const updatedFields = [
      ...step2Fields.map((fieldId) => {
        const fieldData = allFieldsdata.find((field) => field.name === fieldId);
        return {
          id: fieldData ? fieldData._id : null, // Include _id from saved data
          name: fieldId,
          is_required: fieldRequirements[fieldId] || false,
          page: 2,
        };
      }),
      ...step3Fields.map((fieldId) => {
        const fieldData = allFieldsdata.find((field) => field.name === fieldId);
        return {
          id: fieldData ? fieldData._id : null, // Include _id from saved data
          name: fieldId,
          is_required: fieldRequirements[fieldId] || false,
          page: 3,
        };
      }),
    ];
  
    // API request to update fields in the database
    try {
      const response = await api.post("/update-fields", updatedFields);

      if (response.status === 200) {
        // Success: Update localStorage
        localStorage.setItem("step2Fields", JSON.stringify(step2Fields));
        localStorage.setItem("step3Fields", JSON.stringify(step3Fields));
        localStorage.setItem("fieldRequirements", JSON.stringify(fieldRequirements));
        alert("Onboarding fields updated successfully!");
      } else {
        alert("Failed to update fields.");
      }
    } catch (error) {
      console.error("Error updating fields:", error);
      alert("Error updating fields.");
    }
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
            {step2Fields.includes(id) && ( // Required only if field is selected
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={fieldRequirements[id] || false}
                  onChange={() => handleRequiredChange(id)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Required</span>
              </label>
            )}
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
            {step3Fields.includes(id) && ( // Required only if field is selected
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={fieldRequirements[id] || false}
                  onChange={() => handleRequiredChange(id)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Required</span>
              </label>
            )}
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
