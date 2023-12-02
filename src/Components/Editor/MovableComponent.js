import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


const MovableCompnent = ({ id, resizeMode, setResizeMode, onMouseDown, tabIndex, onMouseUp, style, onClick, onKeyPress, focused, children, className }) => {

    /**Mutabble State */
    const [startResizing, setStartResizing] = useState(false);
    const [originalSize, setOriginalSize] = useState({ height: "", width: "" })
    const [originalAxes, setOriginalAxes] = useState({ x: "", y: "" })


    /**Internal Methods */
    function handleMouseDown(event) {
        onMouseDown(event)
        if (!resizeMode) {
        } else {

        }
    }
    function handleMouseUp(event) {
        if (!resizeMode) {
        }
        onMouseUp(event)
    }
    function prevent(event) {
        event.preventDefault()
    }
    
    return (
        <div id={id} style={style ? { ...style, zIndex: focused ? 20 : style.zIndex } : {}} className={`${className} animate__animated animate__fadeIn element cursor-move  absolute outline-none ${(focused) && " border border-dashed border-[#1d8e8e]  "}  `}
            onPointerDown={handleMouseDown} tabIndex={tabIndex}
            onClick={onClick}
            onKeyDown={onKeyPress}
            onPointerUp={handleMouseUp} onDoubleClick={(event) => { setResizeMode(!resizeMode) }} >

            {children}

            {(resizeMode && focused) && <>
                <FontAwesomeIcon id="_top_left_dot" icon={faCircleDot} className="absolute rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] top-[-0.5em] bg-white  left-[-0.5em]" />
                <FontAwesomeIcon id="_top_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e]  cursor-n-resize text-[8px] top-[-0.5em] bg-white  left-[50%]" />
                <FontAwesomeIcon id="_top_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize top-[-0.5em] bg-white  right-[-0.5em]" />

                <FontAwesomeIcon id="_center_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  left-[-0.5em]" />
                <FontAwesomeIcon id="_center_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  right-[-0.5em]" />


                <FontAwesomeIcon id="_bottom_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize bottom-[-0.5em] bg-white  left-[-0.5em]" />
                <FontAwesomeIcon id="_bottom_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] cursor-n-resize text-[8px] bottom-[-0.5em] bg-white  left-[50%]" />

                <FontAwesomeIcon id="_bottom_right_dot" onPointerDown={prevent} tabIndex={tabIndex}
                    onClick={prevent} onPointerUp={prevent} icon={faCircleDot} className="absolute  rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] bottom-[-0.5em] bg-white  right-[-0.5em]" />
            </>
            }

        </div>
    )

}


export default MovableCompnent;