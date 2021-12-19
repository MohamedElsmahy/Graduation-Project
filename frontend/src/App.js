import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Blog from "./pages/Blog";
import JobsList from "./pages/JobsList";
import AddJob from "./pages/AddJob";
import ApplyJob from "./pages/ApplyJob";
import AddPost from "./pages/AddPost";
import JobDetails from "./pages/JobDetails";
import PostDetails from "./pages/PostDetails";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ContactUs from "./pages/ContactUs";
import Layout from "./hocs/Layout";
import PrivateRoute from "./components/PrivateRoute";
import User from "./pages/profile";


function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                //<PrivateRoute>
                <JobsList />
                //</PrivateRoute>
              }
            />
            <Route
              path="blog/"
              element={
                //<PrivateRoute>
                  <Blog />
                //</PrivateRoute>
              }
            />
            <Route
              path="job/:id/"
              element={
                //<PrivateRoute>
                  <JobDetails />
                //</PrivateRoute>
              }
            />
            <Route
              path="addjob/"
              element={
                //<PrivateRoute>
                  <AddJob />
                //</PrivateRoute>
              }
            />
            <Route
              path="profile/"
              element={
                //<PrivateRoute>
                  <User />
                //</PrivateRoute>
              }
            />
            <Route
              path="posts/:id/"
              element={
                //<PrivateRoute>
                  <PostDetails />
                //</PrivateRoute>
              }
            />
            <Route
              path="posts/add/"
              element={
              //  <PrivateRoute>
                  <AddPost />
                //</PrivateRoute>
              }
            />
            <Route path="signup/" element={<SignUp />} />
            <Route path="signin/" element={<SignIn />} />
            <Route path="contactus/" element={<ContactUs />} />
            <Route path="applyjob/" element={<ApplyJob />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
