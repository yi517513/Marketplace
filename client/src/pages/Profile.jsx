import React from "react";
import ProfileForm from "../components/UserCenter/ProfileForm";
import useFetchData from "../hooks/fetch/useFetchData";

const Profile = () => {
  const { data } = useFetchData(`getUserData`);
  return <ProfileForm userData={data} />;
};

export default Profile;
