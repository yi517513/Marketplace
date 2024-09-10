import React from "react";
import ProfileForm from "../components/UserCenter/Profile/ProfileForm";
import useProfileConfig from "../hooks/Config/useProfileConfig";

const ProfileContainer = () => {
  const { selectOptionsConfig, userData, validationSchema, handleSubmit } =
    useProfileConfig();

  return (
    <ProfileForm
      selectOptionsConfig={selectOptionsConfig}
      userData={userData}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
    />
  );
};

export default ProfileContainer;
