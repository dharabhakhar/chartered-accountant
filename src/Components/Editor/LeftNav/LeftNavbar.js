import { useEffect, useState } from "react";
//Redux
import { useSelector, useDispatch } from "react-redux"
import { setSelectedElement, addCircle, addLine, addImage, addRectangle, addSquare, addTable, addTextbox, getPageStyle, getSelectedElement } from "../../../Store/CustomSlice";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faImage, faSquare } from '@fortawesome/free-regular-svg-icons'
//Headless
import { Disclosure, Transition } from '@headlessui/react';

//helpers
// import { defaultPageStyle } from "../../../Utils/DefaultStyles";

export default function LeftNavbar() {

    /**Helpers */
    const dispatch = useDispatch()

    /**Mutable State */
    const [pageSelected, setPageSelected] = useState(false)

    /**Selectors */
    const pageStyle = useSelector(getPageStyle)
    const selectedElement = useSelector(getSelectedElement)

    /**Effects */
    useEffect(
        () => {
            if (pageSelected) {
                dispatch(setSelectedElement({ id: "editor", style: pageStyle }))
            } else {
                dispatch(setSelectedElement({}))
            }
        }, [pageSelected]
    )

    useEffect(
        () => {
            if (selectedElement?.id !== "editor") {
                setPageSelected(false)
            }
        }, [selectedElement?.id]
    )
    /**Methods */
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

    //rendering
    return (
        <section className='left-side w-14 h-full bg-white ms-2 absolute z-[100] top-0 left-0'>
            <div className='pt-9 text-center'>
                <button className={` mb-2 w-full py-2 flex flex-col items-center justify-center ${pageSelected && " bg-gray-200 "} hover:bg-gray-100 h-[3rem] `}
                    onClick={() => setPageSelected((current) => !current)}>
                    <img src='/images/left side/frame-3-32.png' className='w-6' />
                </button>

                <button className='mb-2 w-full py-2 flex flex-col items-center justify-center hover:bg-gray-100  h-[3rem]'
                    onClick={() => addItem("table")}
                >
                    <img src='/images/left side/table.png' className='w-5' />
                </button>

                <button className='mb-2 w-full py-2 flex flex-col items-center justify-center hover:bg-gray-100  h-[3rem]'
                    onClick={() => addItem("textbox")}>
                    <img src='/images/left side/letter-t.png' className='w-4' />
                </button>

                <button className='relative mb-2 w-full py-2 hover:bg-gray-100  h-[3rem]'
                >
                    <FontAwesomeIcon icon={faImage} className='text-[#2574ab] text-[20px]' />
                    <input type="file" accept="image/*" className="absolute opacity-0 inset-0 w-full h-full" onChange={(handleImageUpload)} />

                </button>


                <Disclosure className="w-full">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between  h-[3rem] px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
                                <div className='mb-2 w-full  flex flex-col items-center justify-center   '>
                                    <img src='/images/left side/shape.png' className='w-6' />
                                </div>

                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Disclosure.Panel className=" flex flex-col text-sm  w-full border ">
                                    {/* rectangle */}
                                    <button className={` mb-2 w-full py-2 flex flex-col animate__animated  animate__slideInDown animate__faster items-center justify-center hover:bg-gray-100  h-[3rem] `}
                                        onClick={() => addItem("rect")} >
                                        <img src='/images/left side/Untitled-2.png' className='w-8' />
                                    </button>

                                    {/* square */}
                                    <button className='mb-2 w-full py-2 animate__animated  animate__slideInDown animate__faster hover:bg-gray-100  h-[3rem]'
                                        onClick={() => addItem("square")}
                                    >
                                        <FontAwesomeIcon icon={faSquare} className='text-[#2574ab] text-[22px]' />
                                    </button>

                                    {/* line */}
                                    <button className='mb-2 w-full py-2 flex flex-col animate__animated  animate__slideInDown animate__faster items-center justify-center hover:bg-gray-100  h-[3rem]'
                                        onClick={() => addItem("line")}
                                    >
                                        <img src='/images/left side/diagonal-line.png' className='w-6' />
                                    </button>

                                    {/* circle */}
                                    <button className='mb-2 w-full py-2 hover:bg-gray-100 animate__animated  animate__slideInDown animate__faster h-[3rem]'
                                        onClick={() => addItem("circle")}
                                    >
                                        <FontAwesomeIcon icon={faCircle} className='text-[#2574ab] text-[20px]' />
                                    </button>

                                </Disclosure.Panel>
                            </Transition>

                        </>
                    )}
                </Disclosure>

                <div>

                </div>

            </div>
        </section>

    )
}