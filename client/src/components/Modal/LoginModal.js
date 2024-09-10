import React, { useEffect, useState, useCallback } from "react";

const LoginModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    }
    setActiveMenu("buyer");
  }, [isAuthenticated]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    navigateTo(PATHS.LOGIN);
  }, [navigateTo]);

  return { handler, status };
  return <div>LoginModal</div>;
};

export default LoginModal;
