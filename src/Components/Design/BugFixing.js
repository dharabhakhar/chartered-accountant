import { useEffect, useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux"
import {
    getCircles, getLines,
    getImages, getRectangles,
    getSelectedElement, getSquares,
    getTables, getTextboxes,
    setSelectedElement, setSelectedElementWrapper, getSelectedElementWrapper, getPageStyle, removeSelectedElement, saveEditorData, fetchEditorData,
    getFetchDataStatus, getSaveDataStatus, getDesignError, getDesignSaveError, getDesignFetchError
} from "../../Store/CustomSlice"
//icons and loaders
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RotatingSquare } from "react-loader-spinner";
import { alertColors } from "../../Utils/constants"
import PageLoader from "../../UIComponents/Loaders/PageLoader";
import { Alert, Snackbar } from "@mui/material";
//Components 
import RightNavbar from '../Editor/RightNav/RightNavbar';
import LeftNavbar from '../Editor/LeftNav/LeftNavbar';
import Table from "../Editor/Table";
import Circle from "../Editor/Circle";
import Image from "../Editor/Images";
import TextBoxDiv from "../Editor/TextBoxDiv";
import Square from "../Editor/Square";
import Rect from "../Editor/Rect";
import Line from "../Editor/Line";
import MovableContainer from "../Editor/Movable/MovableContainer";
//helpers
import { MoveElement, MoveHorizontal, MoveVertical } from "../../Utils/Editor/Move";
import { resizeByHeight, resizeByWidth, resizeElement } from "../../Utils/Editor/Resize";
import { useLocation, useSearchParams } from 'react-router-dom';
import { _getEncryptedString } from "../../Utils/APIs/FetchAPIs";
// import { _api } from "../../Utils/Config/axiosConfig";



export default function Design() {

    /**Helpers */
    const dispatch = useDispatch()

    // const __location = useLocation();
    // const active_report_id = __location.state.activeReportId;
    // const clientKey = __location.state.clientKey;


    /**Mutable State */
    const [resizeMode, setResizeMode] = useState(false)
    const [resizeMode_element, setResizeMode_element] = useState(false)
    const [selectedElementId, setSelectedElementId] = useState("");
    // const [editorPosition, setEditorPosition] = useState({ x: "", y: "" })
    const [startResizing, setStartResizing] = useState(false)
    const [resizeDirection, setResizeDirection] = useState();
  

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)
    const Rectangles = useSelector(getRectangles)
    const Squares = useSelector(getSquares)
    const Lines = useSelector(getLines)
    const Circles = useSelector(getCircles)
    const Textboxes = useSelector(getTextboxes)
    const Tables = useSelector(getTables)
    const Images = useSelector(getImages)
    const editorStyle = useSelector(getPageStyle)
    const selectedElementWrapper = useSelector(getSelectedElementWrapper);
    
    const pageStyle = useSelector(getPageStyle);

    /**Methods */
    function handleMouseMove(event) {
        if (selectedElementId) {
            let element = document.getElementById(selectedElementId);
            element.style.transition = "none"
            // const _left = (clientX - editorX) + "px"
            // const _top = (clientY - editorY) + "px"
            // element.style.left = _left;
            // element.style.top = _top
            // const _left = (parseInt(element.style.left) + event.movementX) + "px"
            // const _top = (parseInt(element.style.top) + event.movementY) + "px"

            let { movementX, movementY } = event;
            let { left, top } = MoveElement(element, movementX, movementY)
            console.log(pageStyle.width)

            // element.style.left = _left;
            // element.style.top = _top;

            dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left, top, startMove: true }))
            dispatch(setSelectedElement({ ...selectedElementWrapper, style: { ...selectedElement.style, left, top } }))

        }
    }

    function handleKeyboardMove(_element, direction, ctrl = false) {
        if (!_element) return;
        _element.style.transition = "0.1s"
        let offset = ctrl ? 40 : 10;
        let newPosition;
        switch (direction) {
            case 1:
                newPosition = MoveVertical(_element, -offset)
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, top: newPosition }))
                break;
            case 2:
                newPosition = MoveVertical(_element, offset)
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, top: newPosition }))
                break;
            case 3:
                newPosition = MoveHorizontal(_element, -offset)
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left: newPosition }))
                break;
            case 4:
                newPosition = MoveHorizontal(_element, offset)
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left: newPosition }))
                break;
            default:
                break;

        }
    }
    function handleKeyPress(event, wrapperId, childId) {
        // event.preventDefault();
        // console.log(event.key)
        let element;
        let newSize;
        let ctrl = event.ctrlKey;
        switch (event.key) {
            case "ArrowUp":
                element = document.getElementById(wrapperId)
                handleKeyboardMove(element, 1, ctrl); break;
            case "ArrowDown":
                element = document.getElementById(wrapperId)
                handleKeyboardMove(element, 2, ctrl); break;
            case "ArrowLeft":
                element = document.getElementById(wrapperId)
                handleKeyboardMove(element, 3, ctrl); break;
            case "ArrowRight":
                element = document.getElementById(wrapperId)
                handleKeyboardMove(element, 4, ctrl); break;
            case "Delete":
                // if (selectedElement.id.includes("rect")) {
                //     dispatch(removeRectangle(selectedElement.id))
                // }
                setResizeMode_element(false)
                setStartResizing(false)
                setResizeDirection(false)
                dispatch(removeSelectedElement({ id: selectedElement.id, name: selectedElement.name }))
                break;
            case "+":
                // handleKeyboardResize(childId, true)
                element = document.getElementById(childId);
                newSize = resizeElement(element, 5, 5)
                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))
                break;
            case "-":
                // handleKeyboardResize(childId, false)
                element = document.getElementById(childId);
                newSize = resizeElement(element, -5, -5)
                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))

                break;
            default:
                break;
        }
    }

    function handleMouseDown(event) {
        if (selectedElementId) {
            setSelectedElementId()
            return;
        }
        setSelectedElementId(event.target.id)
    }

    function handleMouseUp(event) {
        setSelectedElementId()
    }

    function handleClick(event, element, wrapperId, ignore = false) {
        if (ignore) return;
        dispatch(setSelectedElement(element))
        let _element = document.getElementById(wrapperId);
        _element.style.transition = "none"
        // const _left = (event.clientX - editorPosition.x) + "px"
        // const _top = (event.clientY - editorPosition.y) + "px"
        dispatch(setSelectedElementWrapper({ id: wrapperId, childId: element.id, name: element.name }))
    }

    function handleEditorClick(event) {
        event.preventDefault()
        if (event.target.id === "editor") {
            setSelectedElementId()
            dispatch(setSelectedElement({}))
        }
    }

    function handleMouseUp_resizeMode_element() {
        setStartResizing(false);
    }

    function handleMouseMove_resizeMode_element(event) {
        // if (startResizing) {
        //     // let element = document.getElementById(selectedElementId);

        //     let _child = document.getElementById(selectedElement.id);
        //     // const _width = (parseInt(_child.style.width) + event.movementX) + "px"
        //     resizeElement(_child, event.movementX, event.movementX)
        //     // _child.style.width = _width;
        //     // if (!selectedElement.id.includes("line")) {
        //     //     const _height = (parseInt(_child.style.height) + event.movementY) + "px"
        //     //     _child.style.height = _height;
        //     // }
        //     return;
        // }

        if (startResizing && resizeDirection) {

            let element = document.getElementById(selectedElement.id);
            let _element, newSize;
            switch (resizeDirection) {
                case 1:
                    newSize = resizeElement(element, -event.movementX, -event.movementY);
                    _element = element.parentElement;
                    MoveElement(_element, event.movementX, event.movementY)
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))

                    break;
                case 2:
                    // resizeFromTopCenter(element, event.movementY);
                    newSize = resizeByHeight(element, Math.abs(event.movementY));
                    _element = element.parentElement;
                    if (event.movementY < 0) {
                        MoveVertical(_element, event.movementY)
                    }
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize } }))
                    break;
                case 3:
                    newSize = resizeElement(element, event.movementX, -event.movementY);
                    _element = element.parentElement;
                    MoveVertical(_element, event.movementY)
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))

                    break;
                case 4:
                    newSize = resizeByWidth(element, event.movementX);
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, width: newSize } }))
                    break;
                case 5:
                    newSize = resizeElement(element, event.movementX, event.movementY);
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))
                    break;
                case 6:
                    newSize = resizeByHeight(element, event.movementY);
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize } }))
                    break;
                case 7:
                    // resizeFromLeftBottomCorner(element, event.movementX, event.movementY);
                    newSize = resizeElement(element, -event.movementX, event.movementY);
                    _element = element.parentElement;
                    MoveHorizontal(_element, event.movementX)
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, height: newSize.height, width: newSize.width } }))
                    break;
                case 8:
                    newSize = resizeByWidth(element, Math.abs(event.movementX));
                    _element = element.parentElement;
                    MoveHorizontal(_element, event.movementX)
                    dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, width: newSize } }))
                    break;
                default: break;
            }
            // resizeElement(element, event.movementX, event.movementY)
        }

    }


    

  



   


    /**rendering */
    return (
        <>
            
                    
                        <div className='bg-[#e3eff7] w-full h-full text-center flex justify-stretch items-center relative'>
                            {/* Loaders and Alerts */}
                           


                            {/*LeftNav  */}
                            <LeftNavbar />


                            {/* Editor */}
                            <section id="editor" className={`relative center bg-white  left-[5%]  h-4/6`}
                                style={pageStyle}

                                onPointerMove={handleMouseMove}
                                onClick={handleEditorClick}
                                onPointerLeave={handleMouseUp}
                                onMouseUp={handleMouseUp}
                            >
                               

                                {
                                    resizeMode_element &&
                                    <div className="absolute inset-0  "
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            console.log("elemnt resizing")
                                        }}
                                        onMouseUp={handleMouseUp_resizeMode_element}
                                        onPointerMove={handleMouseMove_resizeMode_element}
                                    ></div>
                                }

                                {
                                    Rectangles?.map(
                                        (rectangle, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={rectangle.id + "_rect_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, rectangle, rectangle.id + "_rect_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, rectangle.id + "_rect_wrap", rectangle.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                                style={{ top: rectangle.style.top, left: rectangle.style.left, transform: rectangle.style.transform, zIndex: rectangle.style.zIndex }}
                                                focused={selectedElement.id === rectangle.id}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={rectangle.id}
                                                resizeDirection={resizeDirection}
                                                setResizeDirection={setResizeDirection}
                                                name="rect"
                                            >
                                                <Rect id={rectangle.id} resizeMode={resizeMode_element} style={rectangle.style} />
                                            </MovableContainer>
                                        }
                                    )
                                }

                                {
                                    Lines?.map(
                                        (line, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={line.id + "_line_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, line, line.id + "_line_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, line.id + "_line_wrap", line.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                                style={{ top: line.style.top, left: line.style.left, rotate: line.style.rotate, transform: line.style.transform, zIndex: line.style.zIndex }}
                                                focused={selectedElement.id === line.id}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={line.id}
                                                resizeDirection={resizeDirection}
                                                setResizeDirection={setResizeDirection}
                                                name="line">
                                                <Line id={line.id} style={line.style} />
                                            </MovableContainer>
                                        }
                                    )
                                }

                                {
                                    Squares?.map(
                                        (square, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={square.id + "_square_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, square, square.id + "_square_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, square.id + "_square_wrap", square.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                                style={{ top: square.style.top, left: square.style.left, transform: square.style.transform, zIndex: square.style.zIndex }}
                                                focused={selectedElement.id === square.id}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={square.id}
                                                resizeDirection={resizeDirection}
                                                setResizeDirection={setResizeDirection}>
                                                <Square id={square.id} parentDomId={square.id + "_square_wrap"} style={{ ...square.style, width: square.style.size, height: square.style.size }} />

                                            </MovableContainer>
                                        }
                                    )
                                }
                                {
                                    Circles?.map(
                                        (circle, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={circle.id + "_circle_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, circle, circle.id + "_circle_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, circle.id + "_circle_wrap", circle.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                style={{ top: circle.style.top, left: circle.style.left, transform: circle.style.transform, zIndex: circle.style.zIndex }}
                                                focused={selectedElement.id === circle.id}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={circle.id}
                                                resizeDirection={resizeDirection}
                                                setResizeDirection={setResizeDirection}
                                                className={`flex bg-[${editorStyle.backgroundColor}]} p-0 justify-center items-center`}
                                            >
                                                <Circle style={circle.style} id={circle.id} focused={selectedElement.id === circle.id} />
                                            </MovableContainer>
                                        }
                                    )
                                }
                                {
                                    Tables?.map(
                                        (table, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={table.id + "_table_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, table, table.id + "_table_wrap", event.target.id !== table.id + "_table_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, table.id + "_table_wrap", table.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={table.id}
                                                setResizeDirection={setResizeDirection}
                                                resizeDirection={resizeDirection}
                                                style={{ top: table.style.top, left: table.style.left, transform: table.style.transform, zIndex: table.style.zIndex, }}
                                                className={` bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col`} focused={selectedElement.id === table.id} >
                                                <Table id={table.id} _table={table} style={table.style} focused={selectedElement.id === table.id} />

                                            </MovableContainer>
                                        }
                                    )
                                }
                                {
                                    Textboxes?.map(
                                        (textbox, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={textbox.id + "_textbox_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, textbox, textbox.id + "_textbox_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, textbox.id + "_textbox_wrap", textbox.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={textbox.id}
                                                setResizeDirection={setResizeDirection}
                                                resizeDirection={resizeDirection}
                                                style={{ top: textbox.style.top, left: textbox.style.left, transform: textbox.style.transform, zIndex: textbox.style.zIndex }}
                                                className={`bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col  `}
                                                focused={selectedElement.id === textbox.id} >
                                                <TextBoxDiv id={textbox.id} canShrink={textbox.canShrink} canGrow={textbox.canGrow} textboxData={textbox.data} style={textbox.style} />
                                            </MovableContainer>
                                        }
                                    )
                                }
                                {
                                    Images?.map(
                                        (image, index) => {
                                            return <MovableContainer setResizeMode={setResizeMode_element} resizeMode={resizeMode_element} key={index} id={image.id + "_image_wrap"} tabIndex={index}
                                                onClick={(event) => { handleClick(event, image, image.id + "_image_wrap") }}
                                                onKeyPress={(event) => handleKeyPress(event, image.id + "_image_wrap", image.id)}
                                                onMouseDown={handleMouseDown}
                                                onMouseUp={handleMouseUp}
                                                className={` bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col  `}
                                                style={{ top: image.style.top, left: image.style.left, transform: image.style.transform, zIndex: image.style.zIndex }}
                                                setStartResizing={setStartResizing}
                                                startResizing={startResizing}
                                                elementId={image.id}
                                                setResizeDirection={setResizeDirection}
                                                resizeDirection={resizeDirection}
                                                focused={selectedElement.id === image.id} >
                                                <Image id={image.id} style={image.style} src={image.src} />
                                            </MovableContainer>
                                        }
                                    )
                                }


                            </section>
                            
                            {/* Rightnav */}

                            <RightNavbar />
                        </div>
                    
            
        </>
    )
}