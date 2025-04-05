import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import Suggestions from "./pages/Suggestions";
import StudyGroups from "./pages/StudyGroups";
import ProtectedRoute from "./components/ProtectedRoute";
import Tutorials from "./pages/Tutorials";
import Connect from "./pages/Connect";
import UserProfile from "./components/UserProfile";
import VideoChat from "./pages/VideoChat";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-white dark:text-white">
            <Navbar />
            <main className="pt-16">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/testimonials" element={<Home />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/video-chat" element={<VideoChat />} />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/suggestions"
                    element={
                      <ProtectedRoute>
                        <Suggestions />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/study-groups/*"
                    element={
                      <ProtectedRoute>
                        <StudyGroups />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile
                          user={{
                            id: "1",
                            email: "user@example.com",
                            fullName: "John Doe",
                            bio: "Software developer and lifelong learner",
                          }}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </main>
            <ChatBot />
            <Footer />
          </div>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
