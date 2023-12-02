import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';


export default function HeaderProjectFileButton({ onProjectFile,title,isItemSelected }){

  const handleClick =(e)=> {
    // if (isItemSelected) {
      if(onProjectFile) onProjectFile();
    // }
  }

  return (
    <Tooltip arrow title={title} placement="top">
    <div onClick={(e)=>handleClick(e)} 
    // disabled={!isItemSelected} 
    className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#99627A]`}>
      <FontAwesomeIcon className='text-[15px]' icon={faFileInvoice} />
    </div>
    </Tooltip>
  );
};
