import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '../assets/img/back_arrow.png'; // replace with the correct path to your image
import tamButtonImage from '../assets/img/tam-icon.png'; // replace with the correct path to your image
import "../css/backButton.css"

interface BackButtonProps {
  topOffset?: string;
  showtam?: boolean;
}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // slight delay to trigger animation on mount

    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    navigate(-1); // -1 navigates to the previous page
  };

  const backbutton_container: React.CSSProperties = {
    position: 'absolute',
    top: '10vmin',
    left: '3vmin',
    cursor: 'pointer',
    display: 'grid',
    gap: 4
  };


  const backButtonStyle: React.CSSProperties = {
    // position: 'absolute',
    // top: props.topOffset || '3vmin',
    left: '3vmin',
    cursor: 'pointer',
    width: '4.5vmin',
  };

  const tamButtonStyle: React.CSSProperties = {
    // position: 'absolute',
    // top: '18vmin',
    // left: '3vmin',
    cursor: 'pointer',
    width: '4.5vmin',
  };

  
  const buttonText: React.CSSProperties = {
    color: 'white',
    visibility:'hidden'
  };

  return (
    <div style={backbutton_container}>
      <img
        src={backButtonImage}
        alt="Back"
        onClick={handleBackClick}
        style={backButtonStyle}
      />
      {props.showtam ?
        <div className='tamContainer' >
          <img
            src={tamButtonImage}
            alt="Tam"
            style={tamButtonStyle}
          /><span style={buttonText}>Total Addressable Market</span>
        </div>
        : <div></div>}
    </div>
  );
};

export default BackButton;
