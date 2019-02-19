var mouseCoordinates

function addGesturesEventListeners(elementId) {

    return function (e) {
        var element = document.getElementById(elementId)
        console.log("Installing event listeners")
        element.addEventListener('dragstart', preventDefault)
        element.addEventListener('touchstart', touchStart)
        element.addEventListener('touchend', touchEnd)
        element.addEventListener('touchmove', touchMove)
        element.addEventListener('mousedown', mouseButtonDown)
        element.addEventListener('mouseup', mouseButtonUp)
        element.addEventListener('mouseleave', mouseButtonUp)
        element.addEventListener('mousemove', updateMouseCoordinates)
    }

    function updateMouseCoordinates(e) {
        var target = e.target
        var targetClientRect = target.getClientRects()[0]

        mouseCoordinates = {
            x: (e.clientX - targetClientRect.left) * target.width / targetClientRect.width
            , y: (e.clientY - targetClientRect.top) * target.height / targetClientRect.height
        }
    }
    
    function preventDefault(e) {
        e.preventDefault()
    }
    
    function touchStart(e) {
        e.preventDefault()
        updateMouseCoordinates(e.touches[0])
        moveSpeed = 5
    }
    
    function touchEnd(e) {
        e.preventDefault()
        moveSpeed = 0
    }
    
    function touchMove(e) {
        e.preventDefault()
        updateMouseCoordinates(e.touches[0])
    }
    
    function mouseButtonDown(e) {
        moveSpeed = 5
    }
    
    function mouseButtonUp(e) {
        moveSpeed = 0
    }
    }


console.log("gestures.js")
window.addEventListener('load', addGesturesEventListeners('main_canvas'))
