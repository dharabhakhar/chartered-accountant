import { Fragment, useEffect, useMemo, useState } from "react"
//Redux
import { useSelector, useDispatch } from "react-redux"
import { getSelectedElement, getSelectedElementWrapper, setSelectedElement, getTables, setSelectedElementWrapper } from "../../../Store/CustomSlice";
//icons
import { faAngleDown, faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//UI
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Tooltip } from "react-tooltip"
//Helpers
import { getEnum } from "../../../Utils/enums"


export default function CommonStyles({ containsSize }) {

    /**helpers */
    const dispatch = useDispatch();

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)
    const tables = useSelector(getTables);
    const selectedWrapperElement = useSelector(getSelectedElementWrapper);

    /**Mutable State */
    const [resizeUnit, setResizeUnit] = useState({ height: "px", width: "px" });
    // const selectedDOMElement = useMemo(
    //     () => {
    //         return document.getElementById(selectedElement.id)
    //     }, [selectedElement.id]
    // )
    const selectedWrapperDOMElement = useMemo(
        () => {
            return document.getElementById(selectedWrapperElement.id)
        }, [selectedWrapperElement.id]
    )
    const hideXY = useMemo(
        () => {
            if (selectedElement.name === "tableCell") {
                return true
            }
        }, [selectedElement?.name]
    )
    const hideRotate = useMemo(
        () => {
            if (selectedElement.name === "tableCell") {
                return true
            }
        }, [selectedElement?.name]
    )



    /**Methods */
    function modifySelected(property, value) {
        try {
            // selectedDOMElement.style[property] = value
            if (selectedElement?.name === "tableCell") {
                if (property === "width") {
                    const currentTable = tables[0];
                    const rows = currentTable?.tableData?.rows;
                    const { data, ...rest } = selectedElement;
                    rows.forEach((row, index) => {
                        dispatch(
                            setSelectedElement({
                                ...rest,
                                id: `table_cell_${index + 1}_${rest.columnId.slice(-1)}`,
                                rowId: index + 1,
                                style: { ...rest.style, [property]: value },
                            })
                        );
                    });
                }
            } else {
                dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [property]: value } }))
            }
        } catch (_err) {
            console.log("commonstyle_component modifySelected_method", _err)
        }
    }

    function modifySelectedWrapper(property, value) {
        try {
            selectedWrapperDOMElement.style[property] = value
            dispatch(setSelectedElementWrapper({ ...selectedWrapperElement, [property]: value }))
        } catch (_err) {
            console.log("commonstyle_component modifySelected_method", _err)
        }
    }

    /**Effects */
    useEffect(
        () => {
            if (selectedElement.id === "editor") {
                const _widthUnit = selectedElement.style?.width.match(/[a-zA-Z]+/g).join('')
                const _heightUnit = selectedElement.style?.height.match(/[a-zA-Z]+/g).join('')
                console.log(_widthUnit, _heightUnit)
                setResizeUnit({ height: _heightUnit, width: _widthUnit })
            }
        }, [selectedElement?.id]
    )


    return (
        <Disclosure defaultOpen={true} className="w-full ">
            {({ open }) => (
                <>
                    <Disclosure.Button className="ps-2 w-full  text-left  justify-between items-center py-2 mb-0 cursor-pointer hover:bg-gray-200 text-[#2574ab] bg-gray-100">
                        Common
                        <div className=' text-sm float-right pr-[25px] inline'>

                            <FontAwesomeIcon icon={faAngleDown} className={`${open && "  rotate-180 "} duration-200  `} />
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
                        <Disclosure.Panel className=" ps-3 pe-2 ">
                            {
                                selectedElement.id === "editor"
                                    ?
                                    <>
                                        <div className='text-left mt-3'>
                                            <div className='flex items-center'>Width:
                                                <input type='number'
                                                    value={isNaN(parseInt(selectedElement?.style?.width?.replace("px", ""))) ? "0" : parseInt(selectedElement?.style?.width)}
                                                    onChange={(event) => {
                                                        let _proprty = "width";
                                                        let _value = event.target.value + resizeUnit.width;
                                                        console.log(_proprty, _value)
                                                        modifySelected(_proprty, _value)
                                                    }}
                                                    min={0}
                                                    className='ms-10 rounded-sm w-[90px] border text-[12px] p-1' />

                                                <Menu as="div" className="relative inline-block text-left left-[5px]">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                            {resizeUnit.width} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[10px]' />

                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 mt-2 w-[75px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]">
                                                            <div className="px-1 py-1 ">

                                                                {
                                                                    getEnum("resizingUnits").map(
                                                                        (elem, index) => {
                                                                            return (
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                                } group w-full items-center rounded-md px-2 py-[5px] text-sm`}
                                                                                            onClick={() => setResizeUnit({ ...resizeUnit, width: elem })}
                                                                                        >

                                                                                            <span>{elem}</span>

                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            )
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                        <div className='text-left mt-3'>
                                            <div className='flex items-center'>Height:
                                                <input type='number'
                                                    value={isNaN(parseInt(selectedElement?.style?.height?.replace("px", ""))) ? "0" : parseInt(selectedElement?.style?.height)}
                                                    onChange={(event) => {
                                                        let _proprty = "height";
                                                        let _value = event.target.value + resizeUnit.height;
                                                        console.log(_proprty, _value)
                                                        modifySelected(_proprty, _value)
                                                    }}
                                                    min={0}
                                                    className='ms-9 rounded-sm w-[90px] border text-[12px] p-1' />
                                                <Menu as="div" className="relative inline-block text-left left-[5px]">
                                                    <div>
                                                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                            {resizeUnit.height} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[10px]' />

                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 mt-2 w-[75px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]">
                                                            <div className="px-1 py-1 ">

                                                                {
                                                                    getEnum("resizingUnits").map(
                                                                        (elem, index) => {
                                                                            return (
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                                } group w-full items-center rounded-md px-2 py-[5px] text-sm`}
                                                                                            onClick={() => setResizeUnit({ ...resizeUnit, height: elem })}
                                                                                        >

                                                                                            <span>{elem}</span>

                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            )
                                                                        }
                                                                    )
                                                                }
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='mt-2 w-full '>
                                            <div className='flex gap-3 w-full justify-between'>
                                                <img alt="" src='/images/right side/left-alignment.png' data-tooltip-id="align-left-tooltip" data-tooltip-content="Align Left" />
                                                <img alt="" src='/images/right side/right-alignment.png' data-tooltip-id="align-right-tooltip" data-tooltip-content="Align Right" />
                                                <img alt="" src='/images/right side/align-center.png' data-tooltip-id="align-horizontal-tooltip" data-tooltip-content="Align Horizontal Center" />
                                                <img alt="" src='/images/right side/top-objects.png' data-tooltip-id="align-top-tooltip" data-tooltip-content="Align Top" />
                                                <img alt="" src='/images/right side/bottom-objects.png' data-tooltip-id="align-bottom-tooltip" data-tooltip-content="Align Bottom" />
                                                <img alt="" src='/images/right side/vertical-align-center.png' data-tooltip-id="align-vertical-tooltip" data-tooltip-content="Align Vertical Center" />
                                                <img alt="" src='/images/right side/distribute-spacing-horizontal.png' data-tooltip-id="align-vertical-sp-tooltip" data-tooltip-content="Vertical Spacing" />
                                                <img alt="" src='/images/right side/distribute-spacing-vertical.png' data-tooltip-id="align-horizontal-sp-tooltip" data-tooltip-content="Horizontal Spacing" />
                                            </div>
                                        </div>
                                        <Tooltip id="align-left-tooltip" />
                                        <Tooltip id="align-right-tooltip" />
                                        <Tooltip id="align-horizontal-tooltip" />
                                        <Tooltip id="align-top-tooltip" />
                                        <Tooltip id="align-bottom-tooltip" />
                                        <Tooltip id="align-vertical-tooltip" />
                                        <Tooltip id="align-vertical-sp-tooltip" />
                                        <Tooltip id="align-horizontal-sp-tooltip" />
                                        <Tooltip id="redius-tooltip" />
                                        <Tooltip id="rotate-tooltip" />
                                        <div className={`${hideXY && "hidden "}  flex mt-3  justify-between`}>
                                            <div>X<input type='number' min={0} value={parseInt(selectedWrapperDOMElement?.style?.left?.replace("px", "")) || ""} className={` ms-1 rounded-sm w-24 me-4 border text-[12px] p-1 `}
                                                onChange={(event) => {
                                                    if (!event.target.value) return;
                                                    let _proprty = "left";
                                                    let _value = event.target.value + "px";
                                                    console.log(_proprty, _value)
                                                    modifySelectedWrapper(_proprty, _value)
                                                }}
                                            /></div>
                                            <div>Y<input type='number' value={parseInt(selectedWrapperDOMElement?.style?.top?.replace("px", "")) || ""} min={0} className={` ms-1 rounded-sm w-24 border text-[12px] p-1 `}
                                                onChange={(event) => {
                                                    if (!event.target.value) return;
                                                    let _proprty = "top";
                                                    let _value = event.target.value + "px";
                                                    console.log(_proprty, _value)
                                                    modifySelectedWrapper(_proprty, _value)
                                                }}
                                            /></div>
                                        </div>
                                        {
                                            containsSize ?
                                                <div className='flex mt-3 justify-between'>
                                                    <div>S
                                                        <input type='number' min={0}
                                                            value={parseInt(selectedElement?.style?.size?.replace("px", "")) || ""}
                                                            onChange={(event) => {
                                                                if (!event.target.value) return;
                                                                let _proprty = "size";
                                                                let _value = event.target.value + "px";
                                                                _value = _value?.replace(/[+\-]/g, "")
                                                                console.log(_proprty, _value, event.target.value)
                                                                modifySelected(_proprty, _value)
                                                            }}
                                                            className='ms-1  w-24 rounded-sm  me-4 border text-[12px] p-1' /></div>
                                                </div>
                                                :

                                                <div className='flex mt-3 justify-between'>
                                                    <div>W
                                                        <input type='number' min={0}
                                                            value={isNaN(parseInt(selectedElement?.style?.width?.replace("px", ""))) ? "0" : parseInt(selectedElement?.style?.width)}
                                                            onChange={(event) => {
                                                                if (!event.target.value) return;
                                                                let _proprty = "width";
                                                                let _value = event.target.value + "px";
                                                                _value = _value?.replace(/[+\-]/g, "")
                                                                console.log(_proprty, _value, event.target.value)
                                                                modifySelected(_proprty, _value)
                                                            }}
                                                            className='ms-1  w-24 rounded-sm  me-4 border text-[12px] p-1' /></div>
                                                    <div>H
                                                        <input type='number' min={0}
                                                            value={isNaN(parseInt(selectedElement?.style?.height?.replace("px", ""))) ? "0" : parseInt(selectedElement?.style?.height)}
                                                            onChange={(event) => {
                                                                if (!event.target.value) return;
                                                                let _proprty = "height";
                                                                let _value = event.target.value + "px";
                                                                console.log(_proprty, _value)
                                                                modifySelected(_proprty, _value)
                                                            }}
                                                            className='ms-1 rounded-sm w-24 border text-[12px] p-1'
                                                        />
                                                    </div>
                                                </div>
                                        }
                                        <div className={`${hideRotate && "hidden "} text-left mt-3 flex  justify-between`}>
                                            <div><FontAwesomeIcon icon={faRotateRight} data-tooltip-id="rotate-tooltip" data-tooltip-content="Rotate" className="text-xs" />

                                                <input type='number' min={0} max={360}
                                                    value={isNaN(parseInt(selectedElement?.style?.rotateRight)) ? "0" : parseInt(selectedElement?.style?.rotateRight)}
                                                    onChange={(event) => {
                                                        if (!event.target.value) return;
                                                        let _proprty = "transform";
                                                        let _value = "rotate(" + event.target.value + "deg)";
                                                        let _value_wrapper = "rotate(" + event.target.value + "deg)";
                                                        console.log(_proprty, _value)
                                                        modifySelected(_proprty, _value)
                                                        modifySelected("rotateRight", event.target.value)
                                                        modifySelectedWrapper(_proprty, _value_wrapper)
                                                    }}
                                                    className='ms-1 rounded-sm w-24  me-4 border text-[12px] p-1'
                                                />

                                            </div>
                                            <div><FontAwesomeIcon icon={faRotateLeft} data-tooltip-id="rotate-tooltip" data-tooltip-content="Rotate" className="text-xs" />

                                                <input type='number' min={0} max={360}
                                                    value={isNaN(parseInt(selectedElement?.style?.rotateLeft)) ? "0" : parseInt(selectedElement?.style?.rotateLeft)}
                                                    onChange={(event) => {
                                                        if (!event.target.value) return;
                                                        let _proprty = "transform";
                                                        let _value = "rotate(-" + event.target.value + "deg)";
                                                        let _value_wrapper = "rotate(-" + event.target.value + "deg)";
                                                        console.log(_proprty, _value)
                                                        modifySelected(_proprty, _value)
                                                        modifySelected("rotateLeft", event.target.value)
                                                        modifySelectedWrapper(_proprty, _value_wrapper)
                                                    }}
                                                    className='ms-1 rounded-sm w-24 border text-[12px] p-1'
                                                />

                                            </div>
                                        </div>



                                    </>


                            }
                        </Disclosure.Panel>
                    </Transition>

                </>
            )}
        </Disclosure>
    )
}