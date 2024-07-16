import React from 'react';
import numberToWords from 'number-to-words';

const NumberToWordsConverter: React.FC = () => {
  const [number, setNumber] = React.useState<number>(0);
  const words = numberToWords.toWords(number);

  return (
    <div>
      <input 
        type="number" 
        value={number} 
        onChange={(e) => setNumber(Number(e.target.value))} 
      />
      <p>{words}</p>
    </div>
  );
};

export default NumberToWordsConverter;