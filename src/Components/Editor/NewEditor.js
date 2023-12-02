import { useSelector, useDispatch } from "react-redux"
import { defaultPageStyle } from "../../Utils/DefaultStyles";
import {
    getCircles, getLines,
    getImages, getRectangles,
    getSelectedElement, getSquares,
    getTables, getTextboxes, setElements,
    setSelectedElement, setSelectedElementWrapper, getSelectedElementWrapper, getPageStyle, removeRectangle
} from "../../Store/CustomSlice"
import MovableCompnent from "./MovableComponent";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { useEffect, useState } from "react";
import Table from "./Table";
import Circle from "./Circle";
import Image from "./Images";
import TextBoxDiv from "./TextBoxDiv";
import Square from "./Square";
import Rect from "./Rect";
import { faCircleDot, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Line from "./Line";

export default function NewEditor() {

    /**Helpers */
    const dispatch = useDispatch()

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


    /**Mutable State */
    const [resizeMode, setResizeMode] = useState(false)
    const [selectedElementId, setSelectedElementId] = useState("");
    const [editorPosition, setEditorPosition] = useState({ x: "", y: "" })
    const [pageSelected, setPageSelected] = useState(false)

    /**Effects */
    useEffect(() => {
        //    alert("border changed")
        var element = document.getElementById('editor');
        var editor = element.getBoundingClientRect();
        let _border = parseInt(editorStyle.borderWidth);
        setEditorPosition({ x: editor.left - _border, y: editor.top - _border })
  

    }, [editorStyle.height, editorStyle.width, editorStyle.borderWidth])


    useEffect(
        () => {

            if (!selectedElement || !selectedElement.id) {
                return;
            }



            if (selectedElement.id.includes("rect")) {
                dispatch(setElements({
                    name: "rect",
                    elements: Rectangles.map((rect) => {
                        if (rect.id === selectedElement.id) {
                            return { ...selectedElement }
                        } else {
                            return rect
                        }
                    })
                }))
            }
            if (selectedElement.id.includes("square")) {
                dispatch(setElements({
                    name: "square",
                    elements: Squares.map((square) => {
                        if (square.id === selectedElement.id) {
                            return { ...selectedElement }
                        } else {
                            return square
                        }
                    })
                }))
            }
            if (selectedElement.id.includes("circle")) {
                dispatch(setElements({
                    name: "circle",
                    elements: Circles.map((circle) => {
                        if (circle.id === selectedElement.id) {
                            return { ...selectedElement }
                        } else {
                            return circle
                        }
                    })
                }))
            }
            if (selectedElement.id.includes("textbox")) {
                dispatch(setElements({
                    name: "textbox",
                    elements: Textboxes.map((textbox) => {
                        if (textbox.id === selectedElement.id) {
                            return { ...selectedElement }
                        } else {
                            return textbox
                        }
                    })
                }))
            }
            if (selectedElement.id.includes("table")) {
                dispatch(setElements({
                    name: "table",
                    elements: Tables.map((table) => {
                        if (table.id === selectedElement.id) {
                            return { ...selectedElement }
                        } else {
                            return table
                        }
                    })
                }))
            }
        }, [selectedElement]
    )

    useEffect(
        () => {
            if (pageSelected) {
                dispatch(setSelectedElement({ id: "editor", style: defaultPageStyle }))

            } else {
                dispatch(setSelectedElement({}))
            }
        }, [pageSelected]
    )

    /*Internal Methods */
    function handleMouseMove(event) {
        if (selectedElementId) {

            let element = document.getElementById(selectedElementId);
            element.style.transition = "none"
            // const _left = (clientX - editorX) + "px"
            // const _top = (clientY - editorY) + "px"
            // element.style.left = _left;
            // element.style.top = _top
            if (resizeMode) {
                // console.log("dnfbdhbfhdghfv",element.children[0],(parseInt(element.children[0].style.width) + event.movementX) + "px")
                let _child = element.children[0];
                const _width = (parseInt(_child.style.width) + event.movementX) + "px"
                _child.style.width = _width;
                if (!selectedElement.id.includes("line")) {
                    const _height = (parseInt(_child.style.height) + event.movementY) + "px"
                    _child.style.height = _height;
                }
                return;
            }

            const _left = (parseInt(element.style.left) + event.movementX) + "px"
            const _top = (parseInt(element.style.top) + event.movementY) + "px"
            element.style.left = _left;
            element.style.top = _top;

            dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left: _left, top: _top }))

        }
    }
    function handleKeyboardMove(_element, direction,ctrl=false) {
        if (!_element) return;
        _element.style.transition = "0.1s"
        var currentTop = parseInt(getComputedStyle(_element).top) || 0;
        var currentLeft = parseInt(getComputedStyle(_element).left) || 0;
        let offset = ctrl ? 40 : 10;
        switch (direction) {
            case 1:
                _element.style.top = (currentTop - offset) + 'px';
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, top: (currentTop - offset) + 'px' }))

                break;
            case 2:
                _element.style.top = (currentTop + offset) + 'px';
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, top: (currentTop + offset) + 'px' }))

                break;
            case 3:
                _element.style.left = (currentLeft - offset) + 'px';
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left: (currentLeft - offset) + "px" }))

                break;
            case 4:
                _element.style.left = (currentLeft + offset) + 'px';
                dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, left: (currentLeft + offset) + "px" }))

                break;
        }
    }
    function handleKeyPress(event, wrapperId, childId) {
        // event.preventDefault();
        let element = document.getElementById(wrapperId);
        let ctrl = event.ctrlKey;
  
        switch (event.key) {
            case "ArrowUp":
                handleKeyboardMove(element, 1,ctrl); break;
            case "ArrowDown":
                handleKeyboardMove(element, 2,ctrl); break;
            case "ArrowLeft":
                handleKeyboardMove(element, 3,ctrl); break;
            case "ArrowRight":
                handleKeyboardMove(element, 4,ctrl); break;
            case "Delete":
                console.log("deleteeeeeee", selectedElement.id)
                // if (selectedElement.id.includes("rect")) {
                //     dispatch(removeRectangle(selectedElement.id))
                // }
                document.getElementById(selectedElement.id).style.display = "none"
                dispatch(setSelectedElement({ id: "" }))
                break;
            case "+":
                handleKeyboardResize(childId, true)
                break;
            case "-":
                handleKeyboardResize(childId, false)
                break;
        }
  

    }

    function handleKeyboardResize(_id, increse) {
        const _element = document.getElementById(_id)
        const { height, width } = _element.style
        const _height = increse ? (parseInt(height) + 5) + "px" : (parseInt(height) - 5) + "px";
        const _width = increse ? (parseInt(width) + 5) + "px" : (parseInt(width) - 5) + "px";

        _element.style.height = _height
        _element.style.width = _width

        dispatch(setSelectedElementWrapper({ ...selectedElementWrapper, width: _width, height: _height }))
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
        setPageSelected(false)
        dispatch(setSelectedElement(element))
        let _element = document.getElementById(wrapperId);
        _element.style.transition = "none"
        const _left = (event.clientX - editorPosition.x) + "px"
        const _top = (event.clientY - editorPosition.y) + "px"

        dispatch(setSelectedElementWrapper({ id: wrapperId, top: _top, left: _left }))
    }



    return (
        <section className="flex items-center  min-h-screen justify-start w-full bg-[#E6E6E6]"  >

            <LeftNav width={"15%"} />


            <div className="bg-[#E6E6E6] h-full min-h-max  w-full relative  flex justify-center items-start  " >

                <div className="absolute top-9 right-[50%] z-[50] w-[1.5rem] h-[1.5rem] bg-white rounded-full cursor-pointer">
                    {
                        pageSelected ?
                            <FontAwesomeIcon className="h-full w-full hover:text-red-500  text-[#1d8e8e] animate__animated  animate__fadeIn duration-300 " icon={faCircleXmark} onClick={() => setPageSelected(false)} />
                            :
                            <FontAwesomeIcon className="h-full w-full text-[#1d8e8e] " icon={faCircleDot} onClick={() => setPageSelected(true)} />
                    }
                </div>

                <div id="editor" style={editorStyle} className={`${pageSelected && " border-[1px] border-dashed border-[#1d8e8e] shadow-[0_0_5px_#1d8e8e] bg-white "} animate__animated  animate__fadeIn duration-200 bg-white m-12 relative h-full w-full overflow-clip block`}
                    onPointerMove={handleMouseMove} onClick={(event) => {
                        event.preventDefault()
                        console.log(event.target)
                        if (event.target.id === "editor") {
                            setSelectedElementId()
                            dispatch(setSelectedElement({}))
                        }
                    }} onPointerLeave={handleMouseUp} onMouseUp={handleMouseUp}>

                    {
                        Rectangles.map(
                            (rectangle, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={rectangle.id + "_rect_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, rectangle, rectangle.id + "_rect_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, rectangle.id + "_rect_wrap", rectangle.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                    style={{ top: rectangle.style.top, left: rectangle.style.left }}
                                    focused={selectedElement.id === rectangle.id} >
                                    <Rect id={rectangle.id} resizeMode={resizeMode} style={rectangle.style} />
                                </MovableCompnent>
                            }
                        )
                    }

                    {
                        Lines.map(
                            (line, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={line.id + "_line_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, line, line.id + "_line_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, line.id + "_line_wrap", line.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                    style={{ top: line.style.top, left: line.style.left, rotate: line.style.rotate }}
                                    focused={selectedElement.id === line.id} >
                                    <Line id={line.id} style={line.style} />
                                </MovableCompnent>
                            }
                        )
                    }

                    {
                        Squares.map(
                            (square, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={square.id + "_square_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, square, square.id + "_square_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, square.id + "_square_wrap", square.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    className={`bg-[${editorStyle.backgroundColor}]} p-2`}
                                    style={{ top: square.style.top, left: square.style.left }}
                                    focused={selectedElement.id === square.id} >
                                    <Square id={square.id} parentDomId={square.id + "_square_wrap"} style={{ ...square.style, width: square.style.size, height: square.style.size }} />

                                </MovableCompnent>
                            }
                        )
                    }
                    {
                        Circles.map(
                            (circle, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={circle.id + "_circle_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, circle, circle.id + "_circle_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, circle.id + "_circle_wrap", circle.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    style={{ top: circle.style.top, left: circle.style.left, }}
                                    focused={selectedElement.id === circle.id}
                                    className={`flex bg-[${editorStyle.backgroundColor}]} p-0 justify-center items-center`}
                                >
                                    <Circle style={circle.style} id={circle.id} focused={selectedElement.id === circle.id} />
                                </MovableCompnent>
                            }
                        )
                    }
                    {
                        Tables.map(
                            (table, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={table.id + "_table_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, table, table.id + "_table_wrap", event.target.id !== table.id + "_table_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, table.id + "_table_wrap", table.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    style={{ top: table.style.top, left: table.style.left, }}
                                    className={` bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col`} focused={selectedElement.id === table.id} >
                                    <Table id={table.id} tableData={table.tableData} style={table.style} focused={selectedElement.id === table.id} />

                                </MovableCompnent>
                            }
                        )
                    }
                    {
                        Textboxes.map(
                            (textbox, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={textbox.id + "_textbox_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, textbox, textbox.id + "_textbox_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, textbox.id + "_textbox_wrap", textbox.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    style={{ height: textbox.canGrow ? "-webkit-fill-available" : "", top: textbox.style.top, left: textbox.style.left }}
                                    className={`bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col  `}
                                    focused={selectedElement.id === textbox.id} >
                                    <TextBoxDiv id={textbox.id} style={textbox.style} />
                                </MovableCompnent>
                            }
                        )
                    }
                    {
                        Images.map(
                            (image, index) => {
                                return <MovableCompnent setResizeMode={setResizeMode} resizeMode={resizeMode} key={index} id={image.id + "_image_wrap"} tabIndex={index}
                                    onClick={(event) => { handleClick(event, image, image.id + "_image_wrap") }}
                                    onKeyPress={(event) => handleKeyPress(event, image.id + "_image_wrap", image.id)}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}
                                    className={` bg-[${editorStyle.backgroundColor}]} p-2 flex flex-col  `}
                                    style={{ top: image.style.top, left: image.style.left }}
                                    focused={selectedElement.id === image.id} >

                                    <Image id={image.id} style={image.style} src={image.src} />
                                </MovableCompnent>
                            }
                        )
                    }
                </div>
            </div>

            <RightNav width={"15%"} />
        </section>

    )

}