import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { StudentHomePage } from "./components/studentdashboard";
import { NavBar } from "./components/navbar"
import TrackApplication from "./components/studentdashboard/trackapplication";
import {  BrowserRouter, Routes, Switch, Route, Link } from "react-router-dom";
import { StudentProfile } from "./components/studentdashboard/studentProfile";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AccountBox />} />
          <Route exact path="/student/home" element={<StudentHomePage />} />
          <Route exact path="/student/trackApplications" element={<TrackApplication />} />
          <Route exact path="/student/myProfile" element={<StudentProfile />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;