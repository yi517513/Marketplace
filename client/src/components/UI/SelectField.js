import React from "react";
import { Field } from "formik";

const SelectField = ({ name, placeholder, label, options }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} as="select" placeholder={placeholder}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </div>
  );
};

export default SelectField;
