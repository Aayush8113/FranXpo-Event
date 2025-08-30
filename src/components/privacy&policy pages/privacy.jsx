import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./Terms.css"; // ✅ import CSS file

export default function Privacy() {
  const privacyText = [
    "At FranmaxIndia, your privacy and the security of your personal information are of utmost importance to us.",
    "This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website and make payments through our integrated payment gateway.",
    "By using our website and payment services, you agree to the terms outlined in this Privacy Policy.",

    // 1. Information We Collect
    "We may collect the following information when you visit our website or make a payment:",
    "Personal Information: Name, Email address, Phone number, Billing and Shipping address (if applicable).",
    "Payment Information: Credit/debit card details, UPI ID, wallet information, net banking details, and transaction details. Note: We do NOT store complete card/payment info; all sensitive data is processed securely by our payment gateway partners (e.g., Razorpay, Paytm).",
    "Non-Personal Information: Browser type and version, IP address, device info, pages visited, and time spent on the website.",

    // 2. How We Use Your Information
    "We use the collected data to process payments securely, confirm orders/transactions, provide customer support, improve our website and services, and comply with legal obligations.",

    // 3. Payment Gateway Security
    "Our payment gateway partners are PCI-DSS compliant and follow industry-standard security protocols to ensure safe payment processing. Your financial data is encrypted during transmission.",

    // 4. Sharing of Information
    "We do not sell, rent, or trade your personal information. We may share your info only with payment gateway providers, legal authorities if required, and trusted third-party service providers (e.g., analytics tools).",

    // 5. Cookies and Tracking
    "We may use cookies and similar technologies to enhance website functionality, remember preferences, and improve user experience. You can manage or disable cookies in your browser settings, but some features may not work properly.",

    // 6. Data Retention
    "We retain your personal data only as long as necessary to complete transactions, comply with legal/tax/accounting obligations, and resolve disputes or enforce agreements.",

    // 7. Your Rights
    "You have the right to access your personal info, request corrections/updates, request deletion (subject to legal obligations), and withdraw consent for marketing communications.",

    // 8. Third-Party Links
    "Our website may contain links to third-party websites. We are not responsible for their privacy practices or content.",

    // 9. Data Security
    "We implement strict technical and organizational measures to safeguard your personal information, including SSL encryption, secure payment gateways, and regular security audits.",

    // 10. Policy Updates
    "We may update this Privacy Policy from time to time. Changes will be posted on this page with the 'Last Updated' date revised accordingly.",

    // 11. Contact Us
    <>
      "For any queries or concerns regarding this Privacy Policy, contact "
      <FaEnvelope className="icon" />
      <a href="mailto:events@franmaxindia.com" className="link">
        events@franmaxindia.com
      </a>
      {" "}

      
      or <br /> <FaPhone className="icon" /> +91 94038 90794
    </>,
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-title">Privacy Policy</h1>
      <ul className="terms-list">
        {privacyText.map((item, index) => (
          <li key={index} className="terms-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
