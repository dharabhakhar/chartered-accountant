import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import SavingLoader from "../Loaders/SavingLoader"


export default function FormPopup({ title,  children, openPopup, closingMethod, overlay }) {
    //**Methods */
    function handleClose() {
        if (closingMethod) closingMethod();
    }
    

    return (
        <>
            {openPopup &&
                <div className="h-screen w-screen fixed animate__animated animate__fast animate__fadeIn inset-0 max-[450px]:items-end flex justify-center items-center bg-[rgba(0,0,0,0.4)] backdrop-blur-[3px] z-10">
                    <div className='animate__animated animate__fadeInUp animate__faster shadow-xl bg-white w-full min-[450px]:rounded-md max-[450px]:rounded-t-lg overflow-hidden absolute sm:max-w-[600px] h-max sm:max-h-[58vh] max-w-none flex flex-col justify-between'>
                        
                        <div className='bg-gradient-to-r from-[#259dab] to-[#2574ab] flex justify-between pl-5 pr-4 items-center py-2 '>
                            <p className='text-lg text-white'>{title}</p>
                            <button onClick={handleClose}>
                                <FontAwesomeIcon className='w-[18px] -translate-y-[2px] text-white' icon={faXmark} size="lg" />
                            </button>
                        </div>

                        <div className=' h-full overflow-auto ' >
                            {overlay && <SavingLoader />}
                            {children}

                        </div>
                        
                    </div>
                </div>
            }
        </>

    )
}


