import React from "react";
import CButton from "../components/CButton";
import {useNavigate} from "react-router-dom";

const BeginPage = () => {
    const navigate= useNavigate()

    const tutorialpage = () => {
        navigate("/Biz-Sim-V2/tutorial");
    };
    return (
        <>
            <div className="begin-bg-cover center">
                <CButton onClick={tutorialpage}>START</CButton>
            </div>
        </>
    );
};

export default BeginPage;
