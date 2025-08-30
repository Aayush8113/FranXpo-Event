import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import RegisterModal from "./components/RegisterModal";
import BookingModal from "./components/BookingModal";
import Terms from "./components/privacy&policy pages/terms.jsx"; // ✅ import your Terms page
import Privacy from "./components/privacy&policy pages/privacy.jsx"; // ✅ import your Privacy page
import NoRefund from "./components/privacy&policy pages/norefund.jsx"; // ✅ import your Norefund page
import Footer from "./components/Footer"; // ✅ import Footer
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-container">
        <Routes>
          {/* Default route for homepage */}
          <Route path="/" element={<Homepage />} />

          {/* New route for investor page */}
          <Route path="/investor" element={<RegisterModal />} />
          <Route path="/brand" element={<BookingModal />} />

          {/* ✅ New route for terms page */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/norefund" element={<NoRefund />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
