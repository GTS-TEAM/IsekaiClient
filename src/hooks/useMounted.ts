import React from 'react';

export const useMounted = (): boolean => {
  const [isMounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return isMounted;
};
