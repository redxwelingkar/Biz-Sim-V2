import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BusinessName.css';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';

function BusinessName() {
    const [showFirstText, setShowFirstText] = useState(false);
    const [showSecondText, setShowSecondText] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowFirstText(true);
        }, 1000);

        const timer2 = setTimeout(() => {
            setShowSecondText(true);
        }, 3000);

        const timer3 = setTimeout(() => {
            setShowInput(true);
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const handleButtonClick = () => {
        if (businessName.trim() === '') {
            setErrorMessage('Please provide a name for your business.');
        } else {
            localStorage.setItem('businessName', businessName);
            setErrorMessage('');
            navigate('/Biz-Sim-V2/towards-tam'); 
        }
    };

    return (
        <div className="businessName-container">
            <BackButton />
            <div className={`first-text ${showFirstText ? 'slide-up' : ''} ${showSecondText ? 'slide-up-more' : ''}`}>
                Alright! I’ll be your guide through the simulation
            </div>
            <div className={`second-text ${showSecondText ? 'slide-up-normal' : ''}`}>
                Let’s start by naming your business
            </div>
            {showInput && (
                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Enter the name for your business here"
                        className="name-input"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button className="looks-good-button" onClick={handleButtonClick}>LOOK'S GOOD</button>
                </div>
            )}
            <Avatar />
        </div>
    );
}

export default BusinessName;
