export const MoveElement = function (element, offsetX, offsetY, unit = "px") {
    try {
        const _currentX = parseInt(element.style.left)
        const _currentY = parseInt(element.style.top)

        // const _editor = document.getElementById("editor")
        // let pageWidth = _editor.offsetWidth;
        // let pageHeight = _editor.offsetHeight;

        let newX, newY;
        if (_currentX <= 0 && offsetX <= 0) {
            newX = "0"
        } else {
            newX = _currentX + offsetX;
        }

        if (_currentY <= 0 && offsetY <= 0) {
            newY = "0"
        } else {
            newY = _currentY + offsetY;
        }

        // if ((newX + element.offsetWidth) >= pageWidth) {
        //     newX = _currentX
        // }

        // if ((newY + element.offsetHeight) >= pageHeight) {
        //     newY = _currentY
        // }

        element.style.left = newX + unit
        element.style.top = newY + unit
        return { left: newX + unit, top: newY + unit }

    } catch (e) {
        console.log(e)
    }
}

export const MoveHorizontal = function (element, offset, unit = "px") {
    const _currentX = parseInt(element.style.left)
    if (_currentX <= 0 && offset <= 0) {
        return "0px"
    }

    // const _editor = document.getElementById("editor")
    // let pageWidth = _editor.offsetWidth;

    let _newPosition = _currentX + offset

    // if ((_newPosition + element.offsetWidth) >= pageWidth) {
    //     _newPosition = _currentX
    // }
    element.style.left = _newPosition + unit

    return _newPosition + unit
}

export const MoveVertical = function (element, offset, unit = "px") {
    const _currentY = parseInt(element.style.top)
    if (_currentY <= 0 && offset <= 0) {
        return "0px"
    }

    // const _editor = document.getElementById("editor")
    //     let pageHeight = _editor.offsetHeight;

    let _newPosition = _currentY + offset 

    // if ((_newPosition + element.offsetHeight) >= pageHeight) {
    //     _newPosition = _currentY
    // }

    element.style.top = _newPosition + unit
    return _newPosition + unit
}