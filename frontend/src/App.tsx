import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./login/page";
import HomePage from "./home/page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
