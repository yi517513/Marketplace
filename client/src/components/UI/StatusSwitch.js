import React from "react";
import Button from "../UI/Button";

const StatusSwitch = ({ labelA, labelB, status, setStatus }) => {
  return (
    <div className="switch-button">
      <Button
        label={labelA}
        disabled={status}
        onClick={() => setStatus((prev) => !prev)}
      />
      <Button
        label={labelB}
        disabled={!status}
        onClick={() => setStatus((prev) => !prev)}
      />
    </div>
  );
};

export default StatusSwitch;
