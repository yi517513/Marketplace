import React from "react";

const Input = ({ label, name, value, placeholder, className, onChange }) => (
  <div className="input-container">
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <input
      value={value}
      placeholder={placeholder}
      className={`input-element ${className}`}
      onChange={onChange}
    ></input>
  </div>
);

export default Input;
