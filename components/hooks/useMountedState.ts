import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

export function useMountedState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const setMountedState: Dispatch<SetStateAction<S>> = (value) => {
    if (isMounted.current) {
      setState(value);
    }
  };

  return [state, setMountedState];
}
