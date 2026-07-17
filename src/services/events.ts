import type { CampaignEvent } from "../types/event";

export const sampleEvents: CampaignEvent[] = [
  {
    id: "1",
    title: "County Rally",
    description: "Major campaign rally",
    category: "Rally",
    county: "Machakos",
    ward: "Township",
    venue: "Machakos Stadium",
    event_date: "2026-07-18",
    start_time: "10:00",
    end_time: "14:00",
    organizer: "Campaign Secretariat",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "Volunteer Training",
    description: "Training session",
    category: "Training",
    county: "Kitui",
    ward: "Central",
    venue: "County Hall",
    event_date: "2026-07-20",
    start_time: "09:00",
    end_time: "12:00",
    organizer: "Volunteer Coordinator",
    status: "Scheduled",
  },
];
