import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';


export default function HeaderProjectDataBase({ onProjectDB,isItemSelected,title }){

  function handleClick(e) {
    if (isItemSelected) {
    if (onProjectDB) {
     onProjectDB()
    }}
  }

  return (
    <Tooltip arrow title={title} placement="top">
    <div onClick={handleClick} disabled={!isItemSelected} className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#22668D] `}>
      <FontAwesomeIcon className='text-[15px]' icon={faDatabase} />
    </div>
    </Tooltip>
  );
};