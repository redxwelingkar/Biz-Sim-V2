import React from 'react';
import '../css/CustomButton.css'

// Define the interface for the props
interface CustomButtonProps {
    text: string;         // Text to display on the button

    onClick?: () => void;  // Optional onClick handler
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
    return (
        <button className='custombutton'
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;
