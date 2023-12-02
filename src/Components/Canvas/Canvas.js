import { useEffect, useRef, useState } from "react"

export default function Canvas() {

    const [startDrawing, setStartDrawing] = useState(false)
    const [selectedShape, setSelectedShape] = useState("vector");
    const canvasRef = useRef();
    const [_canvas, setCanvas] = useState(null);
    const [_context, setContext] = useState(null);
    const [canvasHeight, setCanvasHeight] = useState(800)
    const [canvasWidth, setCanvasWidth] = useState(1500)

    const [shapes,setShapes] = useState( [
        { x: 50, y: 50, width: 50, height: 50, color: 'blue', isDragging: false },
        { x: 150, y: 150, width: 50, height: 50, color: 'red', isDragging: false }
      ])    ;
    
      

    useEffect(
        () => {
            setCanvas(document.getElementById("mycanvas"));
        }, []
    )

    useEffect(
        () => {
            if (canvasRef)
                setContext(canvasRef.current.getContext("2d"));
        }, [canvasRef]
    )


    function drawRect() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')

        ctx.fillRect(50, 50, 100, 75)
        ctx.fillStyle = "blue"
        ctx.fillRect(150, 150, 100, 75)
        ctx.fillStyle = "green"

        ctx.fillRect(250, 50, 100, 75)
        ctx.fillStyle = "red"

        ctx.fillRect(50, 350, 100, 75)

    }

    function drawLine() {
        const canvas = document.getElementById("mycanvas");
        const context = canvas.getContext("2d")
        context.beginPath();
        context.moveTo(0, 50)
        context.lineTo(250, 50)
        context.stroke()

    }

    function drawCircle() {
        const context = canvasRef.current.getContext("2d")
        context.beginPath()
        // context.moveTo(250,50)
        context.arc(250, 50, 30, 0, 360)
        context.stroke()
    }

    const [oldCo, setOldCo] = useState({ x: 0, y: 0 });
    const [snapshot, setSnapshot] = useState(null)

    function handleMouseDown(event) {
        if (_context) { _context.beginPath() }

        setOldCo({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY })
        setSnapshot(_context.getImageData(0, 0, canvasWidth, canvasHeight))
        setStartDrawing(true)
    }

    function handleMouseUp() {

        setStartDrawing(false)
    }

    function handleMouseMove(event) {
        if (startDrawing && _context) {
            if (snapshot) {
                _context.putImageData(snapshot, 0, 0)
            }
            switch (selectedShape) {
                case "rect":
                    let { offsetX: newX, offsetY: newY } = event.nativeEvent;
                    _context.strokeRect(newX, newY, oldCo.x - newX, oldCo.y - newY)
                    _context.stroke();
                    break;

                case "line":
                    console.log(oldCo.x, oldCo.y, event.nativeEvent.offsetX, event.nativeEvent.offsetY)
                    _context.beginPath()
                    _context.moveTo(oldCo.x, oldCo.y)
                    _context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
                    _context.stroke();
                    break;

                case "circle":
                    _context.beginPath()
                    // _context.moveTo(oldCo.x, oldCo.y)
                    let radius = Math.sqrt(Math.pow((oldCo.x - event.nativeEvent.offsetX), 2) + Math.pow((oldCo.y - event.nativeEvent.offsetY), 2));
                    _context.arc(oldCo.x, oldCo.y, radius, 0, 360)
                    _context.stroke()
                    break;


                case "vector":
                    _context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
                    _context.stroke();
                    break;
            }


        }
    }


    return (

        <div>

            <div className="flex gap-2 items-center m-4">
                <button className="px-8 py-1 bg-[#1d1d1d] text-white shadow-md rounded-lg" onClick={() => setSelectedShape("rect")}>Rect</button>
                <button className="px-8 py-1 bg-[#1d1d1d] text-white shadow-md rounded-lg" onClick={() => setSelectedShape("line")}>Line</button>
                <button className="px-8 py-1 bg-[#1d1d1d] text-white shadow-md rounded-lg" onClick={() => setSelectedShape("circle")}>Circle</button>
                <button className="px-8 py-1 bg-[#1d1d1d] text-white shadow-md rounded-lg" onClick={() => setSelectedShape("vector")}>Vector</button>
            </div>


            <canvas style={{ backgroundColor: "white" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="border mx-16" id="mycanvas" ref={canvasRef} onClick={(event) => console.log("offxy", event.nativeEvent.offsetX, event.nativeEvent.offsetY)} width={1500} height={800} />
        </div>
    )
}