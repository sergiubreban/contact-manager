import { Box, Button, Flex, SkeletonCircle, Text } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useAppToast, useMetamask } from '../../Hooks';
import { shortenAddress } from '../../Utils';

const Layout: FC = (props) => {
  const { connectWallet, account, isLoading, provider } = useMetamask();
  const [balance, setBalance] = useState<string>('');
  const { t } = useTranslation();
  const toast = useAppToast();

  useEffect(() => {
    const getBalance = async (provider: Web3Provider, account: string) => {
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    };

    if (account && provider) {
      getBalance(provider, account.toString());
    }
  }, [account, provider]);

  const onAddressClick = (e: MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    if (account) {
      navigator.clipboard.writeText(account.toString());

      toast({
        title: t('Copied to clipboard'),
        status: 'success',
      });
    }
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Flex p="5" gap="5" direction="row-reverse" justifySelf="flex-end" alignItems="center">
        <ColorModeSwitcher />
        {isLoading && <SkeletonCircle />}
        {!isLoading && !account && (
          <Button variant="outline" onClick={() => connectWallet()}>
            {t('Connect your wallet')}
          </Button>
        )}
        {!isLoading && account && (
          <Flex gap="4" alignItems="center">
            <Text cursor="pointer" onClick={onAddressClick}>
              {shortenAddress(account.toString())}
            </Text>
            <Text>
              {t('Balance')}: {parseFloat(balance).toFixed(3)}
            </Text>
          </Flex>
        )}
      </Flex>
      {props.children}
    </Box>
  );
};

export default Layout;
