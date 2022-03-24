import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Switch,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMetamask } from '../../Hooks';
import { ContactFormProps } from '../../Types';
import { HiClipboardCopy } from 'react-icons/hi';
import { Wallet } from 'ethers';

const ContactForm = (props: ContactFormProps) => {
  const { t } = useTranslation();
  const { account } = useMetamask();
  const [name, setName] = useState(props.name ?? '');
  const [lastName, setLastName] = useState(props.lastName ?? '');
  const [phone, setPhone] = useState(props.phone ?? '');
  const [age, setAge] = useState(props.age ?? 0);
  const [website, setWebsite] = useState(props.website ?? '');
  const [email, setEmail] = useState(props.email ?? '');
  const [tags, setTags] = useState(props.tags ?? []);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [publicAddress, setPublicAddress] = useState<Wallet | string | null>(props.publicAddress ?? null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isContactOwner, setIsContactOwner] = useState(false);

  useEffect(() => {
    isContactOwner && setPublicAddress(account);
  }, [isContactOwner, account]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSubmit({
      publicAddress,
      verified: isContactOwner,
      name,
      lastName,
      phone,
      age,
      website,
      email,
      tags,
      profilePicFile,
    });
  };

  const pasteClipboardAddress = async () => {
    const clipboardValue = await navigator.clipboard.readText();
    clipboardValue && setPublicAddress(clipboardValue);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} data-testid="form">
      <Stack gap="2">
        <FormControl>
          <Flex justify="space-between">
            <FormLabel htmlFor="wallet_address">{'Wallet Address'}</FormLabel>
            {props.verifyWallet && account && (
              <Flex>
                <FormLabel htmlFor="my-wallet" mb="0">
                  {t('Use my wallet')}
                </FormLabel>
                <Switch id="my-wallet" checked={isContactOwner} onChange={(e) => setIsContactOwner(e.target.checked)} />
              </Flex>
            )}
          </Flex>
          <InputGroup size="md">
            <Input
              id="wallet_address"
              name="wallet_address"
              data-testid="input__address"
              type="text"
              disabled={isContactOwner}
              value={publicAddress?.toString()}
              onChange={(e) => setPublicAddress(e.target.value)}
            />
            <InputRightElement width="4.5rem" pr="5px" justifyContent="flex-end">
              <IconButton aria-label="paste-address" h="1.75rem" size="sm" onClick={pasteClipboardAddress}>
                <HiClipboardCopy />
              </IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">{'Name'}</FormLabel>
          <Input
            id="name"
            name="name"
            data-testid="input__name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">{'lastName'}</FormLabel>
          <Input
            id="lastName"
            name="lastName"
            data-testid="input__lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phone">{'Telephone number'}</FormLabel>
          <Input
            id="phone"
            name="phone"
            data-testid="input__phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="age">{'Age'}</FormLabel>
          <Input
            id="age"
            name="age"
            data-testid="input__age"
            type="number"
            value={age}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!Number.isNaN(value)) {
                setAge(value);
              }
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="website">{'website'}</FormLabel>
          <Input
            id="website"
            name="website"
            data-testid="input__website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">{t('Email address')}</FormLabel>
          <Input
            id="email"
            name="email"
            data-testid="input__email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="tags">{'tags'}</FormLabel>
          <AutoComplete value={tags} onChange={(vals) => setTags(vals)} openOnFocus multiple creatable>
            <AutoCompleteInput variant="filled" id="tags" name="tags" data-testid="input__tags">
              {({ tags }) =>
                tags.map((tag, tid) => <AutoCompleteTag key={tid} label={tag.label} onRemove={tag.onRemove} />)
              }
            </AutoCompleteInput>
            <AutoCompleteList>
              {(props.distinctTags ?? []).map((tag, cid) => (
                <AutoCompleteItem
                  key={`option-${cid}`}
                  value={tag}
                  textTransform="capitalize"
                  _selected={{ bg: 'whiteAlpha.50' }}
                  _focus={{ bg: 'whiteAlpha.100' }}
                >
                  {tag}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">{'Profile Image'}</FormLabel>
          <Input
            ref={inputRef}
            variant="simple"
            pl="0"
            id="image"
            type="file"
            name="profilePic"
            data-testid="input__profilePic"
            onChange={({
              target: {
                validity,
                files: [file],
              },
            }: any) => validity.valid && setProfilePicFile(file)}
          />
        </FormControl>
        <Button isLoading={props.isLoading} type="submit" variant="ghost" alignSelf="flex-end" data-testid="submit-btn">
          {props.actionText}
        </Button>
      </Stack>
    </form>
  );
};
export default ContactForm;
