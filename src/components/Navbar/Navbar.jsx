import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-inherit py-5">
      <div className="flex justify-between w-[90%] mx-auto items-center text-white font-Grotesk">
        <h2 className="text-3xl ">CryptoBal.</h2>
        <ul className="flex gap-10">
          <li>Support</li>
          <li>Blogs</li>
          <li>Contact</li>
          <li>About Us</li>
        </ul>
        <div className="flex gap-3">
          <button className="border border-gray-400 py-2 px-10 rounded-full bg-black text-white font-semibold">
            Login
          </button>
          <button className="border py-2 px-10 rounded-full bg-gray-700  font-semibold">
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
