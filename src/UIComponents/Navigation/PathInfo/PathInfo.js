import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';



const PathInfo = ({ fontAwesomeIcon }) => {
  const __location = useLocation()

  const pathName = __location.pathname;
  const pathSegments = pathName.split('/');
  const modifiedSegments = pathSegments.slice(1).map(segment => segment.replace('-', ' '));
  // const modifiedPathName = modifiedSegments.join(` > `);
  const handleSegmentClick = (index) => {
    if (index !== modifiedSegments.length - 1) {
      if (index === 1 && modifiedSegments.length === 3) {
        const name = createSlug(modifiedSegments[1])
        window.location.href = `/${name}`;
      } else {
        const name = createSlug(modifiedSegments[0])
        window.location.href = `/${name}`;
      }
    }
  };
  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .trim();
  }
  return (
    <>
      {/* <div className={`flex gap-x-[5px] px-[10px] text-[#696c74] text-[12px] w-full h-[30px] items-center bg-white mb-[5px]`}>
        <FontAwesomeIcon className="pb-[2px]" icon={fontAwesomeIcon} />
        {modifiedSegments.map((segment, index) => (
          <>
            <a
              key={index}
              className={`font-bold font-mulish tracking-[0.25px] capitalize cursor-pointer hover:text-[#259dab]`}
              onClick={() => handleSegmentClick(index)}
            >
              <div className={`font-bold font-mulish tracking-[0.25px] capitalize`}>{segment} </div>

            </a>
            <div>{index < modifiedSegments.length - 1 && <AiFillCaretRight className='inline-block mb-[1px]' />}</div>
          </>
        ))}
      </div> */}


      <div className={`flex px-[10px] gap-x-[5px] text-[#696c74]  text-[12px] min-h-[30px] h-fit items-center bg-white mb-[5px]`}>
        <FontAwesomeIcon className=" text-[#696c74] -translate-y-0.0 h-full" icon={fontAwesomeIcon} />

        <div className={`font-bold font-mulish justify-start h-full  flex items-center gap-2 px-1 flex-wrap`}>
          {modifiedSegments.map((segment, index, array) => {
            return (
              <div className="flex  items-center text-[12px]">
                <div className={` ${index === array.length - 1 && index !== 0 ?  " bg-[#D4D4D4] text-[#2574AB]  px-[15px] rounded-[5px] " : " text-[#696c74]"} text-xs duration-200 ${index !== 0 && " animate__animated animate__bounceInLeft "} font-bold py-[2px] pb-[1px]  capitalize ${array.length > 1 && index == 0 && "cursor-pointer hover:text-[#2574AB]"}` }
                  onClick={() => {

                    handleSegmentClick(index)
                  }
                  }
                ><span className="max-w-[9.5em] inline-block whitespace-nowrap overflow-hidden text-ellipsis">{segment}</span></div>
                {
                  index !== array.length - 1 && <FontAwesomeIcon icon={faChevronRight} className=" -translate-y-[0.1em] text-[10px]  pl-2" />
                }
              </div>
            )
          }
          )}
        </div>
      </div>


    </>
  )
}

export default PathInfo                                                                                                 