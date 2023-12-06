import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { logo } from './Logo';
import Nav from './nav';

export default function Header() {
  const navigate = useNavigate();  

  const handleLogoClick = () => {
    navigate('/');
  };

  return (


    <div className='bg-gray-400 p-4 sticky top-0 z-[20] flex w-full flex-wrap mx-auto items-center justify-between'>
    <NavLink to="/"><img src={logo} alt="Logo" style={{ width: '2rem', borderRadius: "10%"}} /></NavLink>
      <Nav />
    </div>
  );
}
