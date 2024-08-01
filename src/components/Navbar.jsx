import React from 'react'

const Navbar = () => {
  return (
    <nav className='[background:radial-gradient(125%_100%_at_15%_10%,#000_30%,#fbbf24_100%)] text-white'>
        <div className="mycontainer flex justify-between items-center px-10 h-16 py-5">

        <div className="logo font-bold text-2xl">
            <span className='text-amber-400'>&lt;</span>
            Lock
            <span className='text-amber-400'>Box/&gt;</span>
        </div>
      <ul className='flex gap-4'>
        <li className='font-semibold hover:text-red-600'><a href="/">Home</a></li>
        <li className='font-semibold hover:text-red-600'><a href="#">About</a></li>
        <li className='font-semibold hover:text-red-600'><a href="#">Contact</a></li>
      </ul>
      <button>
        <img src="/icons8-github-50.png" alt="Github logo" className='invert p-5 w-20' />
      </button>
        </div>
    </nav>
  )
}

export default Navbar
