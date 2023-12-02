import { useSelector } from "react-redux";
import { getSelectedElement, setSelectedElement } from "../../../Store/CustomSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function TableStyles() {

    /**Helpers */
    const dispatch = useDispatch()

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)


    /**Mutable State */
    const [canGrow, setCanGrow] = useState(false);
    const [canShrink, setCanShrink] = useState(false);

    /**Effects */
    useEffect(
        () => {
            if (selectedElement.name === "tableCell") {

                setCanGrow(selectedElement.canGrow)
                setCanShrink(selectedElement.canShrink)
            }

        }, [selectedElement]
    )

     /**Methods */
    // function modifySelected(property, value) {
    //     try {
    //         // selectedDOMElement.style[property] = value
    //         dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [property]: value } }))

    //     } catch (_err) {
    //         console.log("commonstyle_component modifySelected_method", _err)
    //     }
    // }


    return (
        <>
            {
                (selectedElement.name === "tableCell" || selectedElement.name === "textbox")

                &&
                <>

                    <div className='mt-2 text-left flex justify-start items-center gap-1'>
                        <input type="checkbox" disabled={canShrink} checked={canGrow} id="selected_elem_cangrow" onChange={(event) => {
                            let _value = !canGrow;
                            setCanGrow(!canGrow)
                            dispatch(setSelectedElement({ ...selectedElement, canGrow: _value ,canShrink : _value ? false : selectedElement.canShrink }))
                        }} /><label htmlFor="selected_elem_cangrow" className="select-none cursor-pointer">Grow</label>
                    </div>

                    <div className='mt-2 text-left flex justify-start items-center gap-1'>
                        <input type="checkbox" disabled={canGrow} checked={canShrink} id="selected_elem_canshrink" onChange={(event) => {
                            let _value = !canShrink;
                            setCanShrink(!canShrink)
                            dispatch(setSelectedElement({ ...selectedElement, canShrink: _value ,canGrow : _value ? false : selectedElement.canGrow}))
                        }} /><label htmlFor="selected_elem_canshrink" className="select-none cursor-pointer">Shrink</label>
                    </div>


                </>

            }
        </>
    )
}