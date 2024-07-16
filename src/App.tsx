import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "./pages/BeginPage";
import TutorialToggle from "./pages/GreetingsPage";
import BusinessName from "./pages/BusinessName";
import TotalAddrMarket from "./pages/TAM/TotalAddrMarket";
import TAMCalc from "./pages/TAM/TAMCalc";
import TowardsSAM from "./pages/TowardsSAM";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Biz-Sim-V2/" element={<BeginPage/>}/>
          <Route path="/Biz-Sim-V2/tutorial" element={<TutorialToggle/>} />
          <Route path="/Biz-Sim-V2/business-name" element={<BusinessName/>} />
          <Route path="/Biz-Sim-V2/total-addressable-market" element={<TotalAddrMarket/>} />
          <Route path="/Biz-Sim-V2/tam-calculation" element={<TAMCalc/>} />
          <Route path="/Biz-Sim-V2/towards-sam" element={<TowardsSAM/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
