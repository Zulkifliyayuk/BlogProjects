import { createContext } from 'react';

type ToggleMenuContextProps = {
  showSheet: boolean;
  handleToggleSheet: () => void;
  setShowSheet: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<ToggleMenuContextProps | undefined>(
  undefined
);
