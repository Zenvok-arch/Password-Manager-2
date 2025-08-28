import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#000000] flex justify-between md:justify-around h-20 items-center px-6 text-white">
      <h1 className="text-2xl mb-3 text-center text-white font-bold">
        Pass<span className="text-[#6c16c7]">Cool</span>
      </h1>

      {/* <ul className='flex gap-6'>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
    </ul> */}

      <button className="flex items-center gap-2 backdrop-blur-md ring ring-[#6c16c7] bg-[#6c16c7]/20 hover:bg-black/10 py-2 px-4  font-bold rounded-4xl">
        <img
          className="bg-white rounded-full"
          src="icons8-github-50.png"
          width={24}
          alt="github icon"
        />
        Github
      </button>
    </nav>
  );
};

export default Navbar;
