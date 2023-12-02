import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faObjectUngroup } from '@fortawesome/free-solid-svg-icons';



export default function HeaderCopyButton({ onCopy, isItemSelected,title }){
  const onButtonClick = () => {
    if (isItemSelected) {
      if(onCopy)onCopy();
    }
  };
  return (
    <Tooltip arrow title={title} placement="top"> 
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[rgb(55,151,165)]`}>
      <FontAwesomeIcon className='text-[18px]' icon={faObjectUngroup} />
    </div>
    </Tooltip>
  );
};

