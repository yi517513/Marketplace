import React from "react";
import Button from "../UI/Button";

const RoleSwitch = ({ labelA, labelB, role, setRole }) => {
  return (
    <div className="flex">
      <Button
        label={labelA}
        disabled={role}
        onClick={() => setRole((prev) => !prev)}
        className="p-2 mr-1"
      />
      <Button
        label={labelB}
        disabled={!role}
        onClick={() => setRole((prev) => !prev)}
        className="p-2 mr-1"
      />
    </div>
  );
};

export default RoleSwitch;
