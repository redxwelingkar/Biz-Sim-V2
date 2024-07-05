import React, { useState } from 'react';
import './Footer.css'; 
//import UpArrow from '../src/assets/img/upward_arrow.png'; 
//import DownArrow from '../src/assets/img/downward_arrow.png'; 
import Avatar from './Avatar'; 
const Footer: React.FC = () => {
    const [displayText, setDisplayText] = useState("Initial Text");

    const handleUpArrowClick = () => {
        setDisplayText("Previous Text");
    };

    const handleDownArrowClick = () => {
        setDisplayText("Another Text");
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <Avatar />
                </div>
                <div className="footer-middle">
                    <p className="footer-text">{displayText}</p>
                </div>
                <div className="footer-right">
                    <button className="footer-icon" onClick={handleUpArrowClick}>
                        {/* <UpArrow /> */}
                    </button>
                    <button className="footer-icon" onClick={handleDownArrowClick}>
                        {/* <DownArrow /> */}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
