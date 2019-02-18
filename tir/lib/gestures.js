function addGesturesEventListeners(element) {
    element.addEventListener('dragstart', preventDefault)
    element.addEventListener('touchstart', touchStart)
    element.addEventListener('touchend', touchEnd)
    element.addEventListener('touchmove', touchMove)
    element.addEventListener('mousedown', mouseButtonDown)
    element.addEventListener('mouseup', mouseButtonUp)
    element.addEventListener('mouseleave', mouseButtonUp)
    element.addEventListener('mousemove', updateMouseCoordinates)
}
