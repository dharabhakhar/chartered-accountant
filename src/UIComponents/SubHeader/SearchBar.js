import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useCallback, useRef } from 'react';

const status_labels = ["", "active", "deactive"]

export default function SearchBar({   children, onSearch, hideTextBox, onSearchClick, hideStatusSearch,   dontCloseOnClick, closingParam, initialSearchValue, activeStatus, searchStatusModifier, showSearch }) {

  const [searchText, setSearchText] = useState(initialSearchValue);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState(status_labels[activeStatus]);

  const searchFilterElement = useRef(null);

  useEffect(
    () => {
    }, [activeStatus]
  )

  function _onSearch(_value) {
    if (onSearch) {
      onSearch(_value)
    }
  }
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const showHideFilterDropdown = () => {
    setShowFilterDropdown((current) => !current);
  };

  useEffect(
    () => {
      // alert(closingParam)
      if (closingParam !== undefined)
        setShowFilterDropdown(closingParam);
    }, [closingParam]
  )

  const closeOnOutsideClick = useCallback((event) => {
    const targetEle = event.target;
    const targetClassNames = Array.from(targetEle.classList);
    const searchContainer = document.getElementById('searchBarContainer');
    // if (searchContainer && !searchContainer.contains(event.target) && searchContainer !== event.target) {
    //   setShowFilterDropdown(false);
    // }

    if (searchContainer && !searchContainer.contains(event.target) && searchContainer !== event.target && !targetClassNames.some((className) => className.includes('Mui'))) {
      setShowFilterDropdown(false);
    }

  }, []);

  const searchHandler = () => {

    if (onSearchClick) {
      if (searchText) {
        if (statusFilter) {
          onSearchClick(statusFilter, searchText);
        } else {
          onSearchClick(searchText);
        }
      } else if (statusFilter) {
        onSearchClick(statusFilter);
      }
    }
    if (!closingParam) {
      setShowFilterDropdown(false);
    }
  };


  useEffect(() => {
    if (showFilterDropdown) {
      document.addEventListener('click', closeOnOutsideClick, true);
    } else {
      document.removeEventListener('click', closeOnOutsideClick, true);
    }
  }, [showFilterDropdown]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.key === 'Enter') {
      _onSearch(searchText)
    }
  };


  return (
    <div id='searchBarContainer' className={` max-w-[223px] flex relative ${hideTextBox && " justify-end "} `}>

      <>
        <input value={searchText} onChange={(e) => onSearchTextChange(e)} className={`${hideTextBox && " hidden "}   ${!hideStatusSearch && " searchInp "}   pl-3 pr-2 w-full h-[34px] placeholder:text-[#bdc3d1] placeholder:text-[14px] border border-solid  text-[14px] text-[#262b36] outline-none ${(hideStatusSearch && children) && " border-r-transparent"}`} placeholder='Search' onKeyDown={handleKeyPress}  />
        <button onClick={(e) => showHideFilterDropdown()} className={`${!hideTextBox && " dropBtn border-l-[transparent!important]"} ${(hideStatusSearch && !children) && "hidden"}   flex justify-center  items-center h-[34px] w-[33px] border border-solid  `}>
          <FontAwesomeIcon className={`    cursor-pointer text-[14px] text-[#9ca0ab]`} icon={faAngleDown} />
        </button>
      </>

      <div ref={searchFilterElement} className={`${showFilterDropdown ? ' block ' : ' hidden '} w-[223px]  p-[15px] absolute border z-[100] border-solid border-black shadow-[0_0.5rem_1rem_#00000026] bg-white top-[40px]  min-h-fit flex flex-col justify-between`}>
        <div className=''>

          {children || ""}
        </div>

        <div className={`  ${hideStatusSearch ? 'hidden' : 'block'} `}>
          <div className='flex mb-[5px]'>
            <div className='text-[12px] text-[#212529] tracking-[0.25px] font-mulish'>Status</div>
            <div className='text-[#dc3545]'>&nbsp;*</div>
          </div>

          <div className='flex gap-x-4'>
            <input className='hidden'
              onChange={(e) => {
                if (searchStatusModifier) {
                  searchStatusModifier('active');
                }
                setStatusFilter('active')
              }}
              id='status1' type='radio' name='status' value='active'
              checked={statusFilter === "active"}
               />
            <input className='hidden'
              onChange={(e) => {
                if (searchStatusModifier) {
                  searchStatusModifier('deactive');
                }
                setStatusFilter('deactive')
              }}

              id='status2' type='radio' name='status' value='deactive'
              checked={statusFilter === "deactive"}
               />

            <label className='flex items-center gap-x-2.5 cursor-pointer' htmlFor='status1'>
              <div className={`w-[21px] h-[21px] transition-[all_300ms_ease] rounded-full flex justify-center items-center ${statusFilter === 'active' ? 'bg-[#2574ab40]' : 'bg-[#d9d9d9]'}`}>
                <div className={`transition-[all_200ms_ease] bg-[#2574ab] rounded-full ${statusFilter === 'active' ? 'w-[9px] h-[9px]' : 'w-0 h-0'}`}></div>
              </div>
              <div className='font-mulish text-[14px] select-none'>Active</div>
            </label>
            <label className='flex items-center gap-x-2.5 cursor-pointer' htmlFor='status2'>
              <div className={`w-[21px] h-[21px] transition-[all_300ms_ease] rounded-full flex justify-center items-center ${statusFilter === 'deactive' ? 'bg-[#2574ab40]' : 'bg-[#d9d9d9]'}`}>
                <div className={`transition-[all_200ms_ease] bg-[#2574ab] rounded-full ${statusFilter === 'deactive' ? 'w-[9px] h-[9px]' : 'w-0 h-0'}`}></div>
              </div>
              <div className='font-mulish text-[14px] select-none'>Deactive</div>
            </label>
          </div>
{/* 
          <div className='flex mb-[5px]'>
            <div className='text-[12px] text-[#212529] tracking-[0.25px] font-mulish'>Project Group</div>
            <div className='text-[#dc3545]'>&nbsp;*</div>
          </div> */}
          
        </div>


        <div className='flex justify-end'>
          <button id="searchBarContainerButton" onClick={(e) => searchHandler()} className='bg-[#e6ad5c] w-[60px] rounded-[2px] h-[30px] text-[14px] text-white font-open-sans-bold font-bold tracking-[0.5px] mt-[15px]'>Search</button>
        </div>
      </div>
      
    </div>
  );
};

