import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "./pages/BeginPage";
import BusinessName from "./pages/BusinessName";
import TotalAddrMarket from "./pages/TAM/TotalAddrMarket";
import TAMCalc from "./pages/TAM/TAMCalculation";
// import TowardsSAM from "./pages/TowardsSAM";
import GreetingsPage from "./pages/GreetingsPage";

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
          {/* <Route path="/Biz-Sim-V2/towards-sam" element={<TowardsSAM/>} /> */} 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
