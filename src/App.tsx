import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "../pages/BeginPage";
import TutorialToggle from "./pages/TutorialToggle";
import BusinessName from "./pages/BusinessName";
import DomainSelect from "../pages/DomainSelect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Biz-Sim-V2/" element={<BeginPage/>}/>
          <Route path="/Biz-Sim-V2/tutorial" element={<TutorialToggle/>} />
          <Route path="/Biz-Sim-V2/business-name" element={<BusinessName/>} />
          <Route path="/Biz-Sim-V2/domainselect" element={<DomainSelect/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
