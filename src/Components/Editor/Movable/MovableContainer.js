//icons
import { faCircleDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { resizeByHeight, resizeByWidth, resizeElement } from "../../../Utils/Editor/Resize";

import { MoveElement, MoveHorizontal, MoveVertical } from "../../../Utils/Editor/Move";


export default function MovableContainer(
    { id, resizeMode, setResizeMode, onMouseDown, tabIndex, onMouseUp, style, onClick, onKeyPress, focused, children, className, setStartResizing, startResizing, elementId
        , resizeDirection, setResizeDirection, name }
) {
    /**Mutabble State */
    // const [startResizing, setStartResizing] = useState(false);
    // const [originalSize, setOriginalSize] = useState({ height: "", width: "" })
    // const [originalAxes, setOriginalAxes] = useState({ x: "", y: "" })

    /**Internal Methods */
    function handleMouseDown(event) {
        if (!resizeMode) {
            onMouseDown(event)
        } else {
            // setStartResizing(true)
        }
    }
    function handleMouseUp(event) {
        if (resizeMode) {
            if (startResizing) setStartResizing(false);
            return;
        }
        onMouseUp(event)
    }
    function prevent(event) {
        event.preventDefault()
    }

    function handleDoubleClick(event) {
        event.stopPropagation();
        setResizeMode(!resizeMode)
    }

    function handleStartResizing(event, _direction) {
        console.log("resize started")
        // if(resizeDirection)return;
        setResizeDirection(_direction)

        setStartResizing(true)
    }

    function handleStartResizing_pointerUp(event) {
        setStartResizing(false)
        setResizeDirection()
    }

    function handleStartResizing_pointerMove(event) {
        if (resizeMode) event.stopPropagation();

        if (startResizing && resizeDirection) {
            let element = document.getElementById(elementId);
            let _element;
            switch (resizeDirection) {
                case 1:
                    console.log(" left top")
                    resizeElement(element, -event.movementX, -event.movementY);
                    _element = element.parentElement;
                    MoveElement(_element, event.movementX, event.movementY)
                    break;
                case 2:
                    console.log("  top center")

                    // resizeFromTopCenter(element, event.movementY);
                    resizeByHeight(element, -event.movementY);
                    console.log(event.movementY)
                    _element = element.parentElement;
                    MoveVertical(_element, event.movementY)
                    break;
                case 3:
                    console.log(" right top")
                    resizeElement(element, event.movementX, -event.movementY);
                    _element = element.parentElement;

                    MoveVertical(_element, event.movementY)

                    break;
                case 4:
                    console.log(" right center")
                    resizeByWidth(element, event.movementX);
                    break;
                case 5:
                    console.log(" right bottom")
                    resizeElement(element, event.movementX, event.movementY);
                    break;
                case 6:
                    console.log(" bottom center")
                    resizeByHeight(element, event.movementY);
                    break;
                case 7:
                    console.log(" left bottom")
                    resizeElement(element, -event.movementX, event.movementY);
                    _element = element.parentElement;
                    MoveHorizontal(_element, event.movementX)
                    break;
                case 8:
                    console.log(" left center")
                    resizeByWidth(element, -(event.movementX));
                    _element = element.parentElement;
                    MoveHorizontal(_element, event.movementX)
                    break;
                default: break;
            }

            // resizeElement(element, event.movementX, event.movementY)
        }
    }

    // function handleResizeDirection(event, _direction) {
    //     setResizeDirection(_direction)
    // }

    return (
        <div id={id} style={style ? { ...style } : {}} className={`${className} animate__animated animate__fadeIn element ${!resizeMode ? " cursor-move " : " cursor-default "}  absolute outline-none ${(focused) && " border border-dashed border-[#1d8e8e]  "}  `}
            onPointerDown={handleMouseDown}
            onPointerMove={handleStartResizing_pointerMove}
            onClick={onClick}
            onKeyDown={onKeyPress}
            tabIndex={tabIndex}
            onPointerUp={handleMouseUp} onDoubleClick={handleDoubleClick} >

            {children}

            {(resizeMode || startResizing) && focused &&
                <div className="absolute inset-0  "
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log("element resizing")
                    }}>

                    {
                        (!name ||
                            name !== "line") &&


                        <>

                            <FontAwesomeIcon id="_top_left_dot" icon={faCircleDot} className="absolute rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] top-[-0.5em] bg-white  left-[-0.5em]"
                                onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 1)} />
                            <FontAwesomeIcon id="_top_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e]  cursor-n-resize text-[8px] top-[-0.5em] bg-white  left-[50%]"
                                onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 2)} />
                            <FontAwesomeIcon id="_top_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize top-[-0.5em] bg-white  right-[-0.5em]"
                                onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 3)} />

                            <FontAwesomeIcon id="_bottom_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] cursor-ne-resize bottom-[-0.5em] bg-white  left-[-0.5em]"
                                onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 7)} />
                            <FontAwesomeIcon id="_bottom_center_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] cursor-n-resize text-[8px] bottom-[-0.5em] bg-white  left-[50%]"
                                onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 6)} />

                            <FontAwesomeIcon id="_bottom_right_dot" onPointerDown={(e) => handleStartResizing(e, 5)}
                                onClick={prevent} onPointerUp={handleStartResizing_pointerUp}
                                onPointerMove={handleStartResizing_pointerMove}
                                icon={faCircleDot} className="absolute  rounded-full cursor-nw-resize text-[#1d8e8e] text-[8px] bottom-[-0.5em] bg-white  right-[-0.5em]" />

                        </>


                    }

                    <FontAwesomeIcon id="_center_left_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  left-[-0.5em]"
                        onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 8)} />
                    <FontAwesomeIcon id="_center_right_dot" icon={faCircleDot} className="absolute rounded-full text-[#1d8e8e] text-[8px] top-[50%] bg-white cursor-e-resize  right-[-0.5em]"
                        onClick={prevent} onPointerMove={handleStartResizing_pointerMove} onPointerUp={handleStartResizing_pointerUp} onPointerDown={(e) => handleStartResizing(e, 4)} />



                </div>

            }

        </div>
    )
}