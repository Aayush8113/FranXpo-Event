import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterModal.css";
import logo from "../assets/logo/logo.png"; // replace with your logo
import { getApiUrl } from "../utils/api";
const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    state: null,
    city: null,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch states from API
  useEffect(() => {
    fetch(getApiUrl('get-indian-states.php')) // replace with your API
      .then((res) => res.json())
      .then((data) => {
        const stateOptions = data.map((s) => ({ value: s.id, label: s.name }));
        setStates(stateOptions);
      })
      .catch((err) => {
        console.error("Error fetching states:", err);
        toast.error("Failed to load states.");
      });
  }, []);

  // Fetch cities when a state is selected
  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState, city: null });
    if (selectedState) {
     fetch(getApiUrl(`get-cities.php?state_id=${selectedState.value}`))
        .then((res) => res.json())
        .then((data) => {
          const cityOptions = data.map((c) => ({ value: c.id, label: c.name }));
          setCities(cityOptions);
        })
        .catch((err) => {
          console.error("Error fetching cities:", err);
          toast.error("Failed to load cities.");
        });
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (!formData.contact.trim()) return "Contact number is required";
    const contactRegex = /^[6-9][0-9]{9}$/; // must start with 6,7,8,9 and be 10 digits
    if (!contactRegex.test(formData.contact))
      return "Contact must start with 6, 7, 8, or 9 and be 10 digits";
    if (!formData.state) return "Please select a state";
    if (!formData.city) return "Please select a city";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      contact: formData.contact.trim(),
      state_id: formData.state.value,
      city_id: formData.city.value,
      fee: 500,
    };

    fetch("http://localhost/react-api/register-user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(
            "Thank you for registering! Your registration fee is ₹500 (non-refundable)."
          );
          setTimeout(() => {
            onClose();
          }, 2000); // close modal after toast shows
        } else {
          toast.error(data.message || "Registration failed");
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        toast.error("Failed to submit. Please try again.");
      });
  };

  return (
    <div className="register-modal-backdrop">
      <div className="register-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="register-header">
          <img src={logo} alt="Franmax Expo Logo" />
          <h2>Register for Franmax Expo 2025</h2>
        </div>

        <div className="register-benefits">
          <h3>Why Attend?</h3>
          <ul>
            <li>Discover top franchise opportunities</li>
            <li>Meet investors and industry experts</li>
            <li>Learn from keynote speakers and workshops</li>
            <li>Network with decision makers</li>
          </ul>
        </div>

        <div className="registration-fee-note">
          <p>
            <strong>Registration Fee: ₹500</strong> (No refund will be given)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />

          <Select
            options={states}
            value={formData.state}
            onChange={handleStateChange}
            placeholder="Select State"
            className="react-select"
            isClearable
            required
          />

          <Select
            options={cities}
            value={formData.city}
            onChange={handleCityChange}
            placeholder="Select City"
            className="react-select"
            isClearable
            isDisabled={!formData.state}
            required
          />

          <button type="submit" className="register-submit-btn">
            Submit Registration
          </button>
        </form>
      </div>

      {/* Toast container must be rendered once */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default RegisterModal;
