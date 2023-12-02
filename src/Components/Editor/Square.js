const Square = ({ id,   style, focused, children }) => {

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


    
   


    return (
        <div id={id} style={{...style,transform : ""} || {}} className={`h-[150px] w-[150px]  border-[1px]  cursor-default border-black pointer-events-none  outline-none ${(focused) && " "} `}
             >

{/* 
            {(resizeMode) && <>
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


export default Square;