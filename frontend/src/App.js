import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import JobsList from './pages/JobsList';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ContactUs from './pages/ContactUs';
import Layout from './hocs/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="jobs/"
              element={
                <PrivateRoute>
                  <JobsList />
                </PrivateRoute>
              }
            />
            <Route
              path="jobs/:id"
              element={
                <PrivateRoute>
                  <JobDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="addjob/"
              element={
                <PrivateRoute>
                  <AddJob />
                </PrivateRoute>
              }
            />
            <Route path="signup/" element={<SignUp />} />
            <Route path="signin/" element={<SignIn />} />
            <Route path="contactus/" element={<ContactUs />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
