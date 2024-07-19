import React from 'react';

interface SizeProps {
  value: string;
  onChange: (value: string) => void;
}

const Size = ({ value, onChange }: SizeProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
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
    </div>
  );
};

export default Size;
