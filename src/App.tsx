import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "../pages/BeginPage";
import TutorialToggle from "../pages/TutorialToggle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Biz-Sim-V2/" element={<BeginPage/>}/>
          <Route path="/Biz-Sim-V2/tutorial" element={<TutorialToggle/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
