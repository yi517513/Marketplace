import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, placeholder, className }) => (
  <div className="input-container">
    {label && (
      <label htmlFor={name} className="input-label">
        {label}
      </label>
    )}
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`input-element ${className}`}
    />
    <ErrorMessage name={name} component="div" className="error-message" />
  </div>
);

export default InputField;
