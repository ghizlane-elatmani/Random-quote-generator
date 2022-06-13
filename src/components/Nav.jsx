import React from "react";
import { MdOutlineAutorenew } from "react-icons/md";

const Nav = ({ getRandomQuote }) => {
  return (
    <div className="nav">
      <button
        className="btn-random-quote"
        onClick={() => {
          getRandomQuote();
        }}
      >
        random <MdOutlineAutorenew />
      </button>
    </div>
  );
};

export default Nav;
