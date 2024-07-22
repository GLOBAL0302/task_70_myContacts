import { IContactState } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, submitContact } from './contactsThunks';

export interface IContactsState {
  contacts: IContactState[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
}

const initialState: IContactsState = {
  contacts: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {},
  selectors: {
    selectContacts: state => state.contacts,
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
  selectDeleteLoading,
  selectCreateLoading,
  selectFetchLoading,
  selectUpdateLoading,
} = contactsSlice.selectors;