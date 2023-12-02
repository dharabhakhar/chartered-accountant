import { faFileText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from '@mui/material';

export default function HeaderReportButton({ onReportButtomClick, title }) {
    function handleClick() {
        if (onReportButtomClick) {
            onReportButtomClick()
        }
    }
    return (
        <Tooltip arrow title={title} placement="top">
            <div onClick={handleClick} className="w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-gradient-to-r from-[#259dab] to-[#2574ab] cursor-pointer">
                <FontAwesomeIcon icon={faFileText} className="text-white" />
            </div>
        </Tooltip>
    )
}