import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, ErrorMessage, useField } from "formik";

export const Button = React.memo(
  ({ label, type = "button", onClick, disabled, className, children }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`active:bg-gray-500 w-full bg-light-gray text-white rounded-lg cursor-pointer 
          hover:hover disabled:disabled text-nowrap ${className}`}
      >
        {label}
        {children}
      </button>
    );
  }
);

export const Input = React.memo(
  ({
    label,
    name,
    value,
    type = "text",
    placeholder,
    className,
    onChange,
    onKeyDown,
  }) => (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-nowrap">
          {label}
        </label>
      )}
      <div className="flex">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full h-full text-center caret-auto border-gray-400 border-2 rounded-xl"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
);

export const ListItem = React.memo(
  ({ label, value, icon, className, onClick }) => (
    <li
      className={`flex items-center h-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label && (
        <a
          className={`flex items-center justify-center text-nowrap 
          ${value ? `h-full` : `min-w-full min-h-full`}`}
        >
          {label}
        </a>
      )}

      {icon && <FontAwesomeIcon icon={icon} />}

      {value && <span className="block">{value}</span>}
    </li>
  )
);

export const NavItem = React.memo(
  ({ label, to, icon, children, className }) => {
    return (
      <li className={`flex items-center justify-center h-full ${className}`}>
        <Link
          to={to}
          className="flex items-center justify-center text-nowrap min-w-full min-h-full"
        >
          {label}
          {icon && <FontAwesomeIcon icon={icon} />}
        </Link>

        {children}
      </li>
    );
  }
);

export const SelectField = React.memo(
  ({
    name,
    placeholder,
    label,
    options = [],
    value,
    onChange,
    className,
    disabled,
  }) => (
    <div className={`${className}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
);

export const InputField = ({ label, name, type, placeholder, className }) => (
  <div
    className={`relative h-full flex items-center justify-center gap-2 ${className} `}
  >
    {label && (
      <label htmlFor={name} className="text-nowrap">
        {label}
      </label>
    )}
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-11/12 min-h-full text-center outline-none caret-auto border border-gray-400 rounded-2xl"
    />
    <div className="absolute top-full lg:top-1/2 lg:-translate-y-1/2 right-2 text-nowrap">
      <ErrorMessage
        name={name}
        component="div"
        className="text-center text-red-600"
      />
    </div>
  </div>
);

export const TextArea = ({ value, className, style, disabled = false }) => {
  return (
    <div className={`w-full ${className}`} style={style}>
      <textarea
        value={value}
        disabled={disabled}
        className={`w-full h-full resize-none focus:outline-none`}
      />
    </div>
  );
};

export const TextareaField = ({
  label,
  name,
  placeholder,
  className,
  maxLength,
}) => {
  const [field] = useField(name);

  return (
    <div className="relative h-full flex items-center justify-center gap-2">
      {label && (
        <label htmlFor={name} className="text-nowrap">
          {label}
        </label>
      )}
      <div className="w-full">
        <Field
          id={name}
          name={name}
          as="textarea"
          placeholder={placeholder}
          maxLength={maxLength}
          className={`resize-none w-full border border-solid border-gray-400 border-lg outline-none caret-auto h-44 md:h-48 rwd-text-sm${className}`}
        />
        <div className="absolute bottom-3 right-2 text-gray-500 text-sm">
          {field?.value?.length}/{maxLength}
        </div>
      </div>
      <div className="absolute top-full lg:top-1/2 lg:-translate-y-1/2 right-2 text-nowrap">
        <ErrorMessage
          name={name}
          component="div"
          className="text-center text-red-600"
        />
      </div>
    </div>
  );
};

export const ImagePreview = ({ isOpen, onClose, previewImageSrc }) => {
  if (!isOpen) return;

  return (
    <div
      className="flex fixed  flex-col inset-0 bg-black bg-opacity-60  z-10"
      onClick={onClose}
    >
      <div
        className="flex w-full h-16 justify-end items-center bg-black bg-opacity-80"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="cursor-pointer text-white text-3xl mx-4"
          onClick={onClose}
        >
          &times;
        </span>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src={previewImageSrc.url}
          alt="Preview"
          className="w-1/2 max-h[1000px] h-auto"
        />
      </div>
    </div>
  );
};

// 商品資訊卡片
export const ProductOverView = ({
  title,
  price,
  inventory,
  description,
  hasDesc,
  className,
}) => (
  <div
    className={`flex w-full h-full items-center justify-center ${className}`}
  >
    <div className="flex flex-col text-xl gap-2 w-full h-full p-2">
      <div className="h-1/6">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900">
          {title}
        </h5>
      </div>
      <div className="h-1/6 flex justify-between">
        <p className=" text-lg text-gray-700"> {`庫存: ${inventory}`}</p>
        <p className=" text-lg font-bold text-gray-700"> {`${price} 元`}</p>
      </div>
      {hasDesc && (
        <div className="h-4/6">
          <TextArea value={description} className="h-full" />
        </div>
      )}
    </div>
  </div>
);
