import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { apiRequest } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
const LeagueCard = ({ league }) => {
    const navigate = useNavigate();
    const [leagueDetails, setLeagueDetails] = useState([]);
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
            }
            catch (error) {
                console.error("Failed to fetch leagues:", error);
                console.log("error");
            }
        };
        getLeagesDetails();
    }, []);
    return (_jsxs("div", { className: "bg-white shadow-md rounded-lg overflow-hidden max-w-sm", onClick: handleCardClick, children: [_jsx("img", { src: `https://backend-donk-images.s3.il-central-1.amazonaws.com/${league.league_image}`, alt: league.league_name, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: league.league_name }), _jsxs("p", { className: "text-gray-700", children: ["League Number: ", league.league_number] }), _jsxs("p", { className: "text-gray-700 font-medium", children: ["Admin: ", league?.admin?.nickName] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Created At: ", dayjs(league.created_at).format("DD/MM/YYYY")] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Updated At: ", dayjs(league.updated_at).format("DD/MM/YYYY")] })] }), _jsxs("p", { className: "text-lime-600 ps-4", children: ["Members count:", leagueDetails.length] }), _jsx("div", { children: isLeague &&
                    leagueDetails.map((leagueDetail) => (_jsxs("div", { className: "p-4 flex justify-between items-center w-full border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: leagueDetail.User.image.startsWith("https")
                                            ? leagueDetail.User.image
                                            : `https://backend-donk-images.s3.il-central-1.amazonaws.com/${leagueDetail.User.image}`, alt: leagueDetail.User.nickName, className: "w-10 h-10 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-800", children: leagueDetail.User.nickName }), leagueDetail.is_admin && (_jsx("p", { className: "text-xs text-red-500", children: "Admin" }))] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm text-gray-600", children: ["Created At:", " ", dayjs(leagueDetail.created_at).format("DD/MM/YYYY")] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Updated At:", " ", dayjs(leagueDetail.updated_at).format("DD/MM/YYYY")] })] })] }, leagueDetail.User.id))) })] }));
};
export default LeagueCard;
