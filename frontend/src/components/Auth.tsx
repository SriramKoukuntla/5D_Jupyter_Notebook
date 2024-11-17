import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export const Profile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};
