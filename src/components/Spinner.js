import { jsx as _jsx } from "react/jsx-runtime";
import "../Spinner.css"; // Make sure to create this CSS file for styling
const Spinner = () => {
    return (_jsx("div", { className: "spinner-container", children: _jsx("div", { className: "spinner" }) }));
};
export default Spinner;
