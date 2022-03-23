import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { FC, FormEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormProps } from '../../types';

const ContactForm = (props: ContactFormProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState(props.name ?? '');
  const [lastName, setLastName] = useState(props.lastName ?? '');
  const [phone, setPhone] = useState(props.phone ?? '');
  const [age, setAge] = useState(props.age ?? 0);
  const [website, setWebsite] = useState(props.website ?? '');
  const [email, setEmail] = useState(props.email ?? '');
  const [tags, setTags] = useState(props.tags ?? []);
  const [profilePicFile, setProfilePicFile] = useState<any>(props.profilePic ?? '');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.onSubmit({
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

  return (
    <form ref={formRef} onSubmit={handleSubmit} data-testid="form">
      <Stack gap="2">
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
          <FormLabel htmlFor="tags">{'tags'}</FormLabel>
          <Input
            id="tags"
            name="tags"
            data-testid="input__tags"
            type="text"
            value={tags}
            onChange={(e) => setTags([e.target.value])}
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
        <Button type="submit" variant="ghost" alignSelf="flex-end" data-testid="submit-btn">
          {'Add'}
        </Button>
      </Stack>
    </form>
  );
};
export default ContactForm;
