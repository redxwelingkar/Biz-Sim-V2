import { useNavigate } from 'react-router-dom';
import '../css/GreetingsPage.css';
import Avatar from '../components/Avatar'; 
import BackButton from '../components/BackButton';
import TransitionWrapper from '../components/TransitionWrapper'; // Import the new component
import CustomButton from '../components/CustomButton';

function GreetingsPage() {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/Biz-Sim-V2/business-name'); 
  };

  const handleNoClick = () => {
    navigate('/Biz-Sim-V2/'); 
  };

  return (
    <div className="greetingsPage">
      <BackButton />
      <TransitionWrapper delays={[1000, 2000, 3500]}>
        {([showFirstText, showSecondText, showButtonsAndImage]) => (
          <>
            <div className={`text ${showFirstText ? 'show' : ''}`}>Hi! Welcome to Business Simulation</div>
            <div className={`text second ${showSecondText ? 'show' : ''}`}>Do you want tutorials to guide you?</div>
            {showButtonsAndImage && (
              <div className="buttons">
                <button className="choose-button" onClick={handleYesClick}>YES</button>
                <button className="choose-button" onClick={handleNoClick}>NO</button>
                {/* <CustomButton text='Custom'></CustomButton> */}
                <Avatar />
              </div>
            )}
          </>
        )}
      </TransitionWrapper>
    </div>
  );
}

export default GreetingsPage;
