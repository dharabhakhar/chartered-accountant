import {  useRef  } from "react";
import { calculateFontSize } from "../../Utils/utils";
import { useDispatch } from "react-redux";
import { setTextboData } from "../../Store/CustomSlice";


export default function TextBoxDiv({ id, canGrow, textboxData, canShrink,   style,   focused }) {

    /**Helpers */
    const dispatch = useDispatch()

    /**Mutable State */
    const inputBoxRef = useRef(null)

  
    return (
        <div style={style ? { ...style,width:canGrow ? "auto" : style.width, transform: "" } : {}} id={id} border={2} className={` ${(focused) && "  z-[20]"}   outline-none   border-black cursor-move border   h-[30px]  `}
        >
            <textarea type="text" style={{ textDecoration: "inherit", letterSpacing: "inherit", fontStyle: "inherit", textAlign: "inherit", backgroundColor: "transparent", fontSize: canShrink ? calculateFontSize(style.width, style.fontSize) : "inherit" }} 
            ref={inputBoxRef} value={textboxData}
            onKeyDown={(e)=>e.stopPropagation()} 
            className="w-full bg-transparent h-full resize-none outline-none m-0 "
       
                cols={canGrow ? textboxData.length : ""}
                onChange={
                    (event) => {
                        dispatch(setTextboData({ id,data: event.target.value }))
                    }
                }
            ></textarea>
        
        </div>
    )
} 