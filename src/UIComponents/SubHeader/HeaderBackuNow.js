import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCloudArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';



export default function HeaderBackupNowButton({ onBackupNow, isItemSelected,title }){
  const onButtonClick = () => {
    if (isItemSelected) {
      if(onBackupNow)onBackupNow();
    }
  };
  return (
    <Tooltip arrow title={title} placement="top"> 
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#176B87] ms-2`}>
      <FontAwesomeIcon className='text-[15px]' icon={faCloudArrowUp} />
    </div>
    </Tooltip>
  );
};

