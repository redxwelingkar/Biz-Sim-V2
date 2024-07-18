import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TotalAddrMarket.css';
import BackButton from '../../components/BackButton';
import Avatar from '../../components/Avatar';
import TransitionWrapper from '../../components/TransitionWrapper'; // Import the new component

function TotalAddrMarket() {
  const [extraContentVisible, setExtraContentVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    setExtraContentVisible(!extraContentVisible);
  };

  const handleLetsStartClick = () => {
    navigate('/Biz-Sim-V2/tam-calculation');
  };

  return (
    <div className="totalAddrMarket-container">
      <BackButton />
      <TransitionWrapper delays={[1000, 3000]}>
        {([textMoved, contentVisible]) => (
          <>
            <div className={`text ${textMoved ? 'moved' : ''}`}>
              Alright! Lets build your business
            </div>
            {textMoved && contentVisible && (
              <div className="tam-content">
                <div className='p1'>We’ll start with defining and calculating the
                  Total Addressable Market (TAM)</div>
                <div className='p2'>It refers to the maximum size of the opportunity
                  for a particular product or solution. In other words, if every single person who could potentially find value in a product or solution purchased/started using it (i.e. 100% market share), how big would that market be?</div>
                <div className="button-container">
                  <button className="action-button" onClick={handleLearnMoreClick}>
                    {extraContentVisible ? 'Read Less' : 'Learn More'}
                  </button>
                  {extraContentVisible && (
                    <div className="extra">It refers to the maximum size of the opportunity
                      for a particular product or solution.</div>
                  )}
                  <button className="action-button-next" onClick={handleLetsStartClick}>LET'S START</button>
                </div>
              </div>
            )}
          </>
        )}
      </TransitionWrapper>
      <Avatar />
    </div>
  );
}

export default TotalAddrMarket;
