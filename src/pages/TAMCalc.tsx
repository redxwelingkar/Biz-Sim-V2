import { useState } from 'react';
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import MainTable from "../components/MainTable";
import BackButton from "../components/BackButton";
import '../css/MainTable.css';

const TAMCalc = () => {
  const [showMainTable, setShowMainTable] = useState(false);

  const handleNext = () => {
    setShowMainTable(true);
  };

  return (
    <div className="tam-calc">
      <Header />
      <BackButton />
      <h1 style={{ textAlign: 'center', color: 'white' }}>Total Addressable Market</h1>
      {showMainTable && (
        <main className="content">
          <MainTable />
        </main>
      )}
      <Footer onNext={handleNext} />
    </div>
  );
};

export default TAMCalc;
