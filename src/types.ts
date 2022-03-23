

export type Contact = {
  id?: string;
  name?: string;
  publicAddress?: string;
  lastName?: string;
  phone?: string;
  age?: number;
  website?: string;
  tags?: string[];
  email?: string;
  profilePic?: string;
}
export interface ContactFromData extends Omit<Contact, 'profilePic'> {
  profilePicFile?: File;
}
export interface ContactFormProps extends Contact {
  onSubmit: (values: ContactFromData) => void;
}