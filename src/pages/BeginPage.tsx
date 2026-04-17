import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BeginPage = () => {
    const [businessName, setBusinessName] = useState('');

    useEffect(() => {
        try {
            let bname = localStorage.getItem("businessName")
            if (bname) setBusinessName(bname)
        } catch (error) {
            console.log("Business Name Error", error);
        }
    }, [])

    const navigate = useNavigate()
    const deleteAllSavedData = () => {
        try {
            localStorage.clear()
        } catch (error) {
            console.log("deleteAllSavedData Error", error);
        }
    }
    const tutorialpage = () => {
        if(businessName){
            let confirmText = `Starting new will erase all data previously filled for ${businessName}

Are You Sure You Want To Continue?
            `
            if(confirm(confirmText) == true) {
                deleteAllSavedData()
                navigate("/Biz-Sim-V2/tutorial");
            }
            return
        }

        navigate("/Biz-Sim-V2/tutorial");
    };
    const handleContinue = () => {
        // TODO: feat: easyofuse: navigate based on last completed page
        try {
            let tutorialMode = localStorage.getItem("TutorialMode")
            if(tutorialMode!=null && tutorialMode==="true") navigate("/Biz-Sim-V2/tam-calculation");
            else navigate("/Biz-Sim-V2/towards-tam");
        } catch (error) {
            
        }
        
    };

    return (
        <>
            <div className="begin-bg-cover center">
                <button className="btns" onClick={tutorialpage}>START <br /> NEW</button>

                {businessName &&

                    <button className="btns" onClick={handleContinue}>CONTINUE <br /> {businessName}</button>
                }
            </div>
        </>
    );
};

export default BeginPage;
