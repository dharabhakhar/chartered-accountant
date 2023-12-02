import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faGear } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';


export default function HeaderBackupSettingButton({ onBackupSetting,isItemSelected,title }){

  function handleClick(e) {
    if(isItemSelected){
    if (onBackupSetting) {
      onBackupSetting()
    }}
  }

  return (
    <Tooltip arrow title={title} placement="top">
    <div onClick={handleClick} disabled={!isItemSelected} className={`${isItemSelected ? 'cursor-pointer' : 'cursor-not-allowed'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#215063] `}>
      <FontAwesomeIcon className='text-[15px]' icon={faGear} />
    </div>
    </Tooltip>
  );
};
