import { useNavigate } from 'react-router-dom';
import backButtonImage from '../assets/img/back_arrow.png'; // replace with the correct path to your image
import "../css/backButton.css"

interface BackButtonProps {
  topOffset?: string;
  showtam?: boolean;
}

const BackButton: React.FC<BackButtonProps> = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // -1 navigates to the previous page
  };
  const handleForwardClick = () => {
    navigate(+1); // +1 navigates to the foward page
  };

  return (
    <div className='backbutton_container'>
      <img
        src={backButtonImage}
        alt="Back"
        onClick={handleBackClick}
        className='backButtonStyle'
      />
      <img
        src={backButtonImage}
        alt="Forward"
        onClick={handleForwardClick}
        className='forwardButtonStyle'
      />
      {/* {props.showtam ?
        <div className='tamContainer' >
          <img
            src={tamButtonImage}
            alt="Tam"
            className='tamButtonStyle'
          />
          <span className='buttonText'>Total Addressable Market</span>
        </div>
        : <div></div>} */}
    </div>
  );
};

export default BackButton;
