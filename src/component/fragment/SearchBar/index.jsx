/* eslint-disable no-unused-vars */
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

const SearchBar = () => {
  return (
    <div className="flex relative justify-center items-center ">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari topik yang kamu butuhkan..."
          className="lg:w-[500px] md:w-[400px] sm:w-[300px] xs:w-[250px] h-12 pl-4 pr-12 rounded-full bg-white text-blueSecondary border-1 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blueSecondary focus:border-transparent"
        />
        <BiSearchAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-bluePrimary" size={24} />
      </div>
    </div>
  );
}

export default SearchBar;
