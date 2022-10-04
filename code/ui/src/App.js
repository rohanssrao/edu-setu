import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { StudentHomePage } from "./components/studentdashboard";
import { NavBar } from "./components/navbar"

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
      {/*<AccountBox />*/}
      <NavBar/>
      <StudentHomePage/>
    </AppContainer>
  );
}

export default App;