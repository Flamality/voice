import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./landing/Landing";
import Questionnaire from "./questionnaire/Questionnaire";
import Dashboard from "./dashboard/Dashboard";

export default function PageRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/:id' element={<Questionnaire />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
