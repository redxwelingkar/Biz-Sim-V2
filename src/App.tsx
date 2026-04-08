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
import CSP from "./pages/CSP/CSP";
import TowardsSOM from "./pages/SOM/TowardsSOM";
import SOM from "./pages/SOM/SOM";
import TowardsOpEx from "./pages/OpEx/TowardsOpEx";
import OpEx from "./pages/OpEx/OpEx-Calulation";
import TowardsCapEx from "./pages/CapEx/TowardsCapEx";
import CapEx from "./pages/CapEx/CapExCalculation";
import TowardsEBT from "./pages/EBT/TowardsEBT";

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
          <Route path="/Biz-Sim-V2/csp" element={<CSP/>} /> 
          <Route path="/Biz-Sim-V2/towards-som" element={<TowardsSOM/>} /> 
          <Route path="/Biz-Sim-V2/som" element={<SOM/>} /> 
          <Route path="/Biz-Sim-V2/towards-opex" element={<TowardsOpEx/>} /> 
          <Route path="/Biz-Sim-V2/opex-calculation" element={<OpEx/>} /> 
          <Route path="/Biz-Sim-V2/towards-capex" element={<TowardsCapEx/>} /> 
          <Route path="/Biz-Sim-V2/capex-calculation" element={<CapEx/>} /> 
          <Route path="/Biz-Sim-V2/towards-ebt" element={<TowardsEBT/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
