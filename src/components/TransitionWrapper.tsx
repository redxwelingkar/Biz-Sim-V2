import { useState, useEffect, ReactNode } from 'react';

interface TransitionWrapperProps {
  delays: number[];
  children: (visibleStates: boolean[]) => ReactNode;
}

function TransitionWrapper({ delays, children }: TransitionWrapperProps) {
  const [visibleStates, setVisibleStates] = useState<boolean[]>(Array(delays.length).fill(false));

  useEffect(() => {
    const timers = delays.map((delay, index) =>
      setTimeout(() => {
        setVisibleStates((prev) => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [delays]);

  return <>{children(visibleStates)}</>;
}

export default TransitionWrapper;
