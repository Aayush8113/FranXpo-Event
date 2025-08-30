import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./Terms.css"; // ✅ import CSS file

export default function Terms() {
  const termsText = [
    "All bookings are subject to availability and confirmation.",
    "Full payment must be made at the time of booking through Razorpay.",
    "Payments are strictly non-refundable and non-transferable under any circumstances.",
    "The organizer reserves the right to change, postpone, or cancel the event due to unforeseen circumstances. In such cases, alternative arrangements may be communicated.",
    // "The customer is responsible for any additional expenses such as food, travel, and accommodation unless explicitly mentioned.",
    "Entry may be denied to anyone misbehaving or violating event rules without any refund.",
    <>
      For any queries or dispute resolution, contact <FaEnvelope className="icon" />
      <a href="mailto:events@franmaxindia.com" className="link">
        events@franmaxindia.com
      </a>{" "}
      or <FaPhone className="icon" /> +91 94038 90794
    </>,
    "The organizer reserves the right to update these Terms & Conditions at any time without prior notice.",
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <ul className="terms-list">
        {termsText.map((term, index) => (
          <li key={index} className="terms-item">
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
}
