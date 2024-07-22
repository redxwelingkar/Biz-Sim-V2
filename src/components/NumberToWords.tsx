import numberToWords from 'number-to-words';

interface NumberToWordsProps {
  value: string;
}

const NumberToWords = ({ value }: NumberToWordsProps) => {
  if (!value) return null;

  const words = numberToWords.toWords(parseInt(value, 10));
  const capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1);

  return <span>{capitalizedWords}</span>;
};

export default NumberToWords;
