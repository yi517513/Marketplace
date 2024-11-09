const Button = ({ label, type = "button", onClick, disabled, className }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full max-w-xs border-none bg-light-gray text-white rounded-lg cursor-pointer hover:bg-dark-gray disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed active:bg-gray-500 ${className}`}
  >
    {label}
  </button>
);

export default Button;
