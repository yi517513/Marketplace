import { Field, ErrorMessage } from "formik";

const TextareaField = ({ label, name, placeholder, className }) => (
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
      as="textarea"
      placeholder={placeholder}
      className={`w-full p-2 my-2 text-lg border border-solid border-gray-400 border-lg outline-none caret-auto min-h-40 ${className}`}
      style={{ flexBasis: `80%` }}
    />
    <div
      className="w-4 flex items-center justify-center flex-1"
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

export default TextareaField;
