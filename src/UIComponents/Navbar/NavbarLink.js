import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function NavbarLink({ link, title, fontAwesomeIcon, icon }) {
    const __location = useLocation()
    
    const pathName = __location.pathname;
    const isSelected = pathName.includes(link.toLowerCase());
    return (
        <div className='w-full'><Link to={link}>
            <div className={`menu-item ${isSelected ? 'bg-gradient-to-r from-[#259dab] to-[#2574ab]' : ''} flex  font-bold cursor-pointer h-[45px] pl-[14px] items-center gap-x-[10px] border-b border-b-solid border-b-[#eaecf0] whitespace-nowrap`}>


                {/* <FontAwesomeIcon className={`${pathName === link.toLowerCase() ? 'text-white ' : 'text-[#259dab] '}  w-[16px] -translate-y-[1px] overflow-hidden`} icon={fontAwesomeIcon} size="lg" /> */}

                <div className={`${isSelected ? 'text-white' : 'text-[#259dab]'}`}>
                    {icon}
                </div>
                
                <div className={`${isSelected ? 'text-white' : 'text-[#505b72] hover:text-[#808084]'} uppercase text-[12px] w-full overflow-hidden text-ellipsis`}>{title}</div>
            </div>
        </Link>
        </div>
    )
}

