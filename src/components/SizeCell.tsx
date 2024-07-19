import React from 'react';
import numberToWords from 'number-to-words';

interface SizeProps {
  value: string;
  onChange: (value: string) => void;
}

const Size = ({ value, onChange }: SizeProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const convertNumberToWords = (num: number): string => {
    return numberToWords.toWords(num);
  };

  return (
    <div className="size-cell">
      <input
        type="number"
        placeholder="Enter Value"
        value={value}
        onChange={handleInputChange}
        style={{ textAlign: value ? 'right' : 'left' }} // Align right when value is entered
      />
      <span>{value ? convertNumberToWords(parseInt(value)) : ''}</span>
    </div>
  );
};

export default Size;
