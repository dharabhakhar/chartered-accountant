import Skeleton from '@mui/material/Skeleton';



export default function SkeletonLoaderForGrid({
  show
}) {
  return (
    <div>
      {show && (
        <div className='flex flex-col gap-y-[7px]'>
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={40} />
        </div>
      )}
    </div>
  );
};

