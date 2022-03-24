import { createContext, FC, useState } from 'react';

export const ContactContext = createContext({
  registeredAccounts: [] as string[],
  distinctTags: [] as string[],
  setRegisteredAccounts: (val: string[]) => {},
  setDistinctTags: (val: string[]) => {},
});

export const ContactProvider: FC = ({ children }) => {
  const [registeredAccounts, setRegisteredAccounts] = useState<string[]>([]);
  const [distinctTags, setDistinctTags] = useState<string[]>([]);

  const contextValue = { registeredAccounts, setRegisteredAccounts, distinctTags, setDistinctTags };

  return <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>;
};
