import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { IContactsApi, IContactState, IUserInput } from '../types';

export const fetchContacts= createAsyncThunk<IContactState[], void, {}>(
  "contacts/fetchContacts",
  async()=>{
    const {data:responseData} = await axiosApi.get<null | IContactsApi>("/contacts.json");
    let fetchedData:IContactState[] = []
    if(responseData){
      fetchedData =  Object.keys(responseData).map((id)=>({
        id,
        ...responseData[id],
        photo: responseData[id].photo ? responseData[id].photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHDhRGTty4JUK8TuWxxrGMdy7awUBC4LY0w&s"
      }))
    }
    return fetchedData;
})

export const submitContact = createAsyncThunk<void,IUserInput,{}>(
  "contacts/submitContacts",
  async(createdContact:IUserInput)=>{
    await axiosApi.post("/contacts.json", createdContact)
  }
)
