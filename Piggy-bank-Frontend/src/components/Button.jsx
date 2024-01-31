import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2  mx-4 text-xs md:text-base rounded-md bg-yellow-500 text-yellow-950 hover:bg-yellow-800 hover:text-stone-100"
      {...props}
    >
      {children}
    </button>
  );
}
