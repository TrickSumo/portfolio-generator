import { useAuth0 } from "@auth0/auth0-react";

import React from "react";

const LogoutButton = () => {
  const { logout,isAuthenticated, user } = useAuth0();

  return (
    isAuthenticated && (
      <>
      {`Hi ${user?.nickname} 🤖 `}
      <button onClick={() => logout()}>Logout</button>
      </>
    )
  );
};

export default LogoutButton;
