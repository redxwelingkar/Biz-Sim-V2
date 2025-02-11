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
    top: topOffset || '3vmin', 
    left: '3vmin',
    cursor: 'pointer',
    width: '6vmin', 
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
