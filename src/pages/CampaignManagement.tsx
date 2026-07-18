import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  RefreshCw,
  CheckCircle,
  Archive,
  PlayCircle,
} from "lucide-react";

import CampaignWizard from "../components/CampaignWizard";

import {
  getCampaigns,
  approveCampaign,
  archiveCampaign,
  activateCampaign,
} from "../services/campaignService";

import type { Campaign } from "../types/campaign";

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const data = await getCampaigns();

      setCampaigns(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load campaigns.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: number) {
    try {
      await approveCampaign(id);
      await loadCampaigns();
    } catch (err) {
      console.error(err);
      alert("Unable to approve campaign.");
    }
  }

  async function handleArchive(id: number) {
    if (!confirm("Archive this campaign?")) return;

    try {
      await archiveCampaign(id);
      await loadCampaigns();
    } catch (err) {
      console.error(err);
      alert("Unable to archive campaign.");
    }
  }

  async function handleActivate(id: number) {
    try {
      await activateCampaign(id);
      await loadCampaigns();
    } catch (err) {
      console.error(err);
      alert("Unable to activate campaign.");
    }
  }

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((c) => {
      const q = search.toLowerCase();

      return (
        c.campaign_name.toLowerCase().includes(q) ||
        c.candidate_name.toLowerCase().includes(q)
      );
    });
  }, [campaigns, search]);

  return (
    <div style={{ padding: 30 }}>
      <CampaignWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onSaved={loadCampaigns}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Campaign Management</h1>

          <p
            style={{
              marginTop: 5,
              color: "#6b7280",
            }}
          >
            Super Admin Campaign Workspace
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button onClick={loadCampaigns}>
            <RefreshCw size={16} />
            Refresh
          </button>

          <button onClick={() => setWizardOpen(true)}>
            <Plus size={16} />
            New Campaign
          </button>
        </div>
      </div>

      <input
        placeholder="Search campaign..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ddd",
        }}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#f5f5f5",
            }}
          >
            <tr>
              <th style={th}>Campaign</th>
              <th style={th}>Candidate</th>
              <th style={th}>Office</th>
              <th style={th}>Approved</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={empty}>
                  Loading...
                </td>
              </tr>
            ) : filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan={6} style={empty}>
                  No campaigns found.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td style={td}>{campaign.campaign_name}</td>

                  <td style={td}>{campaign.candidate_name}</td>

                  <td style={td}>{campaign.office_id}</td>

                  <td style={td}>{campaign.approved ? "✅" : "⏳"}</td>

                  <td style={td}>
                    {campaign.active ? "🟢 Active" : "🔴 Archived"}
                  </td>

                  <td style={td}>
                    {!campaign.approved && (
                      <button onClick={() => handleApprove(campaign.id)}>
                        <CheckCircle size={16} />
                      </button>
                    )}

                    {campaign.active ? (
                      <button
                        style={{
                          marginLeft: 8,
                        }}
                        onClick={() => handleArchive(campaign.id)}
                      >
                        <Archive size={16} />
                      </button>
                    ) : (
                      <button
                        style={{
                          marginLeft: 8,
                        }}
                        onClick={() => handleActivate(campaign.id)}
                      >
                        <PlayCircle size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: 14,
};

const td: React.CSSProperties = {
  padding: 14,
  borderTop: "1px solid #eee",
};

const empty: React.CSSProperties = {
  padding: 40,
  textAlign: "center",
};
