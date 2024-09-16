import React, { useEffect, useState } from "react";
import StatusSwitch from "../components/UI/StatusSwitch";

const SwitchContainer = ({ labelA, labelB, role, setRole }) => {
  return (
    <StatusSwitch
      labelA={labelA}
      labelB={labelB}
      status={role}
      setStatus={setRole}
    />
  );
};

export default SwitchContainer;
