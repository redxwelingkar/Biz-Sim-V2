import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/GreetingsPage.css';
import Avatar from '../components/Avatar'; 
import BackButton from '../components/BackButton';

function GreetingsPage() {
  const [showFirstText, setShowFirstText] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showButtonsAndImage, setShowButtonsAndImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFirstText(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowSecondText(true);
    }, 2000);

    const timer3 = setTimeout(() => {
      setShowButtonsAndImage(true);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleYesClick = () => {
    navigate('/Biz-Sim-V2/business-name'); 
  };

  const handleNoClick = () => {
    navigate('/'); 
  };

  return (
    <div className="greetingsPage">
      <BackButton />
      <div className={`text ${showFirstText ? 'show' : ''}`}>Hi! Welcome to Business Simulation</div>
      <div className={`text second ${showSecondText ? 'show' : ''}`}>Do you want tutorials to guide you?</div>
      {showButtonsAndImage && (
        <div className="buttons">
          <button className="choose-button" onClick={handleYesClick}>YES</button>
          <button className="choose-button" onClick={handleNoClick}>NO</button>
          <Avatar />
        </div>
      )}
    </div>
  );
}

export default GreetingsPage;
