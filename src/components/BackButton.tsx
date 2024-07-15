import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '../assets/img/back_arrow.png'; // replace with the correct path to your image

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // -1 navigates to the previous page
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

const backButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '30px',
  left: '30px',
  cursor: 'pointer',
  width: '50px', // adjust as needed
  height: '50px', // adjust as needed
};

export default BackButton;
