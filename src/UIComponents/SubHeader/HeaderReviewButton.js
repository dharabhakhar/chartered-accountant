import GradingIcon from '@mui/icons-material/Grading';
import { Tooltip } from '@mui/material';

export default function HeaderReviewButton({ onReview, isItemSelected, title }) {

  function handleClick(e) {
    if (isItemSelected) {
      if (onReview) {
        onReview()
      }
    }
  }

  return (
    <Tooltip arrow title={title} placement="top">

      <div disabled={!isItemSelected} onClick={handleClick} className={`${!isItemSelected ? 'cursor-not-allowed' : 'cursor-pointer'} w-[36px] h-[36px] rounded-[5px] flex justify-center items-center text-white bg-[#0abaef]`}>
        <GradingIcon sx={{ fontSize: '18px' }}  />
      </div>
    </Tooltip>

  )
}