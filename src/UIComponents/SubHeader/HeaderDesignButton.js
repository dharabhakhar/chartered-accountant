import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import { faObjectGroup, faObjectUngroup, faPager } from '@fortawesome/free-solid-svg-icons';



export default function HeaderDesignButton({ onDesign, isItemSelected,title }){
  const onButtonClick = () => {
    if (isItemSelected) {
      if(onDesign)onDesign();
    }
  };
  return (
    <Tooltip arrow title={title} placement="top"> 
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#535f81]`}>
      <FontAwesomeIcon className='text-[18px]' icon={faObjectGroup} />
    </div>
    </Tooltip>
  );
};

