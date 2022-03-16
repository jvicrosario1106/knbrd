import React from "react";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import Projects from "./pages/Projects";

const App = () => {
  const users = JSON.parse(localStorage.getItem("user"));
  const { isSuccess } = useSelector((state) => state.authReducer);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              index
              element={users || isSuccess ? <HomePage /> : <Login />}
            />

            <Route path="/project">
              <Route path=":id" element={<Projects />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
