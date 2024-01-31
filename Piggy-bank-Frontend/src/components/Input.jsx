import React, { forwardRef } from "react";

const Input = forwardRef(function Input({ type, children, ...props }, ref) {
  const classses =
    "w-full p-1 border-b-2 rounded-sm border-pink-200 bg-yellow-100 text-slate-600 focus:outline-none focus:border-yelllow-600";
  return (
    <p className="flex flex-col gap-1 mx-10 my-2">
      <label className=" text-sm font-bold uppercase text-pink-400">
        {children}
      </label>
      <input ref={ref} className={classses} {...props} type={type} required />
    </p>
  );
});

export default Input;
