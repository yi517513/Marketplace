const FormSection = ({ title, children }) => (
  <fieldset>
    <legend>{title}</legend>
    {children}
  </fieldset>
);

export default FormSection;
