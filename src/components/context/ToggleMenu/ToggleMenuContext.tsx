import React, { useEffect, useState, type ReactNode } from 'react';
import { MenuContext } from './MenuContext';
import { useMedia } from 'react-use';

export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const isLargeIsh = useMedia('(min-width:768px)', false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    if (isLargeIsh) {
      setShowSheet(false);
    }
  }, [isLargeIsh]);

  const handleToggleSheet = () => {
    setShowSheet((prev) => !prev);
  };

  return (
    <MenuContext.Provider
      value={{ showSheet, handleToggleSheet, setShowSheet }}
    >
      {children}
    </MenuContext.Provider>
  );
};
