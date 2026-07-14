import { useState } from "react";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  if (!selectedOffice) {
    return (
      <Landing
        onSelectOffice={(office) => setSelectedOffice(office)}
      />
    );
  }

  return (
    <Dashboard
      office={selectedOffice}
      onBack={() => setSelectedOffice(null)}
    />
  );
}