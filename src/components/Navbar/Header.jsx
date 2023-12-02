import React from 'react'
import Logo from './Logo'
import Nav from './nav'

export default function Header() {
  return (
    <div className='bg-gray-500 p-4 sticky top-0 z-[20] flex w-full flex-wrap  mx-auto items-center justify-between'>
        <Logo/>
        <Nav/>
    </div>
  )
}
