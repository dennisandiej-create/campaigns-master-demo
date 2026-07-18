import { useEffect, useState } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

import { getSession } from "./services/authService";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);

  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const session = await getSession();

      setLoggedIn(!!session);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!loggedIn) {
    return <Login />;
  }

  if (!selectedOffice) {
    return <Landing onSelectOffice={(office) => setSelectedOffice(office)} />;
  }

  return (
    <Dashboard office={selectedOffice} onBack={() => setSelectedOffice(null)} />
  );
}
