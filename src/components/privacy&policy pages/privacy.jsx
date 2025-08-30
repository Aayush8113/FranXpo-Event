import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./Terms.css"; // ✅ you can reuse same CSS

export default function Privacy() {
  const privacyText = [
    "We value your privacy and are committed to protecting your personal information.",
    "Information collected during booking (such as name, contact details, and payment info) is used solely for processing and managing your event participation.",
    "We do not sell, rent, or share your personal information with third parties, except when required by law or to facilitate event services.",
    "Payment transactions are processed securely through Razorpay. We do not store your card or banking details.",
    "We may use your contact details to send you event-related updates, confirmations, or important announcements.",
    "Cookies or similar technologies may be used to improve your browsing experience on our website.",
    <>
      For any privacy-related concerns, contact <FaEnvelope className="icon" />
      <a href="mailto:events@franmaxindia.com" className="link">
        events@franmaxindia.com
      </a>{" "}
      or <FaPhone className="icon" /> +91 94038 90794
    </>,
    "This Privacy Policy may be updated from time to time without prior notice.",
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-title">Privacy Policy</h1>
      <ul className="terms-list">
        {privacyText.map((point, index) => (
          <li key={index} className="terms-item">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
