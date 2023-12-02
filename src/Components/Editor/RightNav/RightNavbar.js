//Redux
import { useSelector } from "react-redux"
import { getSelectedElement } from "../../../Store/CustomSlice";

//Componnets
import CommonStyles from './CommonStyles';
import BackgroundStyles from './BackgroundStyles';
import BorderStyles from './BorderStyles';
import TextStyles from './TextStyles';
import TableStyles from "./TableStyles";


export default function RightNavbar() {


    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)

    return (
        <>
            {selectedElement?.id &&
                (
                    <section className='right-side animate__animated animate__fadeInRight animate__faster shadow-[0_0_10px_rgba(0,0,0,0.2)] bg-white w-[295px] h-full absolute z-[100] top-0 right-0 overflow-y-scroll'>

                        <>
                            <div className='  text-center pt-1 text-slate-500 text-[14px]'>
                                <CommonStyles containsSize={selectedElement.name === "square" || selectedElement.name === "circle"} />
                            </div>

                            <div className='  text-center pt-3 text-slate-500 text-[14px]'>
                                <BackgroundStyles />
                            </div>

                            <div className='  text-center pt-3 text-slate-500 text-[14px]'>
                                <BorderStyles />
                            </div>
                            {
                                (selectedElement.name === "textbox" || selectedElement.name === "tableCell" || selectedElement.name === "table" ) &&

                                <div className='  text-center pt-3 text-slate-500 text-[14px]'>
                                    <TextStyles />
                                </div>
                            }

                            <div className='  text-center pt-3 text-slate-500 text-[14px]'>
                                <TableStyles />
                            </div>

                        </>


                    </section>
                )
            }
        </>
    )

}