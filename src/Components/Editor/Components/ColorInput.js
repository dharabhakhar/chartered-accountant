export default function ColorInput(changeHandler) {
    const [bgColor_hex, setBgColor_hex] = useState("");

    return (
        <div className='flex items-center'>Color:
            <input type='color'
                onChange={(event) => {
                    let _proprty = "backgroundColor";
                    let _value = event.target.value;
                    setBgColor_hex(_value)


                    changeHandler(_value)
                }}
                className='ms-[45px] rounded-sm w-14 p-1 border me-2' />
            <input type='text' value={bgColor_hex || "#000000"} placeholder='#000000' maxLength={7} className='border uppercase outline-none p-1 text-[12px] w-[107px]'
                onChange={(event) => {
                    let _value = event.target.value;
                    setBgColor_hex(_value)
                    if (_value.length < 7) {
                        return;
                    }
                    let _proprty = "backgroundColor";

                    changeHandler()
                }}
            />
        </div>
    )
}