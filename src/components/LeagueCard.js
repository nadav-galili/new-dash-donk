import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const LeagueCard = ({ league }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/league/${league.id}`);
    };
    return (_jsxs("div", { className: "bg-white shadow-md rounded-lg overflow-hidden max-w-sm", onClick: handleCardClick, children: [_jsx("img", { src: `https://backend-donk-images.s3.il-central-1.amazonaws.com/${league.league_image}`, alt: league.league_name, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: league.league_name }), _jsxs("p", { className: "text-gray-700", children: ["League Number: ", league.league_number] }), _jsxs("p", { className: "text-gray-700 font-medium", children: ["Admin: ", league?.admin?.nickName] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Created At: ", new Date(league.created_at).toLocaleDateString()] }), _jsxs("p", { className: "text-gray-600 text-sm", children: ["Updated At: ", new Date(league.updated_at).toLocaleDateString()] })] })] }));
};
export default LeagueCard;
