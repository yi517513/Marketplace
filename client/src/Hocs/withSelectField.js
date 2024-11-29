import React, { useState } from "react";
import { SelectField } from "../components/UI/BaseUI";
import { modalTypeOptions } from "../utils/selectOptions";

const withSelectField = (WrappedComponent) => {
  return (props) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (value) => {
      setSelectedOption(value);
    };

    return (
      <div>
        <WrappedComponent {...props} modalType={selectedOption}>
          <SelectField
            options={modalTypeOptions}
            onChange={handleSelectChange}
            className="modal-center__selector"
          />
        </WrappedComponent>
      </div>
    );
  };
};

export default withSelectField;
