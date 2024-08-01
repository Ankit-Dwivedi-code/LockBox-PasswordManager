import React from 'react'

const Footer = () => {
  return (
    <div  className='[background:radial-gradient(125%_100%_at_15%_10%,#000_30%,#fbbf24_100%)] text-white flex flex-col justify-center items-center'>
        <div className="logo font-bold text-2xl">
            <span className='text-amber-400'>&lt;</span>
            Lock
            <span className='text-amber-400'>Box/&gt;</span>
        </div>
      <div className='flex'>Created with <img src="/heart.png" className='w-6 mx-2' alt="" /> by Ankit</div>
    </div>
  )
}

export default Footer
