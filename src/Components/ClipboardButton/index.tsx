import { MouseEvent, useState } from 'react';
import { IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useAppToast } from '../../Hooks';
import { ClipboardButtonProps } from '../../Types';

const ClipboardButton = ({ text, ...buttonProps }: ClipboardButtonProps) => {
  const [copied, setCopied] = useState(false);
  const toast = useAppToast();
  const { t } = useTranslation();

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    navigator.clipboard.writeText(text);
    setCopied(true);

    toast({
      title: t('Copied to clipboard'),
      status: 'success',
      onCloseComplete: () => setCopied(false),
    });
  };

  const label = (
    <>
      <Text data-testid="tooltip__text">{text}</Text>
      <Text fontSize="12px">{copied ? t('Copied!') : t('Click to Copy')}</Text>
    </>
  );

  return (
    <Tooltip label={label} data-testid="tooltip">
      <IconButton
        data-testid="clipboard-button"
        as="span"
        size="sm"
        onClick={onClick}
        isDisabled={!text || copied}
        {...buttonProps}
      />
    </Tooltip>
  );
};

export default ClipboardButton;
