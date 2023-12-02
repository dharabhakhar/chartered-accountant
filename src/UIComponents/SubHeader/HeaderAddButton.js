import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';


export default function HeaderAddButton({ onAdd, title }) {

  function handleClick(e) {
    if (onAdd) {
      onAdd()
    }
  }

  return (
    <Tooltip arrow title={title+"(ALT+N)"} placement="top">
      <div onClick={handleClick} className="w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-gradient-to-r from-[#259dab] to-[#2574ab] cursor-pointer">
        <FontAwesomeIcon className='text-[15px]' icon={faPlus} />
      </div>
    </Tooltip>
  );
};

