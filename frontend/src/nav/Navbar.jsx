import React from 'react'
import Button from '@/buttons/Button5'
import { ShiftingDropDown } from './Dropdowns'

const Navbar = () => {
  return (
    <div className="bg-zinc-900/70 backdrop-blur-lg   md:w-2/3 w-full px-4 py-3 text-white flex justify-center z-10 md:rounded-2xl">
      {/* Container with max width and responsive padding */}
      <div className="w-full   flex flex-wrap items-center justify-between md:rounded-2xl">

        {/* Left: Logo or greeting */}
        <div className="px-1 lg:flex  md:hidden flex anton-regular  bg-gradient-to-tl from-purple-400 to-red-400 bg-clip-text text-transparent text-xl select-none ">
          Fish </div>

        {/* Right: Dropdown + Button */}
        <div className="flex items-center space-x-1">

          {/* Dropdown - show only on md and up */}
          <div className="hidden md:flex ">
            <ShiftingDropDown />
          </div>

          {/* Button - show only on md and up */}
          <div className="hidden md:flex">
            <a href="/login">
              <Button />
            </a>
          </div>

          {/* Mobile menu icon - visible on small screens */}
          <div className="flex md:hidden">
            {/* You can replace this with a real mobile dropdown if needed */}
            <button className="text-xl">☰</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar
