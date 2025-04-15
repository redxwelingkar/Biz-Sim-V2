import React from 'react';
import whiteCross from "../assets/img/white_cross.png";
interface SizeProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_SIZE = 1e16; // Define a maximum size limit

const Size = ({ value, onChange }: SizeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Prevent entering values larger than MAX_SIZE
    if (parseFloat(newValue) <= MAX_SIZE || newValue === '') {
      onChange(newValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      e.target.classList.add('blurred');
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove('blurred');
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="cell">
      <input
        type="number"
        placeholder="Enter Value"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={value ? 'value-entered' : ''}
      />
      {/* {value && <span onClick={handleClear} className="clear-icon clear-icon-left"><img className='whitecross' src={whiteCross} alt="X" /></span>} */}
      {value && <span onClick={handleClear} className="clear-icon clear-icon-left">x</span>}

    </div>
  );
};

export default Size;
