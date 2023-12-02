import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";

export default function ComboBox({ value, valueModefier, displayValue, title, afterLeave, showLabel, label, items,isOpenComboBox }) {

    const [query, setQuery] = useState('')

    const filteredItems = useMemo(() => {
        return query === ''
            ? items || []
            : items.filter((item) =>
                item[displayValue]
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    }, [query,items]);

    return (
        <div className="combo-box">
            <Combobox value={value} onChange={valueModefier} >
                <div id="" className="relative mt-1">
                    <div id={title?.replaceAll(" ", "") + "_dropdown"} placeholder={title?.replaceAll(" ", "") + "_dropdown"} className=" peer relative w-full cursor-default overflow-hidden rounded-[3.75px] bg-white text-left  focus:outline-none ">
                        <Combobox.Input
                            className="capitalize   outline-none font-mulish text-[14px] h-[40px]  px-[12px] w-full border border-solid border-[#bdc3d1] rounded-[3.75px] placeholder-transparent focus:outline-none"
                            displayValue={(elem) =>elem ?   elem[displayValue] || "" : ""}
                            onChange={(event) => { setQuery(event.target.value); }}
                        />
                        <Combobox.Button className="absolute inset-0 bg-transparent flex items-center pr-2">
                            <span
                                className="px-[12px] text-[13px]  font-mulish  text-[#696c74] transition-all  peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
                                aria-hidden="true"
                            >{(!value && !query)&&  <> {title} <span className="text-[#dc3545] text-[16px] leading-[18px]"></span></>}</span>
                        </Combobox.Button>
                    </div>
                    {(value || query)&& <label
                        
                        className="absolute m-0 px-[3px] text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
                    >
                        {label} <span className="text-[#dc3545] text-[16px] leading-[18px]">*</span>
                    </label>}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => { if (afterLeave) afterLeave() }}
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base focus:outline-none sm:text-sm rounded-b-lg  shadow-xl  ">
                            {filteredItems.length === 0 ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredItems.map((elem, index) => (
                                    <Combobox.Option
                                        key={"combobox_item_"+displayValue+index}
                                        className={({ active }) =>
                                            `relative  select-none py-2 pl-4 pr-4 ${active ? 'bg-[#2574ab] text-white' : 'text-gray-900'
                                            } w-full   cursor-pointer hover:bg-[#2574ab] hover:text-white py-1 duration-150 capitalize `
                                        }
                                        value={elem}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-bold' : 'font-normal'
                                                        }`}
                                                >
                                                    {elem && elem[displayValue] && elem[displayValue] }
                                                </span>
                                               
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>

    )
}