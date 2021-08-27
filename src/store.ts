import { atom, selector } from "recoil";
import { getAll } from "./apis";
import { Contact, EditContact } from "./types";

const getAllContact = async (): Promise<Contact[]> => {
  const response = await getAll();
  const contacts: Contact[] = await response.json();
  return contacts;
};

export const selectedContactState = atom<Contact | null>({
  key: "selectedContact",
  default: null,
});

export const filterContactState = selector({
  key: "filterContactState",
  get: ({ get }) => {
    const filter = get(contactsState);
    const keyword = get(keyWordState);
    return filter.filter((contact) => {
      Object.values(contact).reduce((acc, cur) => {
        return acc || String(cur).includes(keyword);
      });
    });
  },
});

export const keyWordState = atom<string>({
  key: "keywordState",
  default: "",
});

export const contactsState = atom<Contact[]>({
  key: "contactsState",
  default: getAllContact(),
});

export const editedContactState = atom<EditContact>({
  key: "editContactsState",
  default: {},
});
