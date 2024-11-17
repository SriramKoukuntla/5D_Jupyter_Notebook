import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-7gkjjxunh4hrflpu.us.auth0.com"
      clientId="Q7PgVHwLtJavB38Ahj8njyVz7N1cBFgX"
      authorizationParams={{
        redirect_uri: window.location.origin + "/Dashboard",
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);