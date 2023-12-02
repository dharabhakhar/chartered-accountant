import { useDispatch, useSelector } from "react-redux";
import { getPageStyle, getSelectedElement, getSelectedElementWrapper, setPageStyle, setSelectedElement, setSelectedElementWrapper } from "../../Store/CustomSlice";
import { borderStylesEnum, getEnum } from "../../Utils/enums";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmarkCircle, faXmarksLines } from "@fortawesome/free-solid-svg-icons";

export default function RightNav({ width }) {

    /**Defaults */
    const defaultWidth = width || "100%";

    /**Helpers */
    const dispatch = useDispatch();

    /**Selectors */
    const pageStyle = useSelector(getPageStyle)
    const selectedElement = useSelector(getSelectedElement);
    const selectedElementWrapper = useSelector(getSelectedElementWrapper);

    /**Mutable State */
    const [dimension, setDimension] = useState({ top: "0px", left: "0px" })
    const [resizeUnit, setResizeUnit] = useState({ height: "px", width: "px" });
    const [uploadedBgImage, setUploadedBgImage] = useState("")
    const [uploadedBgImage_page, setUploadedBgImage_page] = useState("")

    const selectedDOMElement = useMemo(
        () => {

            return document.getElementById(selectedElement.id)

        }, [selectedElement.id]
    )

    const selectedWrapperDOMElement = useMemo(
        () => {

            return document.getElementById(selectedElementWrapper.id)

        }, [selectedElementWrapper.id]
    )

    /**Internal Methods */
    function handleImageUploadPage(event) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            dispatch(setPageStyle({ ...pageStyle, backgroundImage: "url('" + e.target.result + "')" }))

            setUploadedBgImage_page(e.target.result)
        }
        reader.readAsDataURL(file);
    }

    function handleImageUpload(event) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(e.target.result)
            document.getElementById(selectedElement.id).style.backgroundImage = "url('" + e.target.result + "')"
            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, backgroundImage: "url('" + e.target.result + "')" } }))
            // dispatch(setPageStyle({ ...pageStyle, backgroundColor: "none", backgroundImage: "url('" + e.target.result + "')" }))

            setUploadedBgImage(e.target.result)
        }
        reader.readAsDataURL(file);
    }

    /**Effects */
    useEffect(
        () => {
            if (selectedElement.id === "editor") {
                setResizeUnit({ height: "mm", width: "mm" })
                if (selectedElement && selectedElement.style && selectedElement.style.backgroundImage) {
                    if (selectedElement.style.backgroundImage === "none") {
                        setUploadedBgImage_page("")
                    } else {
                        setUploadedBgImage_page(selectedElement.style.backgroundImage)
                    }
                }
            } else {
                setResizeUnit({ height: "px", width: "px" })
                if (selectedElement && selectedElement.style && selectedElement.style.backgroundImage) {

                    if (selectedElement.style.backgroundImage === "none" || selectedElement.style.backgroundImage==="" ) {
                        setUploadedBgImage("")
                    } else {
                        setUploadedBgImage(selectedElement.style.backgroundImage)
                    }
                }
            }
        }, [selectedElement.id]
    )


    useEffect(() => {
        let _left = selectedWrapperDOMElement?.style?.left;
        let _top = selectedWrapperDOMElement?.style?.top;
        // console.log("position changed", _top, _left)
    }, [selectedWrapperDOMElement?.style?.top, selectedWrapperDOMElement?.style?.left])

    useEffect(
        () => {
            setDimension({ top: selectedElementWrapper.top, left: selectedElementWrapper.left })
        }, [selectedElementWrapper.top, selectedElementWrapper.left]
    )

    return (
        <>


            <div id="rightNav" className={`w-[${defaultWidth}] fixed z-[100] top-0 right-0 overflow-y-scroll w-max  bg-slate-500 h-full  items-start px-5 py-6`}>
                <div className="flex  flex-col gap-3 items-start">


                    {selectedElement.id && selectedElement.id !== "editor" ? <>

                        {selectedElement.id && selectedElementWrapper &&

                            Object.entries(selectedElementWrapper)?.map(
                                ([key, value], index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2">

                                            {

                                                (key === "left" || key === "top") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>

                                                    <input type="number"
                                                        value={parseInt(selectedWrapperDOMElement?.style[key] || value)} min={0} className="w-[5em] px-2" size={5} onChange={(event) => {
                                                            let element = document.getElementById(selectedElementWrapper.id);
                                                            element.style[key] = event.target.value + "px";

                                                            setDimension({ ...dimension, [key]: event.target.value + "px" })
                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                            dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, [key]: value }))
                                                        }} />
                                                </>
                                            }
                                        </div>
                                    )
                                })
                        }
                        {selectedElement?.style &&
                            Object.entries(selectedElement?.style)?.map(
                                ([key, value], index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2 text-sm">


                                            {

                                                (key === "color" || key === "borderColor") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="color" value={value} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style[key] = event.target.value;
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }

                                            {

                                                (key === "backgroundColor") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="color" value={value} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style[key] = event.target.value;
                                                        console.log("selectedElement", selectedElement, [key], event.target.value)
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }

                                            {

                                                (key === "borderStyle" || key === "fontStyle" || key === "textAlign" || key === "fontFamily" || key === "textDecoration" || key === "fontWeight" || key === "backgroundSize"
                                                    || key === "backgroundRepeat" || key === "backgroundPosition" || key === "backgroundAttachment" || key === "backgroundOrigin" || key === "backgroundClip" || key === "verticalAlign") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <select className="px-2 py-1 rounded-lg shadow-md cursor-pointer capitalize" onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);

                                                        element.style[key] = event.target.value;
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} value={value}  >{
                                                            getEnum(key).map((_enum, index) => {
                                                                return <option value={_enum} key={index}>{_enum}</option>
                                                            })
                                                        }</select>
                                                </>
                                            }
                                            {

                                                (key === "rotate") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="number" min={0} className="w-[5em] px-2" size={5} value={parseInt(value)} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style.rotate = event.target.value + "deg";
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }



                                            {

                                                (key === "backgroundImage") &&
                                                <>
                                                    <div className="flex w-full items-center gap-2">
                                                        <span className="text-white capitalize cursor-pointer">{key}</span>
                                                        <button type="button" className="text-[1rem] flex items-center gap-1 cursor-pointer bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[7rem] relative"
                                                        >
                                                            <input type="file" accept="image/*" className="absolute cursor-pointer opacity-0 inset-0 w-full h-full" onChange={handleImageUpload} />
                                                            <FontAwesomeIcon icon={faUpload} />
                                                            Image</button>
                                                    </div>
                                                   {selectedDOMElement.style.backgroundImage && selectedDOMElement.style.backgroundImage!="none" && <div title="Remove background Image" className={`  text-white bg-red-500 rounded-full hover:bg-white hover:text-red-500 cursor-pointer duration-200 `}>

                                                        <FontAwesomeIcon icon={faXmarkCircle} className="block text-[1.2rem]" onClick={() => {
                                                            setUploadedBgImage("")
                                                            document.getElementById(selectedElement.id).style.backgroundImage = "none"
                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, backgroundImage: "none" } }))
                                                        }} />
                                                    </div>}

                                                </>
                                            }



                                            {

                                                (key === "width" || key === "height" || key === "borderRadius" || key === "borderWidth" || key === "padding" || key === "fontSize" || key === "lineHeight" || key === "letterSpacing") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="number"
                                                        value={selectedDOMElement && selectedDOMElement?.style ? selectedDOMElement?.style[key].replace("px", "") : value?.replace("px", "")} min={0} className="w-[5em] px-2" size={5} onChange={(event) => {
                                                            let element = document.getElementById(selectedElement.id);
                                                            element.style[key] = event.target.value + "px";
                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                        }} />
                                                    {/* {
                                                        key === "height" && typeof selectedElement.canGrow !== undefined  && (
                                                            <div className="flex items-center gap-1 ">
                                                                <input type="checkbox" id="canGrow" className="cursor-pointer" checked={selectedElement.canGrow} onChange={(event) => { dispatch(setSelectedElement({ ...selectedElement, canGrow: event.target.checked })) }} />
                                                                <label htmlFor="canGrow" className="text-white cursor-pointer" >Grow</label>
                                                            </div>)
                                                    } */}

                                                </>
                                            }

                                            {

                                                (key === "size") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="number" min={0} className="w-[5em] px-2" size={5} value={parseInt(value)} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style.width = event.target.value + "px";
                                                        element.style.height = event.target.value + "px";
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }
                                            {

                                                (key === "opacity") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="number" className="w-[5em] px-2" size={5} value={value} max={10} min={0} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style[key] = event.target.value / 10;
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }

                                            {

                                                (key === "zIndex") &&
                                                <>
                                                    <span className="text-white capitalize">{key}</span>
                                                    <input type="number" className="w-[5em] px-2" size={5} value={value} max={10} min={0} onChange={(event) => {
                                                        let element = document.getElementById(selectedElement.id);
                                                        element.style[key] = event.target.value;
                                                        dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                    }} />
                                                </>
                                            }


                                        </div>

                                    )
                                })



                        }



                    </> :
                        <>
                            {selectedElement?.style &&
                                Object.entries(selectedElement?.style)?.map(
                                    ([key, value], index) => {
                                        return (
                                            <div key={index} className="flex items-center gap-2">

                                                {

                                                    (key === "width" || key === "height") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>
                                                        <div className="flex gap-2 items-center">


                                                            <input type="number"
                                                                value={selectedDOMElement && selectedDOMElement?.style ? selectedDOMElement?.style[key]?.replace(resizeUnit[key], "") : value?.replace(resizeUnit[key], "")} min={0} className="w-[5em] px-2" size={5} onChange={(event) => {
                                                                    let element = document.getElementById(selectedElement.id);
                                                                    element.style[key] = event.target.value + resizeUnit[key];
                                                                    dispatch(setPageStyle({ ...pageStyle, [key]: event.target.value + resizeUnit[key] }))
                                                                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value + resizeUnit[key] } }))
                                                                }} />

                                                            <select className="px-2 py-1 rounded-lg shadow-md cursor-pointer " onChange={(event) => {
                                                                dispatch(setPageStyle({ ...pageStyle, [key]: pageStyle[key]?.replace(resizeUnit[key], event.target.value) }))
                                                                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: selectedElement.style[key]?.replace(resizeUnit[key], event.target.value) } }))
                                                                setResizeUnit({ ...resizeUnit, [key]: event.target.value })
                                                            }} value={resizeUnit[key]}  >{
                                                                    getEnum("resizingUnits").map((_enum, index) => {
                                                                        return <option value={_enum} key={index}>{_enum}</option>
                                                                    })
                                                                }</select>
                                                        </div>
                                                    </>
                                                }

                                                {

                                                    (key === "borderStyle" || key === "fontStyle" || key === "textAlign" || key === "fontFamily" || key === "textDecoration" || key === "backgroundSize"
                                                        || key === "backgroundRepeat" || key === "backgroundPosition" || key === "backgroundAttachment" || key === "backgroundOrigin" || key === "backgroundClip") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>
                                                        <select className="px-2 py-1 rounded-lg shadow-md cursor-pointer capitalize" onChange={(event) => {
                                                            let element = document.getElementById(selectedElement.id);

                                                            element.style[key] = event.target.value;
                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                        }} value={value}  >{
                                                                getEnum(key).map((_enum, index) => {
                                                                    return <option value={_enum} key={index}>{_enum}</option>
                                                                })
                                                            }</select>
                                                    </>
                                                }

                                                {

                                                    (key === "borderRadius" || key === "borderWidth" || key === "padding" || key === "fontSize") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>
                                                        <input type="number"
                                                            value={selectedDOMElement && selectedDOMElement?.style ? selectedDOMElement?.style[key]?.replace("px", "") : value?.replace("px", "")} min={0} className="w-[5em] px-2" size={5} onChange={(event) => {
                                                                let element = document.getElementById(selectedElement.id);
                                                                element.style[key] = event.target.value + "px";
                                                                dispatch(setPageStyle({ ...pageStyle, [key]: event.target.value }))
                                                                // dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                            }} />
                                                    </>
                                                }
                                                {

                                                    (key === "color" || key === "borderColor") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>
                                                        <input type="color" value={value} onChange={(event) => {
                                                            let element = document.getElementById(selectedElement.id);
                                                            element.style[key] = event.target.value;
                                                            dispatch(setPageStyle({ ...pageStyle, [key]: event.target.value }))

                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                        }} />
                                                    </>
                                                }

                                                {

                                                    (key === "backgroundColor") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>
                                                        <input type="color" value={value} onChange={(event) => {
                                                            let element = document.getElementById(selectedElement.id);
                                                            element.style[key] = event.target.value;
                                                            dispatch(setPageStyle({ ...pageStyle, backgroundColor: event.target.value }))

                                                            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))
                                                        }} />
                                                    </>
                                                }
                                                {

                                                    (key === "backgroundImage") &&
                                                    <>
                                                        <div className="flex w-full items-center gap-2">
                                                            <span className="text-white capitalize cursor-pointer">{key}</span>
                                                            <button type="button" className="text-[1rem] flex items-center gap-2 cursor-pointer bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[7rem] relative"
                                                            >
                                                                <input type="file" accept="image/*" className="absolute cursor-pointer opacity-0 inset-0 w-full h-full" onChange={handleImageUploadPage} />
                                                                <FontAwesomeIcon icon={faUpload} />
                                                                Image</button>
                                                        </div>
                                                        <div title="Remove background Image" className={` ${uploadedBgImage_page ? " block " : " hidden "} text-white bg-red-500 rounded-full hover:bg-white hover:text-red-500 cursor-pointer duration-200 `}>

                                                            <FontAwesomeIcon icon={faXmarkCircle} className="block text-[1.2rem]" onClick={() => {
                                                                setUploadedBgImage_page("")
                                                                dispatch(setPageStyle({ ...pageStyle, backgroundImage: "none" }))

                                                                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, backgroundImage: "none" } }))
                                                            }} />
                                                        </div>

                                                    </>
                                                }

                                                {

                                                    (key === "backdropFilter") &&
                                                    <>
                                                        <span className="text-white capitalize">{key}</span>


                                                        <div className="flex gap-2 items-center">


                                                            <input type="number"
                                                                value={selectedDOMElement && selectedDOMElement?.style ? selectedDOMElement?.style[key]?.replace("px", "") : value?.replace(resizeUnit, "")} min={0} className="w-[5em] px-2" size={5} onChange={(event) => {
                                                                    let element = document.getElementById(selectedElement.id);
                                                                    element.style[key] = event.target.value + "px";
                                                                    dispatch(setPageStyle({ ...pageStyle, [key]: event.target.value }))

                                                                }} />

                                                            <select className="px-2 py-1 rounded-lg shadow-md cursor-pointer capitalize" onChange={(event) => {
                                                                let element = document.getElementById(selectedElement.id);
                                                                // console.log(event.target.value)
                                                                element.style[key] = event.target.value;
                                                                dispatch(setPageStyle({ ...pageStyle, [key]: event.target.value + "(5px)", "-webkit-backdrop-filter": event.target.value + "(5px)" }))
                                                                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [key]: event.target.value } }))

                                                            }} value={value}  >{
                                                                    getEnum(key).map((_enum, index) => {
                                                                        return <option value={_enum} key={index}>{_enum}</option>
                                                                    })
                                                                }</select>
                                                        </div>
                                                    </>
                                                }

                                            </div>)
                                    })
                            }
                        </>

                    }

                </div>
            </div>


        </>
    )
}