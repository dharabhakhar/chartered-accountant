import { Fragment, useEffect,  useState } from "react"
//Redux
import { useDispatch, useSelector } from "react-redux"
import { getSelectedElement, setSelectedElement } from "../../../Store/CustomSlice"
//Headless
import { Disclosure, Menu, Transition } from "@headlessui/react"
//UI
import { Tooltip } from "react-tooltip"
//Helpers
import { getEnum } from "../../../Utils/enums"
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"



export default function BorderStyles() {
    /**helpers */
    const dispatch = useDispatch();

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)


    /**Mutable State */
    const [selectedBorder, setSelectedBorder] = useState(0);
    const [selectedBorderRadius, setSelectedBorderRadius] = useState(0);
    const [borderColor_hex, setBorderColor_hex] = useState("");
    const [isTransparent, setIsTransparent] = useState(false);

    // const selectedDOMElement = useMemo(
    //     () => {
    //         let _dom_elem = document.getElementById(selectedElement.id);
    //         setSelectedElement({ ...selectedElement, style: { ..._dom_elem.style } })

    //         return _dom_elem
    //     }, [selectedElement.id]
    // )

    /**Methods */
    function modifySelected(property, value) {
        try {
            // selectedDOMElement.style[property] = value
            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [property]: value } }))
        } catch (_err) {
            console.log("commonstyle_component modifySelected_method", _err)
        }
    }


    /**Enums */
    const borderEnums = [
        { borderColor: "borderColor", borderWidth: "borderWidth", borderStyle: "borderStyle" },
        { borderColor: "borderLeftColor", borderWidth: "borderLeftWidth", borderStyle: "borderLeftStyle" },
        { borderColor: "borderRightColor", borderWidth: "borderRightWidth", borderStyle: "borderRightStyle" },
        { borderColor: "borderTopColor", borderWidth: "borderTopWidth", borderStyle: "borderTopStyle" },
        { borderColor: "borderBottomColor", borderWidth: "borderBottomWidth", borderStyle: "borderBottomStyle" },
    ]
    const borderRadiusEnums = [
        { borderRadius: "borderRadius", },
        { borderRadius: "borderTopLeftRadius" },
        { borderRadius: "borderTopRightRadius" },
        { borderRadius: "borderBottomLeftRadius" },
        { borderRadius: "borderBottomRightRadius" },
    ]


    /**Effects */
    useEffect(
        () => {
            let _style = selectedElement.style;
            if (_style.borderColor === "transparent") {
                setIsTransparent(true)
            } else {
                setBorderColor_hex(_style.borderColor)
            }
        }, [selectedElement.id]
    )
   

    return (
        <Disclosure defaultOpen={false} className="w-full ">
            {({ open }) => (
                <>
                    <Disclosure.Button className="ps-2 w-full  text-left  justify-between items-center py-2 mb-0 cursor-pointer hover:bg-gray-200 text-[#2574ab] bg-gray-100">
                        Border
                        <div className=' text-sm float-right pr-[25px] inline'>

                            <FontAwesomeIcon icon={faAngleDown} className={`${open && "  rotate-180 "} duration-200 `} />
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



                            <div className='mt-2'>
                                <div className='flex gap-[43px]'>
                                    <img src='/images/right side/left-border.png' data-tooltip-id="left-tooltip" data-tooltip-content="Left Border" className={`${selectedBorder === 1 && " border border-red-400 "} cursor-pointer`}
                                        onClick={() => setSelectedBorder(1)} />
                                    <img src='/images/right side/right-border.png' data-tooltip-id="right-tooltip" data-tooltip-content="Right Border" className={`${selectedBorder === 2 && " border border-red-400 "} cursor-pointer`}
                                        onClick={() => setSelectedBorder(2)} />
                                    <img src='/images/right side/top-border.png' data-tooltip-id="top-tooltip" data-tooltip-content="Top Border" className={`${selectedBorder === 3 && " border border-red-400 "} cursor-pointer`}
                                        onClick={() => setSelectedBorder(3)} />
                                    <img src='/images/right side/bottom-border.png' data-tooltip-id="bottom-tooltip" data-tooltip-content="Bottom Border" className={`${selectedBorder === 4 && " border border-red-400 "} cursor-pointer`}
                                        onClick={() => setSelectedBorder(4)} />
                                    <img src='/images/right side/outer-border.png' data-tooltip-id="all-tooltip" data-tooltip-content="All Border" className={`${selectedBorder === 0 && " border border-red-400 "} cursor-pointer`}
                                        onClick={() => setSelectedBorder(0)} />
                                </div>
                            </div>
                            <Tooltip id="left-tooltip" />
                            <Tooltip id="right-tooltip" />
                            <Tooltip id="top-tooltip" />
                            <Tooltip id="bottom-tooltip" />
                            <Tooltip id="all-tooltip" />

                            <div className='mt-3 text-left'>
                                <div className='flex items-center'>Color:
                                    <input type='color'
                                        disabled={isTransparent}
                                        value={isTransparent ? borderColor_hex : selectedElement?.style[borderEnums[selectedBorder].borderColor]}
                                        onChange={(event) => {
                                            let _proprty = borderEnums[selectedBorder].borderColor;
                                            let _value = event.target.value;
                                            setBorderColor_hex(_value)
                                            modifySelected(_proprty, _value)
                                        }}
                                        className='ms-[45px] rounded-sm w-14 p-1 border me-2' />
                                    <input type='text'
                                        disabled={isTransparent}
                                        value={isTransparent ? borderColor_hex : selectedElement?.style[borderEnums[selectedBorder].borderColor]} placeholder='#000000' maxLength={7} className='border uppercase outline-none p-1 text-[12px] w-[107px]'
                                        onChange={(event) => {
                                            let _value = event.target.value;
                                            setBorderColor_hex(_value)
                                            if (_value.length < 7) {
                                                return;
                                            }
                                            let _proprty = borderEnums[selectedBorder].borderColor
                                            modifySelected(_proprty, _value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='mt-2 text-left flex justify-end items-center gap-1'><input type="checkbox" checked={isTransparent} id="selected_elem_border_transparent" onChange={(event) => {
                                let _value = event.target.checked ? "transparent" : borderColor_hex;
                                let _proprty = borderEnums[selectedBorder].borderColor;
                                setIsTransparent(event.target.checked)
                                modifySelected(_proprty, _value)
                            }} /><label htmlFor="selected_elem_border_transparent" className="select-none cursor-pointer">Transparent</label>
                            </div>
                            <div className='flex mt-3'>
                                <div className='flex items-center'>Width:
                                    <input type='number'
                                        value={parseInt(selectedElement?.style[borderEnums[selectedBorder].borderWidth]?.replace("px",""))}
                                        onChange={(event) => {
                                            let _proprty = borderEnums[selectedBorder].borderWidth;
                                            let _value = event.target.value + "px";
                                            modifySelected(_proprty, _value)
                                        }}
                                        min={0}
                                        className='ms-[38px] rounded-sm w-[72px] border text-[12px] p-1 me-2' />
                                    px</div>
                            </div>

                            <div className='mt-3'>
                                <div className='flex items-center'>Style:
                                    <Menu as="div" className="relative inline-block text-left left-[48px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-300 capitalize bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style[borderEnums[selectedBorder].borderStyle]} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[100px]' />
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
                                            <Menu.Items className="absolute right-0 mt-2 w-[170px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]">
                                                <div className="px-1 py-1 ">

                                                    {
                                                        getEnum("borderStyle").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _proprty = borderEnums[selectedBorder].borderStyle;
                                                                                    let _value = elem;

                                                                                    modifySelected(_proprty, _value)
                                                                                }}
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

                            {
                                selectedElement.name !== "circle" &&

                                <div className='mt-3'>
                                    <div className='flex items-center'>Radius:
                                        <Menu as="div" className="relative inline-block text-left left-[37px]">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                    {/* <FontAwesomeIcon icon={faSquare} className='pt-1' /> */}
                                                    {getEnum("borderRadiusIcons")[selectedBorderRadius]}
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
                                                <Menu.Items className="absolute right-0 mt-2 w-[45px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[1]">
                                                    <div className="px-1 py-1 ">

                                                        {
                                                            getEnum("borderRadiusIcons").map(
                                                                (elem, index) => {
                                                                    return (
                                                                        <Menu.Item key={index}>
                                                                            {({ active }) => (
                                                                                <button
                                                                                    className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                        } group w-full items-center text-center rounded-md px-2 p-[5px] text-sm`}
                                                                                    onClick={() => {
                                                                                        setSelectedBorderRadius(index)


                                                                                    }}
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
                                        <input type='number'
                                            value={parseInt(selectedElement?.style[borderRadiusEnums[selectedBorderRadius].borderRadius]?.replace("px",""))}
                                            onChange={(event) => {
                                                let _proprty = borderRadiusEnums[selectedBorderRadius].borderRadius;
                                                let _value = event.target.value + "px";
                                                modifySelected(_proprty, _value)
                                            }}
                                            min={0} className='border outline-none p-1 text-[12px] w-[110px] ms-[50px]'

                                        />
                                    </div>
                                </div>
                            }



                        </Disclosure.Panel>
                    </Transition>

                </>
            )}
        </Disclosure>
    )
}