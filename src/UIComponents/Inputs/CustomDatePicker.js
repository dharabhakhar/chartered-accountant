import { Calendar } from "react-date-range";
import { getFormattedDate, getMaxDaysInMonth } from "../../Utils/date";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export default function CustomDatePicker({ selectedDate, selectedDateModifier, title, id, setSelectedDateError, _clear,verticalPosition,horizontalPosition, classNames }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateInput, setDateInput] = useState(selectedDate ? getFormattedDate(selectedDate || new Date()) : "")
    const [dateError, setDateError] = useState("")
   
    const refOne = useRef(null)

    useEffect(
        () => {
            setDateInput(selectedDate ? getFormattedDate(selectedDate || new Date()) : "")
        }, [selectedDate]
    )

    function __setSearchDateError(hasError) {
        if (setSelectedDateError) {
            setSelectedDateError(hasError)
        }
    }

    function __selectedDateModifier(date) {
        if(selectedDateModifier){
            selectedDateModifier(date)
        }
    }

    function handleSelectDate(date) {
        
        __selectedDateModifier(date)
        setShowDatePicker(false)
        setDateInput(getFormattedDate(date))
    }

    useEffect(() => {
        // set current date on component load
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    useEffect(
        () => {
            if (dateError) {
                __setSearchDateError(true)
            } else {
                __setSearchDateError(false)
            }
        }, [dateError]
    )



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
        // console.log(refOne.current)
        // console.log(e.target)
        if (e && e.contains) {
        let _dateInput = document.getElementById(id + "_date_input_box")?.value;
        if (_dateInput && _dateInput.length !== 10) {
            setDateError("Invalid Date")
        }


        if (e.target.id && (e.target.id === id + "_date_input_box" || e.target.id === id + "_date_input_icon")) {
            return;
        } else
            if (refOne.current && !refOne.current?.contains(e.target)) {
                setShowDatePicker(false)

            }
        let _searchbar = document.getElementById("searchBarContainer");
        if (!_searchbar?.contains(e.target) || !e.target.id === "searchBarContainerButton") {
            if (dateError !== "") {

                __selectedDateModifier(null)
                setDateError("")

                setDateInput("")
            } else {

            }

        }
    } else {
        console.error('Element is null or does not have a "contains" property.');
      }

    }

    const handleInputChange = (event) => {
        let _value = event.target.value;
        if (!_value) {
            __selectedDateModifier(null)
            if (dateError) setDateError("")
        }
        if (isNaN(event.nativeEvent.data)) {
            return
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
                    if (parseInt(_value) < 1 || isNaN(parseInt(_value))) {
                        _value = "0" + 1
                    }
                    event.target.value = _value + "-"
                } else {
                    if (parseInt(_value) < 1 || isNaN(parseInt(_value))) {
                        _value = 1
                    }
                    event.target.value = "0" + _value + "---"
                }
            }

            if (_length === 5) {
                if (_value[_length - 1] !== "-") {

                    let [day, month] = _value.split("-");
                    if (parseInt(month) > 12) {
                        month = 12;
                    }
                    if (parseInt(month) < 1 || isNaN(parseInt(month)) || !month) {
                        month = 1
                    }
                    if (parseInt(day) > getMaxDaysInMonth(month, 2000)) {

                        day = getMaxDaysInMonth(month, 2000)
                    }
                    event.target.value = day + "-" + (parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-"
                } else {
                    let [day, month] = _value.split("-");
                    if (parseInt(month) === 0 || isNaN(parseInt(month)) || !month) {
                        month = 1
                    }

                    if (parseInt(day) > getMaxDaysInMonth(month, 2000)) {

                        day = getMaxDaysInMonth(month, 2000)
                    }
                    if (parseInt(day) === 0 || isNaN(parseInt(day) || !day)) {
                        day = 1
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





        }
        if (_length === 8 && !_value.includes("-")) {
            let day = _value.substring(0, 2);
            let month = _value.substring(2, 4);
            let year = _value.substring(4, 8);

            if (parseInt(day) > 31) {
                day = 31
            }

            if (parseInt(day) < 1 || isNaN(parseInt(day))) {
                day = "0" + 1
            }

            if (parseInt(month) < 0 || isNaN(parseInt(month)) || !month) {
                month = 1
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
            if (parseInt(year) === 0) {
                year = new Date().getFullYear()
            }
            if (year[0] === '0') {
                year = new Date().getFullYear()
            }
            event.target.value = day + "-" + month + "-" + year
            __selectedDateModifier(new Date(month + "-" + day + "-" + year))
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
            if (year[0] === '0') {
                year = new Date().getFullYear()
            }
            if (parseInt(year) === 0) {
                year = new Date().getFullYear()
            }
            event.target.value = day + "-" + month + "-" + year
            __selectedDateModifier(new Date(month + "-" + day + "-" + year))
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
            __selectedDateModifier(new Date((parseInt(month) < 10 ? "0" + parseInt(month) : month) + "-" + (parseInt(day) < 10 ? "0" + parseInt(day) : day) + "-" + year))
            setShowDatePicker(false)

        }
    }

    const toggleShow = (event) => {
        event.stopPropagation();
        setShowDatePicker((prev) => !prev)
    }
    return (
        <div className="relative flex justify-center flex-col items-center  outline-none w-full bg-white ">
            <div className={"flex items-center justify-between relative gap-1 py- px-2 border w-full "+ classNames}  >

                <input id={id + "_date_input_box"} type="text" className="outline-none peer h-[38px] placeholder-transparent w-full text-[15px] px-1 placeholder:color-black "
                    placeholder="dd-mm-yyyy" maxLength={10}
                    onClick={toggleShow} onKeyUp={handleEnterPress} value={dateInput} onChange={handleInputChange} />
                <div className="  h-full cursor-pointer p-1 flex justify-center items-center " id={id + "_date_input_icon"} onClick={toggleShow}>
                    <FontAwesomeIcon onClick={(e) => e.preventDefault()} icon={faCalendarDays} className="block pointer-events-none  h-full" />
                </div>
                <label
                    htmlFor={id + "_date_input_box"}
                    className="absolute m-0 px-[3px] capitalize text-[12px] top-[-9px] bg-white font-mulish left-[12px] text-[#696c74] transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-[10px] peer-focus:top-[-9px] peer-focus:text-[13px] peer-focus:bg-white"
                >
                    {title || "Date"}
                </label>
            </div>

            <div ref={refOne}>
                {
                    showDatePicker &&
                    <Calendar
                    style={
                        {
                            left : verticalPosition && verticalPosition==="left" ? "0" : "",
                            right : verticalPosition && verticalPosition==="right" ? "0" : "",
                        }}
                        className={`${verticalPosition && verticalPosition==="left" && "left-0" } ${verticalPosition && verticalPosition==="right" && "right-0" } bg-white border rounded-lg w-max top-[2.60rem] hover:border-[#bdc3d1] absolute opacity-100 z-50  search_date_picker`}
                        date={selectedDate || new Date()}
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