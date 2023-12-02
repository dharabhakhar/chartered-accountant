export const resizeElement = function (element, offsetWidth, offsetHeight, unit = "px") {
    let currentWidth = parseInt(element.style.width)
    let currentHeight = parseInt(element.style.height)
    let newWidth = currentWidth + offsetWidth + unit;
    element.style.width = newWidth;
    let newHeight = currentHeight + offsetHeight + unit;
    element.style.height = newHeight;
    return { width: newWidth, height: newHeight }
    // element.style.top = parseInt( element.style.top ) - offsetHeight + unit
    // element.style.left = parseInt( element.style.left ) - offsetWidth + unit
}

export const resizeByHeight = function (element, offset, unit = "px") {
    let currentHeight = parseInt(element.style.height)
    let newHeight = currentHeight + offset + unit;
    element.style.height = newHeight;
    return newHeight
}

export const resizeByWidth = function (element, offset, unit = "px") {
    let currentWidth = parseInt(element.style.width)
    let newWidth = currentWidth + offset + unit;
    element.style.width = newWidth;
    return newWidth
}