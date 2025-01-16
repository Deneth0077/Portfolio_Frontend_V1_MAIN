import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import Footer from "./pages/miniComponents/Footer";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/Background";


function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AnimatePresence mode="wait">
          {showWelcome && (
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          )}
        </AnimatePresence>

        {!showWelcome && (
      
          <>
     
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectView />} />
            </Routes>
       
            <Footer />
          </>
        )}

        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
