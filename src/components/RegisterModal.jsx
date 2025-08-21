import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterModal.css";
import logo from "../assets/logo/logo.png";
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
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await fetch(getApiUrl("get-indian-states.php"));
        const data = await res.json();
        setStates(data.map((s) => ({ value: s.id, label: s.name })));
      } catch (err) {
        toast.error("Failed to load states.");
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.state) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      try {
        const res = await fetch(
          getApiUrl(`get-cities.php?state_id=${formData.state.value}`)
        );
        const data = await res.json();
        setCities(data.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        toast.error("Failed to load cities.");
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [formData.state]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleStateChange = (selected) =>
    setFormData({ ...formData, state: selected, city: null });
  const handleCityChange = (selected) =>
    setFormData({ ...formData, city: selected });

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (!formData.contact.trim()) return "Contact number is required";
    const contactRegex = /^[6-9][0-9]{9}$/;
    if (!contactRegex.test(formData.contact))
      return "Contact must start with 6,7,8,9 and be 10 digits";
    if (!formData.state) return "Please select a state";
    if (!formData.city) return "Please select a city";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("You must accept the Terms and Conditions to proceed.");
      return;
    }

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(getApiUrl("validate-user.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          contact: formData.contact.trim(),
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.exists) toast.error(data.message);
      else {
        toast.success(data.message);
        startPayment();
      }
    } catch (err) {
      setLoading(false);
      toast.error("Server error while validating user.");
      console.error(err);
    }
  };

  const startPayment = () => {
    const amount = 499;
    const apiKey = "rzp_live_R6nEN2n0JyWlrV";
    const options = {
      key: apiKey,
      amount: amount * 100,
      currency: "INR",
      name: "FRANMAX INDIA",
      description: "Registration Payment",
      image: "http://franmaxindia.com/images/icon.png",
      theme: { color: "#156beb" },
      handler: function (response) {
        saveRegistration(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveRegistration = async (paymentId) => {
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        contact: formData.contact.trim(),
        state_id: formData.state.value,
        city_id: formData.city.value,
        fee: 499,
        payment_id: paymentId,
      };
      const res = await fetch(getApiUrl("register-user.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Registration successful!");
        setTimeout(() => onClose(), 2000);
      } else toast.error(data.message || "Registration failed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save registration.");
    }
  };

  // Terms content
  const termsText = [
    "Payment Purpose: The payment collected covers only the visiting charges. Food, accommodation, travel, and additional services are NOT included.",
    "Non-Refundable Payment: Once paid, it is non-refundable unless specified in writing.",
    "Confirmation of Services: Your booking is confirmed only after successful payment through Razorpay.",
    "Additional Costs: Any extra costs during the visit will be borne by the customer.",
    "Payment Security: All payments are secure via Razorpay. We do not store card/payment details.",
    <>
      Dispute Resolution: Contact us at <FaEnvelope />{" "}
      <a href="mailto:events@franmaxindia.com">events@franmaxindia.com</a> or{" "}
      <a href="tel:+91" className="no-link-style">
        <FaPhone /> +91 81400 58080
      </a>
    </>,
    "Right to Amend: We may update these terms at any time without prior notice.",
  ];

  return (
    <>
      <div className="modal-overlay">
        <div className="modal register-modal">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>

          <div className="modal-header">
            <img src={logo} alt="Franmax Expo Logo" className="company-logo" />
            <h2>Register for Franmax Expo 2025</h2>
            <p className="subtitle">Secure your spot today</p>
          </div>

          <div className="benefits-section">
            <h3>Why Attend?</h3>
            <ul>
              <li>Discover top franchise opportunities</li>
              <li>Meet investors and industry experts</li>
              <li>Learn from keynote speakers and workshops</li>
              <li>Network with decision makers</li>
            </ul>
          </div>

          {loading && <p className="loading-text">Processing...</p>}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
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
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <Select
                options={states}
                value={formData.state}
                onChange={handleStateChange}
                isLoading={loadingStates}
                placeholder="Select State"
                isClearable
              />
              <Select
                options={cities}
                value={formData.city}
                onChange={handleCityChange}
                isLoading={loadingCities}
                placeholder="Select City"
                isDisabled={!formData.state}
                isClearable
              />
            </div>

            {/* Terms Checkbox */}
            <div className="form-row terms">
              <label>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                I agree to the{" "}
                <span
                  className="terms-link"
                  onClick={() => setTermsModalOpen(true)}
                  style={{
                    color: "#ff6b00",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!termsAccepted}
            >
              Submit & Pay ₹499
            </button>
          </form>
        </div>
      </div>

      {/* Terms Modal */}
      {termsModalOpen && (
        <div className="modal-overlay">
          <div className="modal terms-modal">
            <button
              className="close-btn"
              onClick={() => setTermsModalOpen(false)}
            >
              &times;
            </button>
            <h2>Terms & Conditions</h2>
            <div className="terms-content">
              <ul>
                {termsText.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-left" autoClose={3000} hideProgressBar />
    </>
  );
};

export default RegisterModal;
