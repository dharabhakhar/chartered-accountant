import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';


export default function HeaderRefreshButton({ onRefresh,title }){

  function handleClick(e) {
    if (onRefresh) {
      onRefresh()
    }
  }

  return (
    <Tooltip arrow title={title} placement="top">
    <div onClick={handleClick} className="w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#1a4f74] cursor-pointer">
      <FontAwesomeIcon className='text-[15px]' icon={faArrowsRotate} />
    </div>
    </Tooltip>
  );
};
