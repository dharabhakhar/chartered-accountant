
import { ThreeCircles } from "react-loader-spinner";


export default function PageLoader({ show, title, noOpacity }) {
  return (
    <div>
      {show && (
        <div className={` z-[199] absolute inset-0  h-full w-full 0 bg-[rgba(255,255,255)]  flex justify-center items-center animate__animated  animate__fadeIn ${!noOpacity && "bg-opacity-30"} `}>
          <div className="flex flex-col gap-[5px] justify-center items-center animate__animated  animate__fadeIn">

            <ThreeCircles
              height="55"
              width="55"
              color="#259dab"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />

            <div className="font-mulish text-[#259dab]  text-[16px] select-none">{title || "Fetching Data..."}</div>
          </div>
        </div>
      )}
    </div>
  );
};