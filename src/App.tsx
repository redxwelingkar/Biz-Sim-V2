import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "./pages/BeginPage";
import BusinessName from "./pages/BusinessName";
import TotalAddrMarket from "./pages/TAM/TotalAddrMarket";
import TAMCalc from "./pages/TAM/TAMCalculation";
import TowardsSAM from "./pages/SAM/TowardsSAM";
import GreetingsPage from "./pages/GreetingsPage";
import SAMCalc from "./pages/SAM/SAMCalculation";
import TowardsCSP from "./pages/CSP/TowardsCSP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Biz-Sim-V2/" element={<BeginPage/>}/>
          <Route path="/Biz-Sim-V2/tutorial" element={<GreetingsPage/>} />
          <Route path="/Biz-Sim-V2/business-name" element={<BusinessName/>} /> 
          <Route path="/Biz-Sim-V2/towards-tam" element={<TotalAddrMarket/>} />
          <Route path="/Biz-Sim-V2/tam-calculation" element={<TAMCalc/>} />
          <Route path="/Biz-Sim-V2/towards-sam" element={<TowardsSAM/>} />
          <Route path="/Biz-Sim-V2/sam-calculation" element={<SAMCalc/>} /> 
          <Route path="/Biz-Sim-V2/towards-csp" element={<TowardsCSP/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
