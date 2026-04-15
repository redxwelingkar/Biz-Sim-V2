import {useNavigate} from "react-router-dom";

const BeginPage = () => {
    const navigate= useNavigate()

    const tutorialpage = () => {
        navigate("/Biz-Sim-V2/tutorial");
    };
    return (
        <>
            <div className="begin-bg-cover center">
                <button className="btns" onClick={tutorialpage}>START</button>
                {/* <button className="btns" onClick={tutorialpage}>CONTINUE</button> */}
            </div>
        </>
    );
};

export default BeginPage;
