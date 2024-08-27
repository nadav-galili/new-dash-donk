import React from "react";
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
declare const LeagueCard: React.FC<LeagueCardProps>;
export default LeagueCard;
