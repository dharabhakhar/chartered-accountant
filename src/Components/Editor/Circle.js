import { useState } from "react";


const Circle = ({ id, onMouseDown,  onMouseUp, style }) => {

    const [resizeMode, setResizeMode] = useState(false)
    const [startResizing, setStartResizing] = useState(false);
    const [originalSize, setOriginalSize] = useState({ height: "", width: "" })
    const [originalAxes, setOriginalAxes] = useState({ x: "", y: "" })

    function handleResize(event, _resizeEnum) {

        event.preventDefault();
        const element = document.getElementById(id);
        element.style.transition = "0.1s"
        switch (_resizeEnum) {

            case 1:
                resizeWhole(element);
                break;
            case 2:
                resizeX(element);
                break;
            case 3:
                resizeY(element);
                break;
        }
    }

    function resizeX(_element) {
    }

    function resizeY(_element) {
    }

    function resizeWhole(_element) {
        if (_element)

            _element.style.transform = "scale(1.01)";
    }


    function handleMouseDown(event) {
        if (!resizeMode) {
            onMouseDown(event)
        } else {

        }
    }

    function handleMouseDown_resize(event) {

        const resizableDiv = document.getElementById(id);
        setStartResizing(true);
        setOriginalSize({ height: parseFloat(getComputedStyle(resizableDiv).height), width: parseFloat(getComputedStyle(resizableDiv).width) })
        setOriginalAxes({ x: event.clientX, y: event.clientY })
        event.preventDefault();


    }

    function handleMouseMove(event) {

        if (startResizing && resizeMode) {
            const resizableDiv = document.getElementById(id);
            var deltaX = event.clientX - originalAxes.x;
            var deltaY = event.clientY - originalAxes.y;

            resizableDiv.style.width = originalSize.width + deltaX + 'px';
            resizableDiv.style.height = originalSize.height + deltaY + 'px';
        }

    }
    function handleMouseUp_resize() {
        setStartResizing(false);
    }



    function handleMouseUp(event) {
        if (!resizeMode) {
            onMouseUp(event)
        }
    }


    return (
        <div id={id} style={style ? { ...style , height : style.size , width : style.size,transform : ""} : {}}  className={` rounded-full pointer-events-none  cursor-default   outline-none  `}
          >
            
         

        </div>
    )

}


export default Circle;