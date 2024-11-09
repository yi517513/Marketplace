import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, placeholder, className }) => (
  <div className="flex w-full items-center justify-center">
    {label && (
      <label
        htmlFor={name}
        className="flex-0 block text-center w-24 text-lg"
        style={{ flexBasis: `12.5%` }}
      >
        {label}
      </label>
    )}
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full p-2 my-2 text-lg border border-solid border-gray-400 border-lg outline-none caret-auto ${className}`}
      style={{ flexBasis: `75%` }}
    />
    <div
      className="w-4 flex items-center justify-center flex-0 "
      style={{ flexBasis: `12.5%` }}
    >
      <ErrorMessage
        name={name}
        component="div"
        className="text-center text-red-600"
      />
    </div>
  </div>
);

export default InputField;
