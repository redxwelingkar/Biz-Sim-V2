import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BeginPage from "./pages/BeginPage";
import BusinessName from "./pages/BusinessName";
import TotalAddrMarket from "./pages/TAM/TotalAddrMarket";
import TAMCalc from "./pages/TAM/TAMCalculation";
import TowardsSAM from "./pages/SAM/TowardsSAM";
import GreetingsPage from "./pages/GreetingsPage";
import SAMCalc from "./pages/SAM/SAMCalculation";
import TowardsIntendedPricing from "./pages/IntendedPricing/TowardsIntendedPricing";
import IntendedPricing from "./pages/IntendedPricing/IntendedPricing";
import TowardsSOM from "./pages/SOM/TowardsSOM";
import SOM from "./pages/SOM/SOM";
import TowardsOpEx from "./pages/OpEx/TowardsOpEx";
import OpEx from "./pages/OpEx/OpEx-Calulation";
import TowardsCapEx from "./pages/CapEx/TowardsCapEx";
import CapEx from "./pages/CapEx/CapExCalculation";
import TowardsEBT from "./pages/EBT_WC/TowardsEBT";
import EBT_WC from "./pages/EBT_WC/EBT_WC";
import TowardsFunding from "./pages/Funding/TowardsFunding";
import Funding from "./pages/Funding/Funding";
import Dashboard from "./pages/Dashboard/Dashboard";
import OpEx_EMIDisplay from "./pages/OpEx/OpEx-EMIDisplay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Biz-Sim-V2/" element={<BeginPage />} />
          <Route path="/Biz-Sim-V2/tutorial" element={<GreetingsPage />} />
          <Route path="/Biz-Sim-V2/business-name" element={<BusinessName />} />
          <Route path="/Biz-Sim-V2/towards-tam" element={<TotalAddrMarket />} />
          <Route path="/Biz-Sim-V2/tam-calculation" element={<TAMCalc />} />
          <Route path="/Biz-Sim-V2/towards-sam" element={<TowardsSAM />} />
          <Route path="/Biz-Sim-V2/sam-calculation" element={<SAMCalc />} />
          <Route path="/Biz-Sim-V2/towards-IntendedPricing" element={<TowardsIntendedPricing />} />
          <Route path="/Biz-Sim-V2/IntendedPricing" element={<IntendedPricing />} />
          <Route path="/Biz-Sim-V2/towards-som" element={<TowardsSOM />} />
          <Route path="/Biz-Sim-V2/som" element={<SOM />} />
          <Route path="/Biz-Sim-V2/towards-opex" element={<TowardsOpEx />} />
          <Route path="/Biz-Sim-V2/opex-calculation" element={<OpEx />} />
          <Route path="/Biz-Sim-V2/towards-capex" element={<TowardsCapEx />} />
          <Route path="/Biz-Sim-V2/capex-calculation" element={<CapEx />} />
          <Route path="/Biz-Sim-V2/towards-ebt-wc" element={<TowardsEBT />} />
          <Route path="/Biz-Sim-V2/EBT_WC-calculation" element={<EBT_WC />} />
          <Route path="/Biz-Sim-V2/towards-funding" element={<TowardsFunding />} />
          <Route path="/Biz-Sim-V2/funding" element={<Funding />} />
          <Route path="/Biz-Sim-V2/opex-EMIdisplay" element={<OpEx_EMIDisplay />} />
          <Route path="/Biz-Sim-V2/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


/* 
TODO: Delete below Template
<div>
{TutorialMode ?
  // TutorialMode=True
  <div></div>
  :
  // TutorialMode=False
  <div></div>}
</div>

Done Fix: after you click continue on begin page you cannot move forward in tutorial mode
Done Grammar and Text: Begin Page Button text = "LOOKS GOOD"
Done Grammar and Text: Footer Text for Nav Icon adding = "icon has been added."
Done Grammar and Text: TAM Page Footer text = there in TAR, → To estimate the TAM...
Done Grammar and Text: TAM Page Header text = Estimate the Total Adds Market TAM, same for SAM pages
Done Grammar and Text: TAM Page Footer text = right side bar ⇒ left side bar
Done Grammar and Text: CSP Page Header text = Header → Intended pricing
Done Grammar and Text: CSP Page text = Monthly Exp by SAM → Monthy Revenue from SAM
Done Grammar and Text: SOM Page text = Month → Yearly som
Done Grammar and Text: SOM Page text = Monthly revenue from Customer
Done Grammar and Text: OPEX Page Footer text = text ⇒ as an when ⇒ as and when
Done Grammar and Text: EBT towards text = "system" ⇒ simulation
TODO Grammar and Text: Remove technical jargain but keep in Footer.


// TODO Bugs: CSP Page = Next button disappear after its job is done on 
// TODO Bugs: OPEX Page = Number to words spacing for total OPEX
// TODO Bugs: Funding Page = Combine interest payable and Monthly Principal Repayment => Interest + Principal Repayment
// TODO Bugs: Funding Page = Rduced the size of cells, minimum width should be width of Header of the column.
// TODO Bugs: Dashboard Page = check interdependency of calculations, any change & should reflect on all pages.
TODO Bugs: All Pages = add space at the bottom of last element on the page to compensate for the footer on small screens.
// TODO Bugs: Towards SOM Pages = YES / NO


TODO Feature: All Pages = remove up and down arrows from text boxes
TODO Feature: Towards Pages = don't show blank pages ⇒ keep text or something on screen at' all times
TODO Feature: Disable Autofill on all text boxes or limit to origin (domain)
TODO Feature: Number to words should be sidebyside with number cell always
TODO Feature: keep Blinking the down arrow 'All times
TODO Feature: Enter Button on Keyboard will do something as down arrow
Doing Feature: Remove Forward & Backward Button ⇒ Navigation Buttons persist all pages, completed step nav-icon glows
// TODO Feature: Funding Page = show Number to words on Borrowed Amount Cells
TODO Feature: Funding Page = Show funds needed on the funding page. related it with the Borrowed amount (reduce needed funds as you fill funding rows)
TODO Feature: Funding Page = Total funding Number towards below Member text
// TODO Feature: Funding Page = Add number to Text Column on right side of "Borrowed amount" column
Done Feature: Change CSP to Intended Pricing


*/