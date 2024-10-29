import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import BoardPage from "./pages/BoardPage";
import WritePage from "./pages/WritePage";
import BoardDetailPage from "./pages/BoardDetailPage";
import BoardUpdatePage from "pages/BoardUpdatePage";
import Header from "Layout/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/board/:id" element={<BoardDetailPage />} />
        <Route path="/update/:id" element={<BoardUpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
