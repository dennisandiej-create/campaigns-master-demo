import { useEffect, useState } from "react";

import { ShieldCheck } from "lucide-react";

import { getCampaigns } from "../services/campaignService";

import type { Campaign } from "../types/campaign";

export default function SuperAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      const data = await getCampaigns();

      setCampaigns(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 30,
        }}
      >
        <ShieldCheck size={36} color="#2563eb" />

        <div>
          <h1 style={{ margin: 0 }}>Super Admin</h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
            }}
          >
            Election Management Control Centre
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {[
          {
            title: "Campaigns",
            value: campaigns.length,
            color: "#2563eb",
          },
          {
            title: "Campaign Administrators",
            value: 0,
            color: "#16a34a",
          },
          {
            title: "Pending Approvals",
            value: 0,
            color: "#ea580c",
          },
          {
            title: "System Roles",
            value: 9,
            color: "#7c3aed",
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "#ffffff",
              borderRadius: 14,
              padding: 20,
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              {card.title}
            </div>

            <div
              style={{
                marginTop: 10,
                fontSize: 34,
                fontWeight: "bold",
                color: card.color,
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Administration</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          <AdminCard
            title="Campaigns"
            description="Create and manage campaigns."
          />

          <AdminCard
            title="Campaign Administrators"
            description="Assign campaign administrators."
          />

          <AdminCard title="Users" description="Manage all users." />

          <AdminCard title="Approvals" description="Review pending requests." />

          <AdminCard title="Roles" description="Manage system roles." />

          <AdminCard title="Offices" description="Manage elective offices." />

          <AdminCard title="Audit Logs" description="View system activity." />

          <AdminCard
            title="System Settings"
            description="Configure the platform."
          />
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <h2>Existing Campaigns</h2>

        <div
          style={{
            marginTop: 20,
            background: "#ffffff",
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
                background: "#f3f4f6",
              }}
            >
              <tr>
                <th style={thStyle}>Campaign</th>
                <th style={thStyle}>Candidate</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td style={tdStyle}>{campaign.campaign_name}</td>

                  <td style={tdStyle}>{campaign.candidate_name}</td>

                  <td style={tdStyle}>
                    {campaign.active ? "🟢 Active" : "🔴 Inactive"}
                  </td>
                </tr>
              ))}

              {campaigns.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: 30,
                      textAlign: "center",
                    }}
                  >
                    No campaigns created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type AdminCardProps = {
  title: string;
  description: string;
};

function AdminCard({ title, description }: AdminCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,.08)",
        cursor: "pointer",
        transition: ".2s",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      <p
        style={{
          color: "#6b7280",
          marginBottom: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: 14,
};

const tdStyle: React.CSSProperties = {
  padding: 14,
  borderTop: "1px solid #e5e7eb",
};
