import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';



export default function HeaderActivateButton({ onActivate, isItemSelected,title }) {
  const onButtonClick = () => {
    if (isItemSelected) {
     if(onActivate) onActivate();
    }
  };

  return (
    <Tooltip arrow title={title+"(ALT+A)"} placement="top">
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#3a6d7e]`}>
      <FontAwesomeIcon className='text-[15px]' icon={faCheck} />
    </div>
    </Tooltip>
  );
};

