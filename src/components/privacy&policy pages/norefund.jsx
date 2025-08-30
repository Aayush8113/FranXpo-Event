import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./Terms.css"; // ✅ reuse same CSS styling

export default function NoRefundPolicy() {
  const noRefundText = [
    "All payments made for bookings are final and strictly non-refundable.",
    "Once a booking is confirmed and payment is processed, no cancellations or refunds will be entertained under any circumstances.",
    "Payments cannot be transferred to another person, event, or future booking.",
    "In case of no-show or inability to attend, the customer will not be eligible for any refund or credit.",
    "If the event is rescheduled or postponed by the organizer, the booking will remain valid for the new date, but no refunds will be issued.",
    "Refunds will only be considered if explicitly mentioned in writing by the organizer for a specific case.",
    <>
      For any clarification regarding this policy, contact <FaEnvelope className="icon" />
      <a href="mailto:events@franmaxindia.com" className="link">
        events@franmaxindia.com
      </a>{" "}
      or <FaPhone className="icon" /> +91 94038 90794
    </>,
    "The organizer reserves the right to modify this No Refund Policy at any time without prior notice.",
  ];

  return (
    <div className="terms-container">
      <h1 className="terms-title">No Refund Policy</h1>
      <ul className="terms-list">
        {noRefundText.map((point, index) => (
          <li key={index} className="terms-item">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
