import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '../assets/img/back_arrow.png'; // replace with the correct path to your image

interface BackButtonProps {
  topOffset?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ topOffset }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // -1 navigates to the previous page
  };

  const backButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: topOffset || '1.75vw', // use the prop or default to 30px
    left: '1.75vw',
    cursor: 'pointer',
    width: '3.5vw', // adjust as needed
  };

  return (
    <img
      src={backButtonImage}
      alt="Back"
      onClick={handleBackClick}
      style={backButtonStyle}
    />
  );
};

export default BackButton;
