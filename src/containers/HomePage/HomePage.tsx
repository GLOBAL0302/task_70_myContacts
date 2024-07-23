import Contacts from '../../components/Contacts/Contacts';
import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

const HomePage:React.FC<PropsWithChildren> = () => {
  return (
    <>
      <Contacts/>
      <Outlet/>
    </>
  )
};

export default HomePage;
