import {createContext, useContext} from 'react';

export type ResponsiveDialogContextProps = {
  alert?: boolean;
  modal?: boolean;
  onlyDrawer?: boolean;
  onlyDialog?: boolean;
  dismissible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left';
};

export type ResponsiveDialogProviderProps = {
  children: React.ReactNode;
} & ResponsiveDialogContextProps;

export const ResponsiveDialogContext = createContext<ResponsiveDialogContextProps | null>(null);

export const ResponsiveDialogProvider = ({
  modal = true,
  dismissible = true,
  direction = 'bottom',
  onlyDrawer = false,
  onlyDialog = false,
  alert = false,
  children,
}: ResponsiveDialogProviderProps) => {
  return (
    <ResponsiveDialogContext.Provider value={{ modal, dismissible, direction, onlyDrawer, onlyDialog, alert }}>
      {children}
    </ResponsiveDialogContext.Provider>
  );
};

export const useResponsiveDialog = () => {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error('useResponsiveDialog must be used within a <ResponsiveDialog/>');
  }
  return context;
};
