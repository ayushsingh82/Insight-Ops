import React, { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const gradientStyle = {
  background: 'linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)',
  height: '4px',
  width: '100%',
  border: 'none',
};

const navLinks = [
  { label: 'Operator', href: '/operator' },
  { label: 'AVS', href: '/avs' },
  { label: 'Connection', href: '/map' },
  { label: 'MoveLab', href: '/move' },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <nav className=''>
        <div className='flex flex-row mx-auto px-4 md:px-[40px] py-[20px] md:py-[25px] justify-between items-center mt-[0px] bg-black'>
          <div className='font-bold text-xl md:text-2xl text-purple-500'>
            <a href='/'>InsightOps</a>
          </div>

          <div className='hidden lg:flex justify-center flex-1 space-x-8 text-center'>
            {navLinks.map((link) => (
              <h1 key={link.href} className='font-medium text-lg text-white'>
                <a href={link.href}>{link.label}</a>
              </h1>
            ))}
            <h1
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-1 font-bold border-purple-500 border-2 rounded-md shadow-lg hover:opacity-100 transition-opacity duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => window.location.href='/eliza'}
            >
              Eliza
            </h1>
          </div>

          <div className='hidden lg:block text-white'>
           <ConnectButton/>
          </div>

          <button
            className='lg:hidden text-white flex flex-col justify-center items-center gap-1.5 w-8 h-8'
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label='Toggle menu'
          >
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {isMenuOpen && (
          <div className='lg:hidden flex flex-col items-center gap-y-4 bg-black pb-6 px-4'>
            {navLinks.map((link) => (
              <h1 key={link.href} className='font-medium text-lg text-white'>
                <a href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
              </h1>
            ))}
            <h1
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-1 font-bold border-purple-500 border-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => { setIsMenuOpen(false); window.location.href='/eliza'; }}
            >
              Eliza
            </h1>
            <div className='text-white'>
              <ConnectButton/>
            </div>
          </div>
        )}

        <div style={gradientStyle} />
      </nav>
    );
  }


export default Navbar
