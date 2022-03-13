import React from "react";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Layout> */}
        <Routes>
          <Route index element={<Login />} />
        </Routes>
        {/* </Layout> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
