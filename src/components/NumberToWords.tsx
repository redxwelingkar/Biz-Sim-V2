import numberToWords from 'number-to-words';

interface NumberToWordsProps {
  value: string;
}

const NumberToWords = ({ value }: NumberToWordsProps) => {
  if (!value) return "NIL";
  let words, capitalizedWords
  try {
    words = numberToWords.toWords(parseInt(value, 10));
  } catch (error) {

    // window.alert(`Error in Numbers to Words`)
    console.error(error);

  }
  if (words) {
    capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1);
  }

  return <span className='NumberToWords'>{capitalizedWords}</span>;

};

export default NumberToWords;
