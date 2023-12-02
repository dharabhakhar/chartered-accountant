import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';



export default function HeaderDeactiveButton({ onDeactivate, isItemSelected, title }) {
  const onButtonClick = (e) => {
    if (isItemSelected) {
      if (onDeactivate) onDeactivate();
    }
  };
  return (
    <Tooltip arrow title={title+"(ALT+R)"} placement="top">
      <div onClick={onButtonClick} disabled={ !isItemSelected} className={`${ isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#e6ad5c]`}>
        <FontAwesomeIcon className='text-[15px]' icon={faBan} />
      </div>
    </Tooltip>
  );
};

