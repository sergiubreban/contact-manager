import { IconButton, IconButtonProps, Text, Tooltip } from "@chakra-ui/react";
import { FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppToast } from "../../Hooks";

const ClipboardButton: FC<{ text: string } & IconButtonProps> = ({ text, ...buttonProps }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();
  const toast = useAppToast()

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);

    toast({
      title: t("Copied to clipboard"),
      status: "success",
      onCloseComplete: () => setCopied(false)
    })
  };

  const label = <>
    <Text data-testid='tooltip__text'>{text}</Text>
    <Text fontSize='12px'>{(copied ? t('Copied!') : t('Click to Copy'))}</Text>
  </>

  return (
    <Tooltip label={label} data-testid='tooltip'>
      <IconButton
        data-testid="clipboard-button"
        as='span'
        size='sm'
        onClick={onClick}
        isDisabled={!text || copied}
        {...buttonProps}
      />
    </Tooltip>
  );
};

export default ClipboardButton;