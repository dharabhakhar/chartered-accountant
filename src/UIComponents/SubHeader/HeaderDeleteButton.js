import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';



export default function HeaderDeleteButton({ onDelete, isItemSelected,title }){
  const onButtonClick = () => {
    if (isItemSelected) {
      if(onDelete)onDelete();
    }
  };
  return (
    <Tooltip arrow title={title+"(ALT+X)"} placement="top"> 
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#d9534f]`}>
      <FontAwesomeIcon className='text-[15px]' icon={faTrashCan} />
    </div>
    </Tooltip>
  );
};

