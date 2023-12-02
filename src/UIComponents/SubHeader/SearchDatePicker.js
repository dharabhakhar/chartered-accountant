import { Calendar } from "react-date-range";
import { getFormattedDate, getMaxDaysInMonth } from "../../Utils/date";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function SearchDatePicker({ searchDate, searchDateModifier,title,id }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateInput, setDateInput] = useState(searchDate ? getFormattedDate(searchDate || new Date()) : "")
    const [dateError, setDateError] = useState("")

    const refOne = useRef(null)



    function handleSelectDate(date) {
        searchDateModifier(date)
        setShowDatePicker(false)

        setDateInput(getFormattedDate(date))
    }

    useEffect(() => {
        // set current date on component load

        document.addEventListener("click", hideOnClickOutside, true)
    }, [])


    useEffect(() => {
        if (!showDatePicker) {
            if (dateInput) {


                if (dateInput.length === 10) {
                    let [day, month, year] = dateInput.split('-');
                    if (!day || !month || !year) {
                        setDateError("Invalid Date")
                     
                    } else {
                        setDateError("")

                    }
                } else {
                    setDateError("Invalid Date")
                   

                }
            } else {
                setDateError("")
            }
        }
    }, [showDatePicker])

    const hideOnClickOutside = (e) => {
        if (e && e.contains){
        if (e.target.id && (e.target.id === id +"_date_input_box" || e.target.id === id+"_date_input_icon")) {
            return;
        } else
            if (refOne.current && !refOne.current.contains(e.target)) {
                setShowDatePicker(false)

            }
        let _searchbar = document.getElementById("searchBarContainer");
        if (!_searchbar.contains(e.target) || !e.target.id === "searchBarContainerButton") {
           if(dateError !== "") {
          
            searchDateModifier(null)
            setDateError("")
            setDateInput("")
           }else{
            
           }

        }
        }
    }

    const handleInputChange = (event) => {
        let _value = event.target.value;
        console.log(_value);
        if(_value === ''){
            setDateInput('')
            searchDateModifier(false)
        }

        let isValid = /^[0-9-]*$/.test(_value);

        if (!isValid) {

            return;

        }

        const _length = _value.length;


        if (event.nativeEvent.data) {
            const pattern = /^(?:(?![ -]{2,}).)*[-](?:(?![ -]{2,}).)*[-](?:(?![ -]{4,}).)*[-](?:(?![ -]{4,}).)*$/;
            isValid = pattern.test(_value);
            if (isValid) {
                return;
            }

            if (_length === 2) {
                if (_value[_length - 1] !== "-") {
                    if (parseInt(_value) > 31) {
                        _value = 31
                    }
                    if (parseInt(_value) < 1) {
                        _value = "0" + 1
                    }
                    event.target.value = _value + "-"
                } else {
                    if (parseInt(_value) < 1) {
                        _value = 1
                    }
                    event.target.value = "0" + _value
                }
            }

            if (_length === 5) {
                if (_value[_length - 1] !== "-") {

                    let [day, month] = _value.split("-");
                    if (parseInt(month) > 12) {
                        month = 12;
                    }
                    if (parseInt(month) < 1) {
                        month = 1
                    }
                    if (parseInt(day) > getMaxDaysInMonth(month, 2000)) {

                        day = getMaxDaysInMonth(month, 2000)
                    }
                    event.target.value = day + "-" + (parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-"
                } else {
                    let [day, month] = _value.split("-");

                    if (parseInt(day) > getMaxDaysInMonth(month, 2000)) {

                        day = getMaxDaysInMonth(month, 2000)
                    }
                    if (parseInt(day) === 0) {
                        day = 1
                    }
                    if (parseInt(month) === 0) {
                        month = 1
                    }
                    event.target.value = day + "-" + (parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-"

                }
            }



            if (_length === 3 || _length === 6) {
                if (_value[_length - 1] !== "-") {
                    let _arr = _value.split('')
                    _arr[_length - 1] = "-"
                    event.target.value = _arr.join('')
                }
            }

            if (_length > 6) {
                let [day, month, year] = _value.split("-");
                if (parseInt(day) === 0) {
                    day = "01"
                }
                if (parseInt(month) === 0) {
                    month = "01"
                }
                event.target.value = day + "-" + month + "-" + year
            }

            if (_length === 10) {


                let [day, month, year] = _value.split("-");
                if (parseInt(month) > 12) {
                    month = 12;
                }

                if (parseInt(day) > getMaxDaysInMonth(month, year)) {

                    day = getMaxDaysInMonth(month, year)
                }
                if (parseInt(year) > 2043) {
                    year = 2043
                }
                if (parseInt(year) === 0) {
                    year = new Date().getFullYear()
                }
                event.target.value = day + "-" + month + "-" + year
                searchDateModifier(new Date(month + "-" + day + "-" + year))
            }


        }
        setDateInput(event.target.value)
    }

    const handleEnterPress = (event) => {

        if (event.key === "Enter") {
            if (!dateInput) {
                // setDateError("Please Select Date")
                return;
            }

            let _value = dateInput;
            let [day, month, year] = _value.split("-");

            if (!day || parseInt(day) === 0) {
                day = 1
            }
            if (!month || parseInt(month) === 0) {
                month = 1
            }
            if (!year || parseInt(year) === 0 || year.length < 4) {
                year = new Date().getFullYear();
            }

            if (parseInt(month) > 12) {
                month = 12;
            }

            if (parseInt(day) > getMaxDaysInMonth(month, year)) {
                day = getMaxDaysInMonth(month, year)
            }

            if (parseInt(year) > 2043) {
                year = 2043
            }

            setDateInput((parseInt(day) < 10 ? "0" + parseInt(day) : day) + "-" + (parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-" + year)
            searchDateModifier(new Date((parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-" + (parseInt(day) < 10 ? "0" + parseInt(day) : day) + "-" + year))
            setShowDatePicker(false)

        }
    }

    const toggleShow = (event) => {
        event.stopPropagation();
        setShowDatePicker((prev) => !prev)
    }
    return (
        <div className="relative flex justify-center flex-col items-center  outline-none">
            <div className="flex items-center justify-between gap-1 py- px-2 border"  >

                <input id={id +"_date_input_box"} type="text" className="outline-none peer h-[38px] placeholder-transparent w-full text-[15px] px-1 placeholder:color-black" placeholder="dd-mm-yyyy" maxlength={10} onClick={toggleShow} onKeyUp={handleEnterPress} value={dateInput} onChange={handleInputChange} />
                <div className="  h-full cursor-pointer p-1 flex justify-center items-center " id={id+"_date_input_icon"} onClick={toggleShow}>

                    <FontAwesomeIcon onClick={(e) => e.preventDefault()} icon={faCalendarDays} className="block pointer-events-none  h-full" />
                </div>
                <label
                      htmlFor={id + "_date_input_box"}
                      className="absolute m-0 px-[3px] capitalize text-[13px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
                    >
                      {title || "Date"} 
                    </label>
            </div>
            
            <div ref={refOne}>
                {
                    showDatePicker &&
                    <Calendar
                        className="bg-white border rounded-lg w-max top-[2.60rem] hover:border-[#bdc3d1] absolute right-0 opacity-100 z-50 "
                        date={searchDate || new Date()}
                        onChange={handleSelectDate}
                    />
                }
            </div>
            {
                dateError &&
                <div className="text-red-500 text-xs self-start">{dateError}</div>
            }

        </div>
    )
}