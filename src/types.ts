export interface IContactState {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export type IUserInput = Omit<IContactState, 'id'>;

export interface IContactsApi {
  [id: string]: IUserInput;
}
