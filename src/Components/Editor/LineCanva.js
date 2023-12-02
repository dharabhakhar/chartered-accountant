import { useEffect, useRef, useState } from "react"

export default function Canvas({id, style }) {

    const [startDrawing, setStartDrawing] = useState(false)

    const canvasRef = useRef();
    
    const [_context, setContext] = useState(null);
    const [canvasHeight, setCanvasHeight] = useState(parseInt(style.height))
    const [canvasWidth, setCanvasWidth] = useState(parseInt(style.width))



  

    useEffect(
        () => {
            if (canvasRef)
                setContext(canvasRef.current.getContext("2d"));
        }, [canvasRef]
    )

    useEffect(() => {
        setCanvasHeight(parseInt(style.height));
        setCanvasWidth(parseInt(style.width))
    }, [style.height, style.width])


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
            console.log(oldCo.x, oldCo.y, event.nativeEvent.offsetX, event.nativeEvent.offsetY)
            _context.beginPath()
            _context.moveTo(oldCo.x, oldCo.y)
            _context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY)
            _context.stroke();

        }
    }


    return (






        <canvas style={{ ...style, backgroundColor: "transparent" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}

            onMouseUp={handleMouseUp}
            className=" " id={id} ref={canvasRef} onClick={(event) => console.log("offxy", event.nativeEvent.offsetX, event.nativeEvent.offsetY)} width={canvasWidth} height={canvasHeight} />

    )
}