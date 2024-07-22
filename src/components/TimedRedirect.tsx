import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimedRedirectProps {
  delay: number;
  to: string;
}

const TimedRedirect = ({ delay, to }: TimedRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [delay, navigate, to]);

  return null;
};

export default TimedRedirect;
