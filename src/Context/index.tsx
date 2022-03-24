import { ethers, Wallet } from 'ethers';
import { createContext, FC, useEffect, useState } from 'react';

interface AccountContextProps {
  account: ethers.Wallet | null;
  provider: ethers.providers.Web3Provider | null;
  isLoading: boolean;
  connectWallet: () => void;
}
export const AccountContext = createContext({
  account: null,
  connectWallet: () => {},
  isLoading: true,
  provider: null,
} as AccountContextProps);

const AccountProvider: FC = (props) => {
  const [currentAccount, setCurrentAccount] = useState<Wallet | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ethereum = window.ethereum;

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return;
      } else {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
          const account = accounts[0];
          setCurrentAccount(account);
          setProvider(new ethers.providers.Web3Provider(ethereum));
        }
      }
    } catch (error) {}
  };

  const connectWalletAction = async () => {
    setIsLoading(true);
    try {
      if (!ethereum) {
        alert('Get MetaMask! https://metamask.io/download.html');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      setProvider(new ethers.providers.Web3Provider(ethereum));
    } catch (error) {}

    setIsLoading(false);
  };

  const AccountChangeHandler = () => {
    // detect account address change
    ethereum.on('accountsChanged', function (accounts: Wallet[]) {
      setCurrentAccount(accounts[0]);
    });

    // detect Network account change
    ethereum.on('networkChanged', function () {
      window.location.reload();
    });

    return () => {
      ethereum.removeAllListeners();
    };
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
    setIsLoading(false);

    const cleanup = AccountChangeHandler();

    return cleanup;
  }, [ethereum]);

  return (
    <AccountContext.Provider
      value={{
        account: currentAccount,
        connectWallet: connectWalletAction,
        isLoading,
        provider,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
