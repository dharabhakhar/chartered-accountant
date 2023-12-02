import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";


const Image = ({ id, style, src,onClick, onKeyPress, focused }) => {

    // const [resizeMode, setResizeMode] = useState(false)
    // const [startResizing, setStartResizing] = useState(false);
    // const [originalSize, setOriginalSize] = useState({ height: "", width: "" })
    // const [originalAxes, setOriginalAxes] = useState({ x: "", y: "" })

    // function handleResize(event, _resizeEnum) {

    //     event.preventDefault();
    //     const element = document.getElementById(id);
    //     element.style.transition = "0.1s"
    //     switch (_resizeEnum) {

    //         case 1:
    //             resizeWhole(element);
    //             break;
    //         case 2:
    //             resizeX(element);
    //             break;
    //         case 3:
    //             resizeY(element);
    //             break;
    //     }
    // }

    // function resizeX(_element) {
    // }

    // function resizeY(_element) {
    // }

    // function resizeWhole(_element) {
    //     if (_element)

    //         _element.style.transform = "scale(1.01)";
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
   


    return (
        <div id={id} style={{...style,borderRadius : "inherit",transform : ""}}   className={`${focused && "  " } select-none  cursor-default pointer-events-none   outline-none overflow-hidden `}
          >
            <img src={src} alt="image" draggable={false} className="h-full w-full select-none "  />
         

        </div>
    )

}


export default Image;