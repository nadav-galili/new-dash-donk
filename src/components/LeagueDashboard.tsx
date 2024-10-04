import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/apiService";
import LeagueCard from "./LeagueCard";

interface League {
  id: number;
  league_number: number;
  league_name: string;
  league_image: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
}

const LeagueDashboard: React.FC = () => {
  const { leagueId } = useParams<{ leagueId: string }>();
  const [league, setLeague] = useState<League | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchLeagueDetails = async () => {
      try {
        const data = await apiRequest({
          url: `/api/admin/getLeagueDetails/${leagueId}`,
          method: "get",
        });
        setLeague(data.league);
        setMessage(`Details for league ${data.league.league_name}`);
      } catch (error) {
        console.error("Failed to fetch league details:", error);
        setMessage("Failed to fetch league details.");
      }
    };

    fetchLeagueDetails();
  }, [leagueId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        League Dashboardff
      </h1>
      <p className="font-medium text-center">{message}</p>
      {league && <LeagueCard league={league} />}
    </div>
  );
};

export default LeagueDashboard;
