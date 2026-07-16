export interface CampaignEvent {
  id: string;

  title: string;

  description: string;

  category:
    | "Rally"
    | "Meeting"
    | "Training"
    | "Fundraiser"
    | "Church Visit"
    | "Door to Door"
    | "Press Conference";

  county: string;

  ward: string;

  venue: string;

  event_date: string;

  start_time: string;

  end_time: string;

  organizer: string;

  status:
    | "Scheduled"
    | "Completed"
    | "Cancelled";
}