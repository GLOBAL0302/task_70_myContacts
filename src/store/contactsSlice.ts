import { IContactState } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchContacts, submitContact } from './contactsThunks';

export interface IContactsState {
  contacts: IContactState[];
  contactSelected: IContactState,
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
}

const initialState: IContactsState = {
  contacts: [],
  contactSelected:{
    id:"",
    name:"",
    photo:"",
    phone:"",
    email:""
  },
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    selectingContact:(state, {payload:selectedContact}:PayloadAction<IContactState>)=>{
      state.contactSelected = selectedContact
    },
    closingContact:(state)=>{
      state.contactSelected=initialState.contactSelected
    }
  },
  selectors: {
    selectContacts: state => state.contacts,
    selectContact: state => state.contactSelected,
    selectFetchLoading: state => state.fetchLoading,
    selectCreateLoading: state => state.createLoading,
    selectDeleteLoading: state => state.deleteLoading,
    selectUpdateLoading: state => state.updateLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(submitContact.fulfilled, state => {
        state.createLoading = false;
      });
    builder
      .addCase(fetchContacts.pending, state => {
        state.fetchLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.contacts = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const {
  selectContacts,
  selectContact,
  selectDeleteLoading,
  selectCreateLoading,
  selectFetchLoading,
  selectUpdateLoading,
} = contactsSlice.selectors;