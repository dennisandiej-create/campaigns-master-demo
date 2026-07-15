import { useState } from "react";

import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import CommandCentre from "./CommandCentre";
import Contacts from "./Contacts";
import Voters from "./Voters";
import GISMap from "./GISMap";
import Analytics from "./Analytics";
import AI from "./AI";

import VolunteerCentre from "./VolunteerCentre";
import CampaignCalendar from "./CampaignCalendar";
import BroadcastCentre from "./BroadcastCentre";
import Reports from "./Reports";
import Settings from "./Settings";

type Props = {
  office: string;
  onBack: () => void;
};

export default function Dashboard({
  office,
  onBack,
}: Props) {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="dashboard">

      <Sidebar
        office={office}
        selected={page}
        onSelect={setPage}
      />

      <div className="content">

        <Header
          office={office}
          onBack={onBack}
        />

        {page === "Dashboard" && <CommandCentre />}

        {page === "Contacts" && <Contacts />}

        {page === "Voters" && <Voters />}

        {page === "Volunteer Centre" && (
          <VolunteerCentre />
        )}

        {page === "Campaign Calendar" && (
          <CampaignCalendar />
        )}

        {page === "Broadcast Centre" && (
          <BroadcastCentre />
        )}

        {page === "GIS Map" && <GISMap />}

        {page === "Analytics" && <Analytics />}

        {page === "AI Centre" && <AI />}

        {page === "Reports" && <Reports />}

        {page === "Settings" && <Settings />}

      </div>

    </div>
  );
}