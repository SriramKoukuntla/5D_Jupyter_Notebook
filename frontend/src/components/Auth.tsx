import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// LoginButton Component
export const LoginButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className={className} // Apply the custom className if provided
      onClick={() => loginWithRedirect()}
      {...props} // Spread other props
    >
      Log In
    </button>
  );
};

// LogoutButton Component
export const LogoutButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  const { logout } = useAuth0();

  return (
    <button
      className={className} // Apply the custom className if provided
      onClick={() => logout({ returnTo: window.location.origin })}
      {...props} // Spread other props
    >
      Log Out
    </button>
  );
};

// Profile Component
export const Profile: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={className} {...props}>
        <img
          src={user?.picture}
          alt={user?.name}
          style={{ borderRadius: "50%", width: "100px", height: "100px" }}
        />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    )
  );
};
