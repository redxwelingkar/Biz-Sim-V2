import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/BusinessName.css';
import Avatar from '../components/Avatar';
import BackButton from '../components/BackButton';
import TransitionWrapper from '../components/TransitionWrapper'; // Import the new component

function BusinessName() {
  const [businessName, setBusinessName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

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
      <TransitionWrapper delays={[1000, 3000, 4500]}>
        {([showFirstText, showSecondText, showInput]) => (
          <>
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
                {errorMessage && <div className="error-msg">{errorMessage}</div>}
                <button className="looks-good-button" onClick={handleButtonClick}>LOOK'S GOOD</button>
              </div>
            )}
          </>
        )}
      </TransitionWrapper>
      <Avatar />
    </div>
  );
}

export default BusinessName;
