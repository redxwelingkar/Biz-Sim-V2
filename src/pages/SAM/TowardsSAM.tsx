import { useNavigate } from 'react-router-dom';
import '../css/NewPage.css';
import TransitionWrapper from '../../components/TransitionWrapper'; // Import the transition component

function NewPage() {
  const navigate = useNavigate();

  const handleButtonClick1 = () => {
    navigate('/next-page-1'); // Change to the desired path
  };

  const handleButtonClick2 = () => {
    navigate('/next-page-2'); // Change to the desired path
  };

  return (
    <div className="newPage">
      <TransitionWrapper delays={[2000, 4000, 6000]}>
        {([showFirstText, showSecondText, showButtonsAndText]) => (
          <>
            <div className={`text ${showFirstText ? 'fade-in' : ''}`}>
              First text appearing on the top center
            </div>
            {showSecondText && (
              <div className={`text second fade-in`}>
                Second text appearing below the first text
                <button className="main-button" onClick={handleButtonClick1}>Main Button</button>
              </div>
            )}
            {showButtonsAndText && (
              <div className="buttons-section fade-in">
                <button className="option-button" onClick={handleButtonClick1}>Option 1</button>
                <div className="button-text">Text below Option 1</div>
                <button className="option-button" onClick={handleButtonClick2}>Option 2</button>
                <div className="button-text">Text below Option 2</div>
              </div>
            )}
          </>
        )}
      </TransitionWrapper>
    </div>
  );
}

export default NewPage;
