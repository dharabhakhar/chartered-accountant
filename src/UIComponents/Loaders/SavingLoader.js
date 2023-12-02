import { ThreeCircles } from "react-loader-spinner";

export default function SavingLoader() {
    return (
        <div className="absolute h-full w-full z-[10]  inset-0 flex justify-center items-center flex-col gap-1 bg-[rgba(255,255,255,0.5)]">

            {/* <ThreeDots
                height="60"
                width="60"
                radius="6"
                color="#259dab"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}

            /> */}

            <ThreeCircles
                height="45"
                width="45"
                color="#259dab"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
            <h1 className="text-[15px] text-[#259dab] font-semi select-none  translate-x-1">Processing...</h1>
        </div>
    )
}