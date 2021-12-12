import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import JobsList from "./pages/JobsList";
import JobDetails from "./pages/JobDetails";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="jobs/" element={<JobsList />} />
          <Route path="jobs/:id" element={<JobDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
