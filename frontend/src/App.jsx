import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import LeadDetailsPage from "./pages/LeadDetailsPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/lead/:id" element={<LeadDetailsPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
