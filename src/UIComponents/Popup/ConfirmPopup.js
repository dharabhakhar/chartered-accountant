import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function ConfirmPopup({ title, submitText, children, openPopup, closingMethod, submitMethod, color }) {
    //**Methods */
    function handleClose() {
        if (closingMethod) closingMethod();
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (submitMethod) submitMethod();
    }

    const bgColor = "bg-[" + color + "]";

    return (
        <>
            {openPopup &&
                <div className="h-screen w-screen fixed animate__animated animate__fast animate__fadeIn inset-0 flex justify-center items-center max-[450px]:items-end bg-[rgba(0,0,0,0.4)] backdrop-blur-[3px] z-[100]">
                    <div className='animate__animated animate__fadeInUp animate__faster shadow-xl bg-white w-[calc(100vw-30px)] min-[1024px]:w-[520px] max-h-[calc(100vh-100px)] m-auto min-[450px]:rounded-lg overflow-hidden absolute max-[450px]:w-full sm:max-w-[600px] max-[450px]:rounded-t-lg h-fit min-h-[50px] sm:max-h-[30vh]  max-w-none flex flex-col justify-between'>
                        <div className='bg-gradient-to-r from-[#259dab] to-[#2574ab] flex justify-between pl-5 pr-4 max-[450px]:rounded-t-lg items-center py-2 '>
                            <p className='text-lg text-white'>{title || "Confirmation Popup"}</p>
                            <button onClick={handleClose}>
                                <FontAwesomeIcon className='w-[18px] -translate-y-[2px] text-white' icon={faXmark} size="lg" />
                            </button>
                        </div>
                        <div className='pl-5 pr-4 h-full overflow-auto flex justify-center items-center'>
                            {children}

                        </div>
                        <div className='h-[65px] flex items-center max-[450px]:justify-center justify-end  border-t'>
                            <div className='text-[14px] font-mulish font-semibold pr-[15px] flex gap-x-[10px]'>
                                <button type='button' className='rounded-[4px] pt-[5px] pb-[6px] max-[450px]:w-[100px] w-[85px] text-black bg-[#f6f0f6] hover:opacity-[0.88]' onClick={handleClose}>Cancel</button>
                                <button type='button' style={{ backgroundColor: color }} className={`cursor-pointer hover:opacity-[0.88] rounded-[4px] pt-[5px] pb-[6px] text-white w-[100px]`} onClick={handleSubmit}>{submitText || "Submit"}</button>

                                {/* <button className='bg-[#f6f0f6]'>Cancel</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}







