import React, { Fragment } from 'react';

const SearchBar = ({ mobile, text, setText }) => {
  return (
    <Fragment>
      <div class={mobile ? `block md:hidden ` : `hidden md:block`}>
        <div class="flex items-center w-fit relative text-gray-500 mx-2 md:mx-0">
          <input
            type="text"
            class="w-full
                p-2 pl-8 
                text-sm font-normal text-gray-700
                border border-solid border-gray-300
                rounded-md
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-indigo-400 focus:outline-none
                "
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <svg
            class="w-4 h-4 absolute left-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
