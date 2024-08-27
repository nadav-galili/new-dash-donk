import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/apiService";
import LeagueCard from "./LeagueCard";

interface League {
  id: number;
  league_name: string;
  league_number: number;
  league_image: string;
  admin: {
    id: number;
    nickName: string;
  };
  created_at: string;
  updated_at: string;
}

const Dashboard: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = (await apiRequest({
          url: "/api/admin/getLeagues",
          method: "get",
        })) as League[];
        setLeagues(data);
        setMessage("Leagues fetched successfully");
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
        console.log("error");
        setMessage("Failed to fetch leagues.");
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-semibold mb-4">
        Admin Dashboard
      </h1>
      <p className="text-center text-1xl text-lime-600">{message}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
