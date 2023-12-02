import { Fragment,  useState } from "react"
//Redux
import { useDispatch, useSelector } from "react-redux"
import { getSelectedElement, setSelectedElement } from "../../../Store/CustomSlice"
//Headless
import { Disclosure, Menu, Transition } from "@headlessui/react"
//UI

//Helpers
import { getEnum } from "../../../Utils/enums"
//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"


export default function TextStyles() {

    /**helpers */
    const dispatch = useDispatch();

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)


    /**Mutable State */
    const [textColor_hex, setTextColor_hex] = useState("");

    // const selectedDOMElement = useMemo(
    //     () => {
    //         return document.getElementById(selectedElement.id)
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

    return (
        <Disclosure className="w-full " defaultOpen={true}>
            {({ open }) => (
                <>
                    <Disclosure.Button className="ps-2 w-full  text-left  justify-between items-center py-2 mb-0 cursor-pointer hover:bg-gray-200 text-[#2574ab] bg-gray-100">
                        Text
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


                            <div className='mt-2 text-left'>
                                <div className='flex items-center'>Color:
                                    <input type='color'
                                        value={textColor_hex || selectedElement?.style.color }
                                        onChange={(event) => {
                                            let _proprty = "color";
                                            let _value = event.target.value;
                                            setTextColor_hex(_value)
                                            modifySelected(_proprty, _value)
                                        }}
                                        className='ms-[45px] rounded-sm w-14 p-1 border me-2' />
                                    <input type='text'
                                        value={textColor_hex || selectedElement?.style.color?.toString()}
                                        placeholder='#000000' maxLength={7} className='border uppercase outline-none p-1 text-[12px] w-[107px]'
                                        onChange={(event) => {
                                            let _value = event.target.value;
                                            setTextColor_hex(_value)
                                            if (_value.length < 7) {
                                                return;
                                            }
                                            let _proprty = "color";

                                            modifySelected(_proprty, _value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='mt-3 text-left'>
                                <div className='flex items-center'>Padding:
                                    <input type='number' min={0}
                                        value={isNaN(parseInt(selectedElement?.style?.paddingLeft)) ? "0" :parseInt(selectedElement?.style?.paddingLeft) }
                                        onChange={(event) => {
                                            let _proprty = "paddingLeft";
                                            let _value = event.target.value + "px";
                                            modifySelected(_proprty, _value)
                                        }}
                                        placeholder='L' className='ms-[27px] rounded-sm w-[35px] border text-[12px] p-1 text-center' />
                                    <input type='number' min={0}
                                        value={isNaN(parseInt(selectedElement?.style?.paddingTop)) ? "0" :parseInt(selectedElement?.style?.paddingTop) }
                                        onChange={(event) => {
                                            let _proprty = "paddingTop";
                                            let _value = event.target.value + "px";
                                            modifySelected(_proprty, _value)
                                        }}
                                        placeholder='T' className='ms-2 rounded-sm w-[35px] border text-[12px] p-1 text-center' />
                                    <input type='number' min={0}
                                        value={isNaN(parseInt(selectedElement?.style?.paddingRight)) ? "0" :parseInt(selectedElement?.style?.paddingRight) }
                                        onChange={(event) => {
                                            let _proprty = "paddingRight";
                                            let _value = event.target.value + "px";
                                            modifySelected(_proprty, _value)
                                        }}  
                                        placeholder='R' className='ms-2 rounded-sm w-[35px] border text-[12px] p-1 text-center' />
                                    <input type='number' min={0}
                                        value={isNaN(parseInt(selectedElement?.style?.paddingBottom)) ? "0" :parseInt(selectedElement?.style?.paddingBottom) }
                                        onChange={(event) => {
                                            let _proprty = "paddingBottom";
                                            let _value = event.target.value + "px";
                                            modifySelected(_proprty, _value)
                                        }}
                                        placeholder='B' className='ms-2 rounded-sm w-[35px] border text-[12px] p-1 text-center' />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center'>Size:

                                    <input type='number'
                                        value={isNaN(parseInt(selectedElement?.style?.fontSize?.replace("px",""))) ? "0" : parseInt(selectedElement?.style?.fontSize)}
                                        onChange={(event) => {
                                            let _proprty = "fontSize";
                                            let _value = event.target.value + "px";

                                            modifySelected(_proprty, _value)
                                        }}
                                        min={0}
                                        className='ms-[56px] rounded-sm w-[87px] border text-[12px] p-1 me-2' /> px
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center'>Line-Height:
                                    <input type='number'
                                        value={isNaN(parseInt(selectedElement?.style?.lineHeight)) ? "" : parseInt(selectedElement?.style?.lineHeight)}
                                        onChange={(event) => {
                                            let _proprty = "lineHeight";
                                            let _value = event.target.value + "px";

                                            modifySelected(_proprty, _value)
                                        }}
                                        min={0} className='ms-[9px] rounded-sm w-[87px] border text-[12px] p-1 me-2'></input> px
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center'>Spacing:
                                    <input type='number'
                                        value={isNaN(parseInt(selectedElement?.style?.letterSpacing)) ? "0" : parseInt(selectedElement?.style?.letterSpacing)}
                                        onChange={(event) => {
                                            let _proprty = "letterSpacing";
                                            let _value = event.target.value + "px";

                                            modifySelected(_proprty, _value)
                                        }}
                                        min={0} className='ms-[30px] rounded-sm w-[87px] border text-[12px] p-1 me-2'></input>     px
                                </div>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center'>Font-Family:
                                    <Menu as="div" className="relative inline-block text-left left-[8px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md capitalize bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.fontFamily} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[60px]' />

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
                                                        getEnum("fontFamily").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "fontFamily"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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
                            <div className='mt-3'>
                                <div className='flex items-center'>Font-Style:
                                    <Menu as="div" className="relative inline-block text-left left-[18px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.fontStyle} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[69px]' />

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
                                                        getEnum("fontStyle").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "fontStyle"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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
                            <div className='mt-3'>
                                <div className='flex items-center'>Font-Weight:
                                    <Menu as="div" className="relative inline-block text-left left-[5px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.fontWeight}<FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[54px]' />

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
                                                        getEnum("fontWeight").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "fontWeight"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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
                            <div className='mt-3'>
                                <div className='flex items-center'>Decoration:
                                    <Menu as="div" className="relative inline-block text-left left-[16px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.textDecoration} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[60px]' />

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
                                                        getEnum("textDecoration").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "textDecoration"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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
                            <div className='mt-3'>
                                <div className='flex items-center'>Text-Align:
                                    <Menu as="div" className="relative inline-block text-left left-[22px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full capitalize justify-center rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.textAlign} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[65px]' />

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
                                                        getEnum("textAlign").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "textAlign"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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
                            <div className='mt-3 pb-4'>
                                <div className='flex items-center'>Vertical-Align:
                                    <Menu as="div" className="relative inline-block text-left left-[3px]">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                {selectedElement?.style?.verticalAlign} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[45px]' />

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
                                                        getEnum("verticalAlign").map(
                                                            (elem, index) => {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                onClick={() => {
                                                                                    let _property = "verticalAlign"
                                                                                    let _value = elem
                                                                                    modifySelected(_property, _value)
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





                        </Disclosure.Panel>
                    </Transition>

                </>
            )}
        </Disclosure>
    )
}