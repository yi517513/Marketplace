const Button = ({ label, type = "button", onClick, disabled, className }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`button ${className}`}
  >
    {label}
  </button>
);

export default Button;
