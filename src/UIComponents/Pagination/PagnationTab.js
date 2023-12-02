import { faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function PaginationTab({ totalItems, onPageChnage, itemsCount }) {

 /**Mutable State */
 const [currentPage, setCurrentPage] = useState(1);
 const [startIndex, setStartIndex] = useState(1)
 const [currentPages, setCurrentPages] = useState([1, 2, 3]);
 const [disabledPrev, setDisabledPrev] = useState(true)
 const [disabledNext, setDisabledNext] = useState(false)

 let [_totalPages, setTotalPages] = useState(countTotalPages(totalItems, itemsCount));

 function countTotalPages(totalItems, itemPerPage) {
  let x = totalItems / itemPerPage;
  let x_rounded = Math.round(x);

  return x > x_rounded ? x_rounded + 1 : x_rounded

 }
 useEffect(
  () => {
   setTotalPages(countTotalPages(totalItems, itemsCount))
  }, [totalItems, itemsCount]
 )

 useEffect(
  () => {
   if (_totalPages === 0 || _totalPages === 1) {
    setDisabledNext(true)
    setDisabledPrev(true)
   } else {
    if (currentPage === 1) {
     setDisabledPrev(true)
    } else {
     setDisabledPrev(false)
    }

    if (currentPage === _totalPages || _totalPages === 0) {
     setDisabledNext(true)
    } else {
     setDisabledNext(false)
    }
   }
  }, [_totalPages]
 )
//  console.log("_totalPages", _totalPages, totalItems, itemsCount)
 /**Effects */
 useEffect(
  () => {
   if (onPageChnage) {
    onPageChnage(currentPage)
   }

   if (currentPage === 1) {
    setDisabledPrev(true)
   } else {
    setDisabledPrev(false)
   }

   if (currentPage === _totalPages || _totalPages === 0) {
    setDisabledNext(true)
   } else {
    setDisabledNext(false)
   }
  }, [currentPage]
 )


 return (
  <>
   {
    totalItems &&

    <div className=' items-center h-fit select-none w-fit  '>
     <div className='flex items-center gap-0 justify-end w-full'>
      <div className={`${disabledPrev ? " text-[#9fa8bc]" : "  text-[#2574ab]  "} p-1 hover:bg-gray-100 px-3 cursor-pointer rounded-l-[2px]`} onClick={() => {
       if (currentPage === 1 || disabledPrev) {
        return
       }


       if (currentPage === startIndex) {
        setCurrentPages([currentPage - 3, currentPage - 2, currentPage - 1])
        // setEndIndex(currentPage + 3)
        setStartIndex(currentPage - 3)
        // return
       }
       setCurrentPage((prev) => prev - 1)
      }
      }
      >
       {/* Previous */}
       <FontAwesomeIcon icon={faBackward} />

      </div>
      {
       _totalPages === 0 &&
       <div className={`p-[0.29rem] px-3 cursor-pointer ${currentPage === 1 && "bg-[#2574ab] text-white"} duration-300 hover:bg-gray-100`} >1</div>

      }


      {
       currentPages.map(
        (pageNo) => {


         if (pageNo > _totalPages || pageNo === 0) {
          return <></>
         }

         return (
          <div className={`p-[0.29rem] px-[0.7rem] rounded-[3px] cursor-pointer ${currentPage === pageNo && "bg-[#2574ab] text-white"} duration-300 hover:bg-gray-200`} onClick={() => setCurrentPage(pageNo)}>{pageNo}</div>
         )
        }
       )
      }
      {/* <div className='p-1 px-3 border active:border-blue-600 cursor-pointer'>1</div>
                <div className='p-1 px-3 border cursor-pointer'>2</div>
                <div className='p-1 px-3 border cursor-pointer'>3</div> */}
      {/* <div className='p-1 px-3 border'>4</div>
            <div className='p-1 px-3 border'>5</div> */}

      <div className={`${disabledNext ? " text-[#9fa8bc] bg-white" : " text-[#2574ab]  "} hover:bg-gray-200 p-1 px-3 cursor-pointer rounded-r-[2px]`}
       onClick={() => {
        if (currentPage === _totalPages || disabledNext) return



        if (currentPage === startIndex + 2) {
         setCurrentPages([currentPage + 1, currentPage + 2, currentPage + 3])
         // setEndIndex(currentPage + 3)
         setStartIndex(currentPage + 1)
         // return
        }
        setCurrentPage((prev) => prev + 1)
       }
       }
      >
       {/* Next */}
       <FontAwesomeIcon icon={faForward} />
      </div>
     </div>
    </div>
   }
  </>
 )
}