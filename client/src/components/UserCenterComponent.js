import React, { useEffect, useCallback, useState } from "react";
import UserCenter from "../services/userService";

const UserCenterComponent = () => {
  const [user, setUser] = useState(null);

  const getUserData = useCallback(async () => {
    try {
      const response = await UserCenter.profile();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return <h1>{user ? `Welcome, ${user.username}` : "Loading..."}</h1>;
};

export default UserCenterComponent;
