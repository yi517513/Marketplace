import React from "react";

const SelectField = ({
  name,
  placeholder,
  label,
  options,
  value,
  onChange,
  className,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
