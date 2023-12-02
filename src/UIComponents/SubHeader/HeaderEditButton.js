import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';



export default function HeaderEditButton({ onEdit, isItemSelected,title }) {


  const onButtonClick = () => {
    if (isItemSelected) {
     if(onEdit) onEdit();
    }
  };
  return (
    <Tooltip arrow title={title+"(ALT+U)"} placement="top">
    <div onClick={(e) => onButtonClick()} disabled={!isItemSelected}  className={`${ isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#19a7ce]`}>
      <FontAwesomeIcon className='text-[15px]' icon={faPenToSquare} />
    </div>
    </Tooltip>
  );
};

