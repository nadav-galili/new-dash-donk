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
type Leagues = League[];

const Dashboard: React.FC = () => {
  const [leagues, setLeagues] = useState<Leagues>([]);
  const [message, setMessage] = useState<string>("");
  const [gamesCount, setGamesCount] = useState<number>(0);
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [leagueCount, setLeagueCount] = useState<number>(0);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await apiRequest({
          url: "/api/admin/getLeagues",
          method: "get",
        });
        setLeagues(data.leagues as League[]);

        setGamesCount(data.gamesCount as number);
        setPlayersCount(data.userCount as number);
        setLeagueCount(data.leagueCount as number);

        setMessage("Leagues fetched successfully");
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
        setMessage("Failed to fetch leagues.");
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      <p className="text-center text-1xl text-lime-600">{message}</p>
      <p className="text-center text-cyan-600 text-xl font-bold">
        Games Played: {gamesCount}
      </p>
      <a href="/users" className="flex justify-center">
        <p className="text-center underline text-cyan-600 text-xl font-bold">
          Players Registered: {playersCount}
        </p>
      </a>
      <p className="text-center text-cyan-600 text-xl font-bold">
        Leagues Created: {leagueCount}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
