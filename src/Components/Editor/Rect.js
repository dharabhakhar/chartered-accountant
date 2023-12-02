import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


const Rect = ({ id, onMouseDown, tabIndex, onMouseUp, style, onClick, onKeyPress, focused, children }) => {

    // const [resizeMode, setResizeMode] = useState(false)
    // const [startResizing, setStartResizing] = useState(false);
    // const [originalSize, setOriginalSize] = useState({ height: "", width: "" })
    // const [originalAxes, setOriginalAxes] = useState({ x: "", y: "" })

    // function handleResize(event, _resizeEnum) {

    // }

    // function resizeX(_element) {
    // }

    // function resizeY(_element) {
    // }

    // function resizeWhole(_element) {
    //     if (_element)

    //         _element.style.transform = "scale(1.01)";
    // }


    // function handleMouseDown(event) {
    //     if (!resizeMode) {
    //         onMouseDown(event)
    //     } else {

    //     }
    // }

    // function handleMouseDown_resize(event) {
    //     const resizableDiv = document.getElementById(id);
    //     setStartResizing(true);
    //     setOriginalSize({ height: parseFloat(getComputedStyle(resizableDiv).height), width: parseFloat(getComputedStyle(resizableDiv).width) })
    //     setOriginalAxes({ x: event.clientX, y: event.clientY })
    //     event.preventDefault();

    // }

    // function handleMouseMove(event) {

    //     if (startResizing && resizeMode) {
    //         const resizableDiv = document.getElementById(id);
    //         var deltaX = event.clientX - originalAxes.x;
    //         var deltaY = event.clientY - originalAxes.y;

    //         resizableDiv.style.width = originalSize.width + deltaX + 'px';
    //         resizableDiv.style.height = originalSize.height + deltaY + 'px';
    //     }

    // }
    // function handleMouseUp_resize() {
    //     setStartResizing(false);
    // }



    // function handleMouseUp(event) {
    //     if (!resizeMode) {
    //         onMouseUp(event)
    //     }
    // }


    return (
    <div id={id} style={style ? {...style,transform : ""} : {}} className={`h-[2cm] w-[5cm] element border-[1px]  cursor-default border-black  pointer-events-none outline-none ${(focused) && " "} `}
            onClick={onClick}
           >

            {/* {(resizeMode) && <>
                <FontAwesomeIcon id="_top_left_dot" icon={faCircleDot} className="absolute rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] top-[-0.5em] bg-white  left-[-0.5em]" />
                <FontAwesomeIcon id="_top_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e]  cursor-n-resize text-[8px] top-[-0.5em] bg-white  left-[50%]" />
                <FontAwesomeIcon id="_top_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize top-[-0.5em] bg-white  right-[-0.5em]" />

                <FontAwesomeIcon id="_center_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  left-[-0.5em]" />
                <FontAwesomeIcon id="_center_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  right-[-0.5em]" />


                <FontAwesomeIcon id="_bottom_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize bottom-[-0.5em] bg-white  left-[-0.5em]" />
                <FontAwesomeIcon id="_bottom_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] cursor-n-resize text-[8px] bottom-[-0.5em] bg-white  left-[50%]" />

                <FontAwesomeIcon id="_bottom_right_dot" onMouseMove={handleMouseMove} onMouseUp={(event) => handleMouseUp_resize()} onMouseDown={(event) => handleMouseDown_resize(event, 1)} icon={faCircleDot} className="absolute rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] bottom-[-0.5em] bg-white  right-[-0.5em]" />
            </>
            } */}
            {children}

        </div>
    )

}


export default Rect;