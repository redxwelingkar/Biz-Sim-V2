import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "../components/Avatar";
import Header from "../components/Header";
// import InputText from "../components/InputText";

function BusinessName() {
  const navigate = useNavigate();

  const getStoredName = JSON.parse(localStorage.getItem("biz-name")!);
  const [name, setName] = useState(getStoredName);

  useEffect(()=>{
    localStorage.setItem('biz-name',JSON.stringify(name))    
  },[name]);

  const SaveName = () => {
    navigate("/Biz-Sim-V2/domainselect");
  };

  return (
    <>
      <Header/>
      <div className="full-screen center-column">
        <h1>Alright! I'll be your guide through the simulation</h1>
        <h2>Let's start by naming your business</h2>
        <input
          value={name}
          placeholder="Enter the name for your business here..."
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={SaveName}> LOOK'S GOOD</button>

        <Avatar />
      </div>
    </>
  );
}

export default BusinessName;
