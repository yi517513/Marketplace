import React, { useState } from "react";
import SelectField from "../components/UI/SelectField";
import { modalTypeOptions } from "../utils/selectOptions";

const withSelectField = (WrappedComponent) => {
  // 這邊的props為EnhancedModal的props
  return (props) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (value) => {
      setSelectedOption(value);
    };

    return (
      <div>
        <WrappedComponent
          {...props}
          customPath={selectedOption}
          SelectField={
            <SelectField
              options={modalTypeOptions}
              onChange={handleSelectChange}
              className="modal-center__selector"
            />
          }
        />
      </div>
    );
  };
};

export default withSelectField;
