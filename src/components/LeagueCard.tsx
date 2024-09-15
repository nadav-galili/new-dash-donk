import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
interface League {
  id: number;
  league_name: string;
  league_number: number;
  league_image: string;
  admin?: {
    id: number;
    nickName: string;
  };
  created_at: string;
  updated_at: string;
}

interface LeagueCardProps {
  league: League;
}
interface LeagueDetail {
  User: {
    id: number;
    nickName: string;
    image: string;
  };
  created_at: string;
  updated_at: string;
  is_admin: boolean;
}

type LeaguDetails = LeagueDetail[];

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const navigate = useNavigate();
  const [leagueDetails, setLeagueDetails] = useState<LeaguDetails>([]);
  ///get path
  // const isDashboard = useLocation().pathname === "/dashboard";
  const isLeague = useLocation().pathname === `/league/${league.id}`;

  const handleCardClick = () => {
    navigate(`/league/${league.id}`);
  };
  useEffect(() => {
    const getLeagesDetails = async () => {
      try {
        const data = await apiRequest({
          url: `/api/admin/getLeagueDetails/${league.id}`,
          method: "get",
        });
        setLeagueDetails(data.leagueDetails);
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
        console.log("error");
      }
    };
    getLeagesDetails();
  }, []);

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden max-w-sm"
      onClick={handleCardClick}>
      <img
        src={`https://backend-donk-images.s3.il-central-1.amazonaws.com/${league.league_image}`}
        alt={league.league_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{league.league_name}</h2>
        <p className="text-gray-700">League Number: {league.league_number}</p>
        <p className="text-gray-700 font-medium">
          Admin: {league?.admin?.nickName}
        </p>
        <p className="text-gray-600 text-sm">
          Created At: {dayjs(league.created_at).format("DD/MM/YYYY")}
        </p>
        <p className="text-gray-600 text-sm">
          Updated At: {dayjs(league.updated_at).format("DD/MM/YYYY")}
        </p>
      </div>
      <p className="text-lime-600 ps-4">Members count:{leagueDetails.length}</p>
      <div>
        {isLeague &&
          leagueDetails.map((leagueDetail) => (
            <div
              className="p-4 flex justify-between items-center w-full border-b border-gray-200"
              key={leagueDetail.User.id}>
              <div className="flex items-center space-x-4">
                <img
                  src={
                    leagueDetail.User.image.startsWith("https")
                      ? leagueDetail.User.image
                      : `https://backend-donk-images.s3.il-central-1.amazonaws.com/${leagueDetail.User.image}`
                  }
                  alt={leagueDetail.User.nickName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {leagueDetail.User.nickName}
                  </p>
                  {leagueDetail.is_admin && (
                    <p className="text-xs text-red-500">Admin</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Created At:{" "}
                  {dayjs(leagueDetail.created_at).format("DD/MM/YYYY")}
                </p>
                <p className="text-sm text-gray-600">
                  Updated At:{" "}
                  {dayjs(leagueDetail.updated_at).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeagueCard;
