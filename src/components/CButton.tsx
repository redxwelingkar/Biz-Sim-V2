import * as React from "react";


// Define the props interface for the CButton component
interface CButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CButton: React.FC<CButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

// const CButton: React.FC<CButtonProps> = ({ onClick, text }) => {
//   return <button onClick={onClick}><span> {text}</span></button>;
// };


export default CButton;
