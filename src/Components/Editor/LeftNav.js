import { useDispatch } from "react-redux";
import { addCircle, addLine, addImage, addRectangle, addSquare, addTable, addTextbox } from "../../Store/CustomSlice";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

export default function LeftNav({ width }) {

    /**Defaults */
    const defaultWidth = width || "100%";

    /**Helpers */
    const dispatch = useDispatch();

    /**Internal Methods */
    const addItem = (item) => {
        switch (item) {
            case "rect":
                dispatch(addRectangle())
                break;
            case "square":
                dispatch(addSquare())
                break;
            case "circle":
                dispatch(addCircle())
                break;
            case "textbox":
                dispatch(addTextbox())
                break;
            case "table":
                dispatch(addTable())
                break;
            case "line":
                dispatch(addLine())
                break;
                default : break;

        }

    }

    function handleImageUpload(event) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            dispatch(addImage(e.target.result))
        }
        reader.readAsDataURL(file);
    }

    // function savePage() {
    //     const _editor = document.getElementById("editor");

    //     html2canvas(_editor, {
    //         scale: 2, // Increase this value to improve resolution
    //         // other options...
    //     }).then(function (canvas) {
    //         document.getElementById("root").appendChild(canvas);
    //     });
    //     console.log("editor", _editor)

    // }

    // const handleGeneratePdf = () => {

    //     const _editor = document.getElementById("editor");
    //     const doc = new jsPDF({
    //         orientation: "landscape",
    //         unit: "px",
    //         format: [800, 800]
    //     });

    //     doc.setFont('Inter-Regular', 'normal');

    //     doc.html(_editor, {
    //         async callback(doc) {
    //             await doc.save('document');
    //         },
    //     });
    // };

    return (
        <>


            <div id="leftNav" className={`w-[${defaultWidth}] bg-slate-500 h-full fixed z-[100] top-0 left-0 flex flex-col gap-3 items-center py-4`}>
                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("rect")}>Rectangle</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("square")}>Square</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("line")}>Line</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("circle")}>Circle</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("textbox")}>Textbox</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => addItem("table")}>Table</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem] relative"
                >
                    <input type="file" accept="image/*" className="absolute opacity-0 inset-0 w-full h-full" onChange={(handleImageUpload)} />
                    Image</button>
{/* 
                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => savePage()}>Save</button>

                <button type="button" className="text-[1rem] bg-slate-50 px-5 py-2 shadow-md rounded-lg w-[8rem]"
                    onClick={() => handleGeneratePdf()}>PDF</button> */}

            </div>


        </>
    )
}