import React from "react";
import { useNavigate } from "react-router-dom";

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

const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/league/${league.id}`);
  };

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
          Created At: {new Date(league.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm">
          Updated At: {new Date(league.updated_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default LeagueCard;
