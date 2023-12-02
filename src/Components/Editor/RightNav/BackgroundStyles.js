import { Fragment, useEffect, useMemo, useState } from "react"
//Redux
import { useSelector, useDispatch } from "react-redux"
import { getSelectedElement, setSelectedElement } from "../../../Store/CustomSlice";
//icons
import { faAngleDown, faUpload, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//Headless
import { Disclosure, Menu, Transition } from "@headlessui/react"
//helpers
import { getEnum } from "../../../Utils/enums"

export default function BackgroundStyles() {

    /**Helpers */
    const dispatch = useDispatch()

    /**Selectors */
    const selectedElement = useSelector(getSelectedElement)

    /**Mutable State */
    const [bgColor_hex, setBgColor_hex] = useState("#ffffff");
    const [isTransparent, setIsTransparent] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const hasBackgroundImage = useMemo(
        () => {
            let _bgImage = selectedElement?.style?.backgroundImage
            if (_bgImage && _bgImage !== "none") {
                return true
            } else {
                return false
            }
        }, [selectedElement?.style]
    )
    // const selectedDOMElement = useMemo(
    //     () => {
    //         return document.getElementById(selectedElement.id)
    //     }, [selectedElement.id]
    // )

    /**Methods */
    function modifySelected(property, value) {
        try {
            // selectedDOMElement.style[property] = value
            // console.log(selectedElement)
            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, [property]: value } }))

        } catch (_err) {
            console.log("commonstyle_component modifySelected_method", _err)
        }
    }

    

    function handleImageUpload(event) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            dispatch(setSelectedElement({ ...selectedElement, style: { ...selectedElement.style, backgroundImage: "url('" + e.target.result + "')" } }))
            // setUploadedBgImage(e.target.result)
        }
        reader.readAsDataURL(file);
    }


    /**Effects */
    useEffect(
        () => {
            let _style = selectedElement.style;
            setOpacity(_style.opacity)
            if (_style.backgroundColor === "transparent") {
                setIsTransparent(true)
            } else {
                setBgColor_hex(_style.backgroundColor)
            }
        }, [selectedElement.id]
    )

    return (
        <Disclosure defaultOpen={true} className="w-full ">
            {({ open }) => (
                <>
                    <Disclosure.Button className="ps-2 w-full text-left py-2 mb-0 cursor-pointer hover:bg-gray-200 text-[#2574ab] bg-gray-100">
                        Background
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

                            {
                                selectedElement?.name !== "image" &&
                                <>
                                    <div className='mt-2 text-left'>
                                        <div className='flex items-center'>Color:
                                            <input type='color'
                                                disabled={isTransparent}
                                                value={isTransparent ? bgColor_hex || "#000000" : selectedElement?.style?.backgroundColor}
                                                onChange={(event) => {
                                                    let _proprty = "backgroundColor";
                                                    let _value = event.target.value;
                                                    setBgColor_hex(_value)
                                                    modifySelected(_proprty, _value)
                                                }}
                                                className='ms-[45px] rounded-sm w-14 p-1 border me-2' />
                                            <input type='text'
                                                disabled={isTransparent}
                                                value={isTransparent ? bgColor_hex || "#000000" : selectedElement?.style?.backgroundColor?.toString()} placeholder='#000000' maxLength={7} className='border uppercase outline-none p-1 text-[12px] w-[107px]'
                                                onChange={(event) => {
                                                    let _value = event.target.value;
                                                    setBgColor_hex(_value)
                                                    if (_value.length < 7) {
                                                        return;
                                                    }
                                                    let _proprty = "backgroundColor";
                                                    modifySelected(_proprty, _value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-2 text-left flex justify-end items-center gap-1'><input type="checkbox" checked={isTransparent} id="selected_elem_bg_transparent" onChange={(event) => {
                                        let _value = event.target.checked ? "transparent" : bgColor_hex;
                                        let _proprty = "backgroundColor";
                                        setIsTransparent(event.target.checked)
                                        modifySelected(_proprty, _value)
                                    }} /><label htmlFor="selected_elem_bg_transparent" className="select-none cursor-pointer">Transparent</label>
                                    </div>
                                </>
                            }

                            {

                                selectedElement?.id !== "editor" &&
                                <div className='mt-3 text-left'>
                                    <div className='flex items-center'>Z-index:
                                        <input type='number'
                                            value={parseInt(selectedElement?.style?.zIndex)}
                                            onChange={(event) => {
                                                let _proprty = "zIndex";
                                                let _value = event.target.value;
                                                modifySelected(_proprty, _value)
                                            }}
                                            min={0} className='ms-[32px] rounded-sm w-[87px] border text-[12px] p-1'></input></div>
                                </div>
                            }


                            {
                                selectedElement?.name !== "image" &&
                                <>
                                    <div className='mt-3 flex flex-col gap=5'>

                                        <div className='flex items-center'>Picture:
                                            <button type="button" className="ms-[40px] flex items-center gap-1 cursor-pointer bg-slate-50 px-3 border shadow-md rounded-lg w-[10.8rem] relative text-[14px] py-[7px]">
                                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute cursor-pointer opacity-0 inset-0 w-full h-full" />
                                                <FontAwesomeIcon icon={faUpload} className='me-1' />
                                                {hasBackgroundImage ? "Change" : "Upload"} Picture
                                            </button>
                                        </div>

                                        {hasBackgroundImage &&
                                            <div className="pl-2 pt-1">
                                                <button type="button " className=" pl-4 hover:text-red-400 duration-150 text-[14px]"
                                                    onClick={(event) => {
                                                        let _proprty = "backgroundImage";
                                                        let _value = "none";
                                                        modifySelected(_proprty, _value)
                                                    }}
                                                > <FontAwesomeIcon icon={faXmarkCircle} className='me-1' />Remove Picture</button>
                                            </div>
                                        }

                                    </div>
                                    <div className='mt-3 '>
                                        <div className='flex items-center  justify-between '>Size:
                                            <Menu as="div" className="relative inline-block text-left left-[] w-full max-w-[175px] bg--300">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full  justify-between rounded-md bg-gray-300 bg-opacity-20 capitalize px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                        {selectedElement?.style?.backgroundSize} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ps-[]' />

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
                                                                getEnum("backgroundSize").map(
                                                                    (elem, index) => {
                                                                        return (
                                                                            <Menu.Item key={index}>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                            } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                        onClick={() => {
                                                                                            let _proprty = "backgroundSize"
                                                                                            let _value = elem
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
                                    <div className='mt-3'>
                                        <div className='flex items-center justify-between'>Repeat:
                                            <Menu as="div" className="relative inline-block text-left w-full max-w-[175px]">
                                                <div>
                                                    <Menu.Button className="inline-flex  w-full justify-between  capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                        {selectedElement?.style?.backgroundRepeat} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ' />
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
                                                                getEnum("backgroundRepeat").map(
                                                                    (elem, index) => {
                                                                        return (
                                                                            <Menu.Item key={index}>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                            } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                        onClick={() => {
                                                                                            let _proprty = "backgroundRepeat"
                                                                                            let _value = elem
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
                                    <div className='mt-3'>
                                        <div className='flex items-center justify-between'>Attachment:
                                            <Menu as="div" className="relative inline-block text-left w-full max-w-[175px]">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-between capitalize  rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                        {selectedElement?.style?.backgroundAttachment} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ' />

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
                                                                getEnum("backgroundAttachment").map(
                                                                    (elem, index) => {
                                                                        return (
                                                                            <Menu.Item key={index}>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                            } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                        onClick={() => {
                                                                                            let _proprty = "backgroundAttachment"
                                                                                            let _value = elem
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

                                    <div className='mt-3'>
                                        <div className='flex items-center justify-between'>Position:
                                            <Menu as="div" className="relative inline-block text-left w-full max-w-[175px]">
                                                <div>
                                                    <Menu.Button className="inline-flex w-full justify-between capitalize  rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                        {selectedElement?.style?.backgroundPosition} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ' />

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
                                                                getEnum("backgroundPosition").map(
                                                                    (elem, index) => {
                                                                        return (
                                                                            <Menu.Item key={index}>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                            } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                        onClick={() => {
                                                                                            let _proprty = "backgroundPosition"
                                                                                            let _value = elem
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

                                        selectedElement?.name === "textbox" &&
                                        <>
                                            <div className='mt-3'>
                                                <div className='flex items-center justify-between'>Origin:
                                                    <Menu as="div" className="relative inline-block text-left w-full max-w-[175px]">
                                                        <div>
                                                            <Menu.Button className="inline-flex w-full justify-between capitalize rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                                {selectedElement?.style?.backgroundOrigin} <FontAwesomeIcon icon={faAngleDown} className='pt-1 ' />

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
                                                                        getEnum("backgroundOrigin").map(
                                                                            (elem, index) => {
                                                                                return (
                                                                                    <Menu.Item key={index}>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                                onClick={() => {
                                                                                                    let _proprty = "backgroundOrigin"
                                                                                                    let _value = elem
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
                                            <div className='mt-3'>
                                                <div className='flex items-center justify-between'>Clip:
                                                    <Menu as="div" className="relative inline-block text-left w-full max-w-[175px]">
                                                        <div>
                                                            <Menu.Button className="inline-flex w-full capitalize justify-between  rounded-md bg-gray-300 bg-opacity-20 px-3 py-2 text-[12px] border font-medium text-slate-700  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                                                {selectedElement?.style?.backgroundClip}  <FontAwesomeIcon icon={faAngleDown} className='pt-1' />

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
                                                                        getEnum("backgroundClip").map(
                                                                            (elem, index) => {
                                                                                return (
                                                                                    <Menu.Item key={index}>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                className={`${active ? 'bg-[#e3eff7] text-black' : 'text-gray-900'
                                                                                                    } group flex w-full items-center rounded-md px-2 py-[5px] text-sm capitalize`}
                                                                                                onClick={() => {
                                                                                                    let _proprty = "backgroundClip"
                                                                                                    let _value = elem
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

                                        </>
                                    }

                                </>
                            }
                            <div className='mt-3 text-left'>
                                <div className='flex items-center'>Opacity:
                                    <input type='range'
                                        value={selectedElement?.style?.opacity}
                                        min="0" max="1" step="0.1"
                                        onChange={(event) => {
                                            let _value = event.target.value;
                                            setOpacity(_value)
                                            let _proprty = "opacity";
                                            modifySelected(_proprty, _value)
                                        }}
                                        className='ms-[33px] rounded-sm w-[174px] border text-[12px] p-1 me-3 cursor-pointer outline-none' />{opacity}</div>
                            </div>



                        </Disclosure.Panel>
                    </Transition>

                </>
            )}
        </Disclosure>
    )
}