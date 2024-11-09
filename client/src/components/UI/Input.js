import React from "react";

const Input = ({
  label,
  name,
  value,
  type,
  placeholder,
  className,
  onChange,
  onFocus,
  ref,
}) => (
  <div className="flex w-full items-center justify-center">
    {label && (
      <label htmlFor={name} className="flex-0 block text-center w-24 text-lg">
        {label}
      </label>
    )}
    <input
      ref={ref}
      onFocus={onFocus}
      type={type}
      value={value}
      placeholder={placeholder}
      className={`flex w-full p-2 my-2 text-lg border border-solid border-gray-400 border-lg outline-none caret-auto ${className}`}
      onChange={onChange}
    ></input>
  </div>
);

export default Input;
