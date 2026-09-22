import { useState } from "react";

import Auth from "./auth/Auth";
import AppShell from "./components/layout/AppShell";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return <AppShell />;
}

export default App;